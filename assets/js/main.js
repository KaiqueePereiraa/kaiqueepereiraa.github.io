/* ============================================================================
   WasFit — comportamento do site
   Regra de ouro (spec P0-2): o CONTEÚDO já está no HTML. Este arquivo só
   melhora a experiência. Se algo aqui quebrar, a página continua legível.
   Tudo roda dentro de try/catch e com verificação de suporte.
   ========================================================================== */
(function () {
  'use strict';
  var CFG = window.WASFIT || {};
  var page = document.body.getAttribute('data-page') || 'home';

  function safe(fn) { try { fn(); } catch (e) { if (CFG.analytics && CFG.analytics.debug) console.warn('[wasfit]', e); } }
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------------------------------------------------------------- *
   *  1. Medição — GTM (item 4). Só carrega se houver ID configurado. *
   * ---------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function dl(obj) {
    try {
      window.dataLayer.push(obj);
      if (CFG.analytics && CFG.analytics.debug) console.log('[dataLayer]', obj);
    } catch (e) {}
  }
  function track(evento, params) {
    var payload = { event: evento };
    if (params) for (var k in params) if (params[k] != null && params[k] !== '') payload[k] = params[k];
    dl(payload);
  }

  safe(function initGTM() {
    var id = CFG.analytics && CFG.analytics.gtmId;
    if (!id || !/^GTM-/.test(id)) return; // sem ID => nada de terceiros
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dlp = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dlp;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', id);
    var ns = document.createElement('noscript');
    var ifr = document.createElement('iframe');
    ifr.src = 'https://www.googletagmanager.com/ns.html?id=' + id;
    ifr.height = '0'; ifr.width = '0'; ifr.style.display = 'none'; ifr.style.visibility = 'hidden';
    ns.appendChild(ifr);
    document.body.insertBefore(ns, document.body.firstChild);
  });

  /* ---------------------------------------------------------------- *
   *  2. UTMs — preservar na navegação e repassar (item 6)            *
   * ---------------------------------------------------------------- */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utms = {};

  safe(function captureUTMs() {
    var qs = new URLSearchParams(location.search);
    var stored = {};
    try { stored = JSON.parse(sessionStorage.getItem('wasfit_utm') || '{}'); } catch (e) {}
    UTM_KEYS.forEach(function (k) {
      var v = qs.get(k);
      if (v) stored[k] = v;
    });
    utms = stored;
    try { sessionStorage.setItem('wasfit_utm', JSON.stringify(stored)); } catch (e) {}
    if (Object.keys(utms).length) dl({ event: 'utm_capturado', utm: utms });
  });

  function withUTMs(url) {
    if (!url || !Object.keys(utms).length) return url;
    try {
      var abs = new URL(url, location.origin);
      // só repassa para o próprio site e para o destino de agendamento
      var isInternal = abs.origin === location.origin;
      var agenda = (CFG.contato && CFG.contato.agendamento) || '';
      var isAgenda = agenda && url.indexOf(agenda.split('?')[0]) === 0;
      if (!isInternal && !isAgenda) return url;
      UTM_KEYS.forEach(function (k) { if (utms[k]) abs.searchParams.set(k, utms[k]); });
      return abs.pathname + abs.search + abs.hash;
    } catch (e) { return url; }
  }

  safe(function propagateUTMs() {
    if (!Object.keys(utms).length) return;
    $all('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https:\/\/wa\.me|https:\/\/api\.whatsapp)/.test(href)) return;
      a.setAttribute('href', withUTMs(href));
    });
    // formulários e link de agendamento
    $all('form').forEach(function (f) {
      UTM_KEYS.forEach(function (k) {
        if (!utms[k]) return;
        var inp = document.createElement('input');
        inp.type = 'hidden'; inp.name = k; inp.value = utms[k];
        f.appendChild(inp);
      });
    });
  });

  /* ---------------------------------------------------------------- *
   *  3. Contato — monta links de WhatsApp / e-mail / agendamento     *
   * ---------------------------------------------------------------- */
  safe(function wireContact() {
    var c = CFG.contato || {};
    var waBase = c.whatsapp ? ('https://wa.me/' + c.whatsapp + (c.whatsappMsg ? '?text=' + encodeURIComponent(c.whatsappMsg) : '')) : '';
    $all('[data-wa]').forEach(function (a) {
      if (waBase) a.setAttribute('href', waBase);
      a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener');
    });
    $all('[data-email]').forEach(function (a) { if (c.email) a.setAttribute('href', 'mailto:' + c.email); });
    $all('[data-agendamento]').forEach(function (a) { if (c.agendamento) a.setAttribute('href', withUTMs(c.agendamento)); });
    $all('[data-instagram]').forEach(function (a) { if (c.instagram) a.setAttribute('href', c.instagram); });
  });

  /* ---------------------------------------------------------------- *
   *  4. Eventos de conversão (item 5) — delegação de clique          *
   * ---------------------------------------------------------------- */
  safe(function wireEvents() {
    document.addEventListener('click', function (ev) {
      var el = ev.target.closest('[data-evt], [data-wa]');
      if (!el) return;
      if (el.hasAttribute('data-wa')) {
        track('clique_whatsapp', { posicao: el.getAttribute('data-pos') || 'desconhecida' });
        return;
      }
      var params = {};
      if (el.dataset.plano) params.plano = el.dataset.plano;
      if (el.dataset.faixa) params.faixa = el.dataset.faixa;
      if (el.dataset.origem) params.origem = el.dataset.origem;
      if (el.dataset.posicao) params.posicao = el.dataset.posicao;
      track(el.dataset.evt, params);
    }, false);
  });

  /* ---------------------------------------------------------------- *
   *  5. Header + navegação mobile                                    *
   * ---------------------------------------------------------------- */
  safe(function header() {
    var h = $('.site-header');
    var onScroll = function () { if (h) h.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = $('.nav-toggle'), nav = $('.nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $all('a', nav).forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
      });
    }
  });

  /* ---------------------------------------------------------------- *
   *  6. Reveal on scroll (IntersectionObserver, com fallback)       *
   * ---------------------------------------------------------------- */
  safe(function reveal() {
    var items = $all('.reveal');
    if (!items.length) return;
    function showAll() { items.forEach(function (el) { el.classList.add('in'); }); }
    if (!('IntersectionObserver' in window)) { showAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
    // rede de segurança: se o observer não disparou NADA, revela tudo
    setTimeout(function () {
      if (!document.querySelector('.reveal.in')) showAll();
    }, 3500);
  });

  /* ---------------------------------------------------------------- *
   *  7. viu_planos — chegou ao fim da seção de planos               *
   * ---------------------------------------------------------------- */
  safe(function viuPlanos() {
    var end = $('[data-viu-planos]');
    if (!end || !('IntersectionObserver' in window)) return;
    var fired = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !fired) { fired = true; track('viu_planos'); io.disconnect(); }
      });
    }, { threshold: 0.6 });
    io.observe(end);
  });

  /* ---------------------------------------------------------------- *
   *  8. Vídeo de demonstração — carrega sob demanda + viu_demo 50%   *
   * ---------------------------------------------------------------- */
  safe(function demo() {
    $all('[data-demo]').forEach(function (frame) {
      var key = frame.getAttribute('data-demo-key');
      var fromCfg = (key && CFG[key] && CFG[key].demo) || {};
      var yt = frame.getAttribute('data-youtube') || fromCfg.youtubeId || '';
      var mp4 = frame.getAttribute('data-mp4') || fromCfg.mp4 || '';
      var evt = frame.getAttribute('data-evt-demo') || (fromCfg.evento) || 'viu_demo';
      var demoFired = false;

      function load() {
        if (frame.getAttribute('data-loaded')) return;
        frame.setAttribute('data-loaded', '1');
        if (yt) {
          var ifr = document.createElement('iframe');
          ifr.src = 'https://www.youtube.com/embed/' + yt + '?autoplay=1&rel=0&enablejsapi=1';
          ifr.title = 'Demonstração WasFit';
          ifr.allow = 'autoplay; encrypted-media; picture-in-picture';
          ifr.setAttribute('allowfullscreen', '');
          frame.innerHTML = ''; frame.appendChild(ifr);
          // sem YT API: aproxima "viu_demo" 12s após dar play
          setTimeout(function () { if (!demoFired) { demoFired = true; track(evt); } }, 12000);
        } else if (mp4) {
          var v = document.createElement('video');
          v.src = mp4; v.controls = true; v.autoplay = true; v.playsInline = true;
          v.addEventListener('timeupdate', function () {
            if (!demoFired && v.duration && v.currentTime / v.duration >= 0.5) { demoFired = true; track(evt); }
          });
          frame.innerHTML = ''; frame.appendChild(v);
        }
      }
      frame.addEventListener('click', load);
      frame.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); } });
    });
  });

  /* ---------------------------------------------------------------- *
   *  9. Faixa da condição de lançamento + contador (item 7.4 / 8)    *
   * ---------------------------------------------------------------- */
  safe(function launchBand() {
    var band = $('[data-launch]');
    if (!band) return;
    var home = CFG.home || {};
    var vagas = home.vagas || { fundador: { total: 20, restantes: 20 }, pioneiro: { total: 40, restantes: 40 } };
    var fx = home.faixaLancamento || {};
    var faixa, restantes, total, key;

    if (vagas.fundador && vagas.fundador.restantes > 0) {
      key = 'fundador'; faixa = fx.fundador; restantes = vagas.fundador.restantes; total = vagas.fundador.total;
    } else if (vagas.pioneiro && vagas.pioneiro.restantes > 0) {
      key = 'pioneiro'; faixa = fx.pioneiro; restantes = vagas.pioneiro.restantes; total = vagas.pioneiro.total;
    } else {
      key = 'esgotado'; faixa = fx.esgotado || {}; restantes = 0; total = 0;
    }
    if (!faixa) return;

    function setText(sel, val) { var n = $(sel, band); if (n != null && val != null) n.textContent = val; }
    setText('[data-launch-title]', faixa.titulo);
    setText('[data-launch-destaque]', faixa.destaque);
    setText('[data-launch-prazo]', fx.prazo || '');

    var ul = $('[data-launch-beneficios]', band);
    if (ul && faixa.beneficios) {
      ul.innerHTML = '';
      faixa.beneficios.forEach(function (b) { var li = document.createElement('li'); li.textContent = b; ul.appendChild(li); });
    }

    var label = $('[data-launch-contador]', band);
    var numEl = $('[data-launch-num]', band);
    if (key === 'esgotado') {
      if (numEl) numEl.parentNode && (numEl.parentNode.style.display = 'none');
      if (label) label.textContent = '';
    } else {
      if (label && faixa.contador) label.textContent = faixa.contador.replace('{X}', restantes).replace('{TOTAL}', total);
      // anima o número
      if (numEl) countUp(numEl, restantes);
    }

    // botão da faixa recebe a faixa certa
    var btn = $('[data-launch-cta]', band);
    if (btn && fx.cta) {
      btn.textContent = fx.cta.label;
      btn.setAttribute('data-evt', fx.cta.evento || 'clique_vaga');
      btn.setAttribute('data-plano', key === 'esgotado' ? 'rede' : key);
      btn.setAttribute('data-faixa', key);
      if (key === 'esgotado') btn.setAttribute('data-evt', 'clique_contato');
    }
  });

  function countUp(el, to) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to; return; }
    var start = performance.now(), dur = 900, from = 0;
    function step(now) {
      var p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { requestAnimationFrame(step); io.disconnect(); }
    });
    io.observe(el);
  }

  /* ---------------------------------------------------------------- *
   *  10. Calculadora do plano Rede (item 7.2)                        *
   * ---------------------------------------------------------------- */
  safe(function redeCalc() {
    var box = $('[data-calc]');
    if (!box) return;
    var cardCfg = ((CFG.home && CFG.home.planos && CFG.home.planos.cards) || []).filter(function (c) { return c.id === 'rede'; })[0];
    var k = (cardCfg && cardCfg.calc) || { base: 1347, porUnidade: 350, implBase: 3800, implPorUnidade: 900, min: 3, max: 6 };
    var input = $('input', box), out = $('[data-calc-out]', box);
    if (!input || !out) return;

    function fmt(n) { return 'R$ ' + n.toLocaleString('pt-BR'); }
    function render() {
      var u = parseInt(input.value, 10);
      if (isNaN(u) || u < 1) { out.innerHTML = 'Informe o número de unidades.'; return; }
      if (u < k.min) { out.innerHTML = 'Com <b>1 ou 2 unidades</b>, o plano é o <b>Escola</b>.'; return; }
      if (u > k.max) { out.innerHTML = 'Acima de <b>6 unidades</b>: <b>Falar com a gente</b>.'; return; }
      var mensal = k.base + k.porUnidade * (u - k.min);
      var impl = k.implBase + k.implPorUnidade * (u - k.min);
      out.innerHTML = u + ' unidades: <b>' + fmt(mensal) + '</b>/mês &nbsp;·&nbsp; implantação <b>' + fmt(impl) + '</b>';
    }
    input.addEventListener('input', render);
    render();
  });

  /* ---------------------------------------------------------------- *
   *  10c. BLOCO 10 — a coluna da garantia de 30 dias vale só para as *
   *       20 primeiras (Fundador). Quando acabam, some a coluna.     *
   * ---------------------------------------------------------------- */
  safe(function trustGarantia() {
    var band = $('[data-trust]');
    if (!band) return;
    var v = (CFG.home && CFG.home.vagas) || {};
    if (v.fundador && v.fundador.restantes > 0) return;
    var col = $('[data-garantia-col]', band);
    if (col && col.parentNode) col.parentNode.removeChild(col);
  });

  /* ---------------------------------------------------------------- *
   *  10b. Formulário de contato -> lead_enviado (item 5)            *
   * ---------------------------------------------------------------- */
  safe(function contactForm() {
    $all('form[data-lead-form]').forEach(function (form) {
      var origem = form.getAttribute('data-origem') || 'site';
      var status = $('[data-form-status]', form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var data = {};
        $all('input, textarea, select', form).forEach(function (f) { if (f.name) data[f.name] = f.value.trim(); });
        if (!data.nome || !data.whatsapp) {
          if (status) { status.textContent = 'Preencha nome e WhatsApp.'; status.style.color = 'var(--red)'; }
          return;
        }
        track('lead_enviado', { origem: origem });
        var endpoint = CFG.contato && CFG.contato.formEndpoint;
        if (endpoint) {
          data.origem = origem;
          Object.keys(utms).forEach(function (k) { data[k] = utms[k]; });
          fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
          }).then(function (r) {
            if (status) {
              status.textContent = r.ok ? 'Recebido! A gente já retorna.' : 'Não foi dessa vez — tente pelo WhatsApp.';
              status.style.color = r.ok ? 'var(--teal)' : 'var(--red)';
            }
            if (r.ok) form.reset();
          }).catch(function () {
            if (status) { status.textContent = 'Sem conexão — tente pelo WhatsApp.'; status.style.color = 'var(--red)'; }
          });
        } else {
          // fallback: abre o WhatsApp com a mensagem montada
          var c = CFG.contato || {};
          var msg = 'Oi! Sou ' + data.nome + (data.escola ? ' da ' + data.escola : '') +
            '. Vim pelo site (' + origem + ') e quero saber mais sobre o WasFit Assist.' +
            (data.mensagem ? '\n\n' + data.mensagem : '');
          var url = 'https://wa.me/' + (c.whatsapp || '') + '?text=' + encodeURIComponent(msg);
          if (status) { status.textContent = 'Abrindo o WhatsApp…'; status.style.color = 'var(--teal)'; }
          window.open(url, '_blank', 'noopener');
          form.reset();
        }
      });
    });
  });

  /* ---------------------------------------------------------------- *
   *  11. Hidratação leve de textos do config (data-cfg)             *
   *      O HTML já traz o texto; isto só sincroniza com o config.    *
   * ---------------------------------------------------------------- */
  safe(function hydrate() {
    function get(path) {
      return path.split('.').reduce(function (o, k) {
        var m = k.match(/^(\w+)\[(\d+)\]$/);
        if (m) return o && o[m[1]] ? o[m[1]][+m[2]] : undefined;
        return o ? o[k] : undefined;
      }, CFG);
    }
    $all('[data-cfg]').forEach(function (el) {
      var v = get(el.getAttribute('data-cfg'));
      if (v != null && v !== '') el.textContent = v;
    });
    $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  });

})();
