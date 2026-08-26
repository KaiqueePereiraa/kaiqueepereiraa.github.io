/* ============================================================================
   WasFit /ein — camada aquática (progressive enhancement)
   Nada aqui é essencial: se falhar, a página continua legível e navegável.
   ========================================================================== */
(function () {
  'use strict';
  var CFG = (window.WASFIT || {}).ein || {};
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  function S(fn) { try { fn(); } catch (e) { /* silencioso */ } }
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* -- 1. Reveal "emerge da água" (.rise) -------------------------------- */
  S(function () {
    var items = $$('.rise');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) { items.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    items.forEach(function (e) { io.observe(e); });
    setTimeout(function () { if (!$('.rise.in')) items.forEach(function (e) { e.classList.add('in'); }); }, 3500);
  });

  /* -- 2. Régua de profundidade — cada marca leva a uma seção --------- */
  S(function () {
    var rail = $('.depth-rail');
    if (!rail) return;
    var track = $('.track', rail), diver = $('.diver', rail);
    if (!track || !diver) return;

    // cada "profundidade" é um marco clicável para uma seção
    var stops = [
      { label: 'Superfície', sel: null },
      { label: 'Prova real', sel: '#prova' },
      { label: 'Resultado', sel: '#prova-social' },
      { label: 'Planos', sel: '#planos' },
      { label: 'No EIN', sel: '#vaga' }
    ];
    var doc = document.documentElement;
    function totalH() { return Math.max(1, doc.scrollHeight - window.innerHeight); }

    var items = [];
    stops.forEach(function (s) {
      var el = s.sel ? $(s.sel) : null;
      if (s.sel && !el) return;
      var node = document.createElement(s.sel ? 'a' : 'span');
      node.className = 'tick';
      node.textContent = s.label;
      if (s.sel) {
        node.href = s.sel;
        node.addEventListener('click', function (ev) {
          ev.preventDefault();
          try { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
          catch (e) { el.scrollIntoView(); }
          if (history.replaceState) history.replaceState(null, '', s.sel);
        });
      }
      track.appendChild(node);
      items.push({ node: node, el: el });
    });

    function place() {
      var h = totalH();
      items.forEach(function (it) {
        var frac = it.el ? (it.el.getBoundingClientRect().top + window.scrollY) / h : 0;
        it.node.style.top = (Math.min(1, Math.max(0, frac)) * 100) + '%';
      });
    }
    var raf = 0;
    function upd() {
      raf = 0;
      var p = Math.min(1, Math.max(0, window.scrollY / totalH()));
      diver.style.top = (p * 100) + '%';
      // marca ativa
      var cur = null;
      items.forEach(function (it) {
        if (it.el && it.el.getBoundingClientRect().top - 90 <= 0) cur = it.node;
      });
      items.forEach(function (it) { it.node.classList.toggle('is-active', it.node === cur); });
    }
    place();
    window.addEventListener('resize', function () { place(); upd(); }, { passive: true });
    window.addEventListener('load', place);
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    setTimeout(place, 400);
    upd();
  });

  /* -- 3. Contador regressivo para o EIN ----------------------------- */
  S(function () {
    var box = $('[data-countdown]');
    if (!box || !CFG.evento || !CFG.evento.inicioISO) return;
    var target = new Date(CFG.evento.inicioISO).getTime();
    if (isNaN(target)) return;
    var cells = { d: $('[data-cd="d"]', box), h: $('[data-cd="h"]', box), m: $('[data-cd="m"]', box), s: $('[data-cd="s"]', box) };
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) { box.classList.add('is-live'); clearInterval(iv); return; }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor(diff % 86400000 / 3600000);
      var m = Math.floor(diff % 3600000 / 60000);
      var s = Math.floor(diff % 60000 / 1000);
      if (cells.d) cells.d.textContent = d;
      if (cells.h) cells.h.textContent = pad(h);
      if (cells.m) cells.m.textContent = pad(m);
      if (cells.s) cells.s.textContent = pad(s);
    }
    tick();
    var iv = setInterval(tick, 1000);
  });

  /* -- 4. Chat "prova real": revela as mensagens (já no HTML) com "digitando" -- */
  S(function () {
    var body = $('.wa-body');
    if (!body) return;
    var nodes = $$('.msg', body);
    if (!nodes.length) return;
    var i = 0, started = false;
    var typing = document.createElement('div');
    typing.className = 'typing'; typing.hidden = true;
    typing.innerHTML = '<i></i><i></i><i></i>';

    function step() {
      if (i >= nodes.length) { if (typing.parentNode) typing.remove(); return; }
      var isIA = nodes[i].classList.contains('ia');
      if (isIA) { body.appendChild(typing); typing.hidden = false; body.scrollTop = body.scrollHeight; }
      setTimeout(function () {
        typing.hidden = true; if (typing.parentNode) typing.remove();
        nodes[i].classList.add('show');
        body.scrollTop = body.scrollHeight;
        i++;
        setTimeout(step, 480);
      }, isIA ? 950 : 420);
    }
    function run() {
      if (started) return; started = true;
      if (reduce) { nodes.forEach(function (n) { n.classList.add('show'); }); return; }
      step();
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { run(); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe(body);
    } else { run(); }
  });

  /* -- 5. Kanban: card que viaja pelas colunas ao rolar ------------- */
  S(function () {
    var sec = $('[data-kanban]');
    if (!sec) return;
    var cols = $$('.kcol', sec);
    var steps = $$('.ktrace .step', sec);
    var card = $('.kcard--travel', sec);
    if (!cols.length || !card) return;
    var placed = -1;
    function place(idx) {
      if (idx === placed) return;
      placed = idx;
      var target = cols[Math.min(idx, cols.length - 1)];
      target.appendChild(card);
      steps.forEach(function (s, k) { s.classList.toggle('on', k <= idx); });
    }
    place(0);
    if (reduce) { place(cols.length - 1); return; }
    function onScroll() {
      var r = sec.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh - r.top) / (vh + r.height);
      p = Math.min(1, Math.max(0, p));
      place(Math.round(p * (cols.length - 1)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });

  /* -- 6. Autodiagnóstico interativo ------------------------------- */
  S(function () {
    var form = $('[data-diag]');
    if (!form) return;
    var groups = $$('.toggle', form);
    var out = $('.diag-result', form);
    var meter = $('.diag-meter i', form);
    var h3 = $('h3', out), p = $('p', out);
    var res = CFG.diagnostico && CFG.diagnostico.resultados || [];
    var answers = {};
    groups.forEach(function (g, idx) {
      $$('button', g).forEach(function (b) {
        b.addEventListener('click', function () {
          $$('button', g).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          answers[idx] = b.value;
          render();
        });
      });
    });
    function render() {
      var keys = Object.keys(answers);
      if (keys.length < groups.length) { out.classList.remove('show'); return; }
      var nao = keys.filter(function (k) { return answers[k] === 'nao'; }).length;
      var r = res.find(function (x) { return nao <= x.max; }) || res[res.length - 1];
      var lvl = res.indexOf(r);
      out.className = 'diag-result show lvl-' + lvl;
      if (meter) meter.style.width = Math.round(nao / groups.length * 100) + '%';
      if (h3) h3.textContent = r.titulo;
      if (p) p.textContent = r.texto;
      try { (window.dataLayer = window.dataLayer || []).push({ event: 'diagnostico_concluido', nao: nao }); } catch (e) {}
    }
  });

  /* -- 7. Ripple nos botões -------------------------------------- */
  S(function () {
    if (reduce) return;
    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.btn');
      if (!btn) return;
      var r = btn.getBoundingClientRect();
      var d = Math.max(r.width, r.height);
      var s = document.createElement('span');
      s.className = 'ripple';
      s.style.width = s.style.height = d + 'px';
      s.style.left = (ev.clientX - r.left - d / 2) + 'px';
      s.style.top = (ev.clientY - r.top - d / 2) + 'px';
      btn.appendChild(s);
      setTimeout(function () { s.remove(); }, 620);
    });
  });

  /* -- 8. Campos de bolhas (seções + coluna d'água do mergulho) --- */
  S(function () {
    if (reduce) return;
    $$('.bubbles').forEach(function (wrap) {
      var n = wrap.getAttribute('data-n') ? +wrap.getAttribute('data-n') : 14;
      for (var k = 0; k < n; k++) {
        var b = document.createElement('i');
        var sz = 4 + Math.random() * 10;
        b.style.setProperty('--x', (Math.random() * 100) + '%');
        b.style.setProperty('--dur', (10 + Math.random() * 12) + 's');
        b.style.setProperty('--del', (-Math.random() * 16) + 's');
        b.style.width = b.style.height = sz + 'px';
        wrap.appendChild(b);
      }
    });
    // bolhas subindo pela coluna d'água (fixo, cobre a tela toda)
    var col = $('.dive-bubbles');
    if (col) {
      for (var j = 0; j < 26; j++) {
        var bb = document.createElement('b');
        var s = 5 + Math.random() * 14;
        bb.style.setProperty('--x', (Math.random() * 100) + '%');
        bb.style.setProperty('--s', s.toFixed(1) + 'px');
        bb.style.setProperty('--d', (12 + Math.random() * 16).toFixed(1) + 's');
        bb.style.setProperty('--dl', (-Math.random() * 28).toFixed(1) + 's');
        col.appendChild(bb);
      }
    }
  });

  /* -- 9. O MERGULHO: rolagem -> profundidade (--p) --------------------
     Só ajusta --p. O escurecimento das camadas de água é 100% CSS
     (opacity: calc() em cima de --p) => contínuo, sem emendas. */
  S(function () {
    var root = document.documentElement;
    var body = document.body, last = -1;
    function clamp(v){ return v < 0 ? 0 : v > 1 ? 1 : v; }
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? clamp(window.scrollY / h) : 0;
      if (Math.abs(p - last) < 0.002) return;
      last = p;
      root.style.setProperty('--p', p.toFixed(4));
      body.classList.toggle('is-deep', p > 0.45);
    }
    if (reduce) { root.style.setProperty('--p', '0.4'); return; }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function(){ last = -1; update(); }, { passive: true });
    setInterval(update, 150);   // rede de segurança (alguns navegadores/preview engolem o scroll)
    update();
  });

})();
