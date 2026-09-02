/* WasFit — script de página (extraído do <script> inline do index/servicos
   para permitir CSP sem 'unsafe-inline'). Reveal fallback + linha do tempo
   da implantação + carrossel das IAs. Guardado por querySelector: no-op
   nas páginas que não têm esses elementos. */
/* Home: rede de segurança do reveal. O ein.js revela os blocos .rise com
   IntersectionObserver ao rolar; se em algum navegador isso não pegar, todo
   o conteúdo continua visível. Não afeta a animação de quem rola normalmente. */
(function () {
  function showAll() {
    var n = document.querySelectorAll('.rise:not(.in)');
    for (var i = 0; i < n.length; i++) n[i].classList.add('in');
  }
  window.addEventListener('load', function () { setTimeout(showAll, 1400); });
  setTimeout(showAll, 4000);

  /* Movimento (doc "Ajustes de design", item 7): o trilho da linha do tempo
     da implantação preenche conforme a seção passa pela tela. */
  try {
    var grid = document.querySelector('#implantacao > .grid');
    if (grid && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var raf = 0;
      var tick = function () {
        raf = 0;
        var r = grid.getBoundingClientRect(), vh = window.innerHeight || 1;
        var p = (vh * 0.75 - r.top) / (r.height + vh * 0.25);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        grid.style.setProperty('--impl-progress', (p * 100).toFixed(1) + '%');
      };
      addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
      addEventListener('resize', tick, { passive: true });
      tick();
    }
  } catch (e) {}

  /* Carrossel das 8 IAs do EVO (#ias). Scroll-snap nativo faz o alinhamento;
     o JS só liga as setas, gera as bolinhas e mantém tudo em sincronia com
     o scroll. Sem autoplay — o ritmo é do usuário. */
  try {
    var car = document.querySelector('#ias [data-carousel]');
    if (car) {
      var track = car.querySelector('[data-car-track]');
      var slides = [].slice.call(track.querySelectorAll('[data-car-slide]'));
      var prevBtn = car.querySelector('.ias-car__arrow--prev');
      var nextBtn = car.querySelector('.ias-car__arrow--next');
      var dotsWrap = car.querySelector('[data-car-dots]');

      var dots = slides.map(function (s, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ir para a IA ' + (i + 1) + ' de ' + slides.length);
        b.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(b);
        return b;
      });

      function currentIdx() {
        var best = 0, bestD = Infinity, x = track.scrollLeft;
        for (var i = 0; i < slides.length; i++) {
          var d = Math.abs(slides[i].offsetLeft - x);
          if (d < bestD) { bestD = d; best = i; }
        }
        return best;
      }
      function go(i) {
        i = i < 0 ? 0 : i > slides.length - 1 ? slides.length - 1 : i;
        track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
      }
      function sync() {
        var atStart = track.scrollLeft <= 2;
        var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        var i = atEnd ? slides.length - 1 : atStart ? 0 : currentIdx();
        for (var d = 0; d < dots.length; d++) {
          dots[d].setAttribute('aria-current', d === i ? 'true' : 'false');
        }
        if (prevBtn) prevBtn.disabled = atStart;
        if (nextBtn) nextBtn.disabled = atEnd;
      }
      if (prevBtn) prevBtn.addEventListener('click', function () { go(currentIdx() - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { go(currentIdx() + 1); });

      var craf = 0;
      track.addEventListener('scroll', function () {
        if (!craf) craf = requestAnimationFrame(function () { craf = 0; sync(); });
      }, { passive: true });
      addEventListener('resize', function () { if (!craf) craf = requestAnimationFrame(function () { craf = 0; sync(); }); }, { passive: true });
      sync();
    }
  } catch (e) {}

  /* Jornada do lead (#historia) — stepper clicável. SEM autoplay: as
     etapas só mudam quando a pessoa toca. Sem libs: estado nativo + CSS. */
  try {
    var lj = document.querySelector('[data-lj]');
    if (lj) {
      var ljReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var ljPanels = [].slice.call(lj.querySelectorAll('[data-lj-panel]'));
      var ljSteps  = [].slice.call(lj.querySelectorAll('[data-lj-step]'));
      var ljTitle  = lj.querySelector('[data-lj-title]');
      var ljTime   = lj.querySelector('[data-lj-time]');
      var ljCap    = lj.querySelector('[data-lj-caption]');
      var LJ_META = [
        { title: 'WasFit · Atendimento', time: '22:47', cap: 'Ela parou de responder. A IA organiza o que acontece depois.' },
        { title: 'WasFit · Kanban',      time: '22:55', cap: 'Quando a equipe abre o Kanban, não precisa procurar quem ficou para trás.' },
        { title: 'WasFit · Atendimento', time: '09:04', cap: 'Sua equipe não recomeça. Ela continua de onde a IA parou.' },
        { title: 'WasFit · Kanban',      time: '09:08', cap: 'A situação mudou. A organização muda junto.' }
      ];

      /* Kanban: rola a coluna em foco para a vista e, na etapa 4, faz o
         card viajar da coluna "Em Espera" para "Experimental Agendada". */
      var ljKanban = function (i, viaUser) {
        var p = ljPanels[i];
        if (!p) return;
        var board = p.querySelector('[data-lj-board]');
        if (board) {
          // no celular a etapa só ganha layout depois do display:block; rAF garante medida válida
          requestAnimationFrame(function () {
            var focus = board.querySelector('[data-lj-focus]');
            if (!focus) return;
            var delta = focus.getBoundingClientRect().left - board.getBoundingClientRect().left - 10;
            var left = Math.max(0, board.scrollLeft + delta);
            try { board.scrollTo({ left: left, behavior: (viaUser || ljReduce) ? 'auto' : 'smooth' }); }
            catch (e) { board.scrollLeft = left; }
          });
        }
        // reseta qualquer transform pendente do card em todas as etapas
        ljPanels.forEach(function (pp) {
          var t = pp.querySelector('[data-lj-ticket]');
          if (t && pp !== p) { t.style.transition = 'none'; t.style.transform = 'none'; }
        });
        if (i !== 3 || ljReduce || window.innerWidth < 760) return;
        var tk = p.querySelector('[data-lj-ticket]');
        var from = p.querySelector('[data-lj-from]');
        if (!tk || !from) return;
        tk.style.transition = 'none'; tk.style.transform = 'none';
        requestAnimationFrame(function () {
          var a = from.getBoundingClientRect(), b = tk.getBoundingClientRect();
          var dx = Math.round(a.left - b.left), dy = Math.round(a.top - b.top);
          if (!dx && !dy) return;
          tk.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
          tk.getBoundingClientRect();
          requestAnimationFrame(function () {
            tk.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
            tk.style.transform = 'translate(0,0)';
          });
        });
      };

      var ljSetStep = function (i, viaUser) {
        i = i < 0 ? 0 : i > ljPanels.length - 1 ? ljPanels.length - 1 : i;
        ljPanels.forEach(function (p, k) {
          var on = k === i;
          p.classList.toggle('is-active', on);
          p.setAttribute('aria-hidden', on ? 'false' : 'true');
        });
        ljSteps.forEach(function (b, k) {
          var on = k === i;
          b.classList.toggle('is-active', on);
          if (on) b.setAttribute('aria-current', 'step');
          else b.removeAttribute('aria-current');
        });
        [].forEach.call(lj.querySelectorAll('[data-lj-ex]'), function (ex) {
          ex.classList.toggle('is-active', +ex.getAttribute('data-lj-ex') === i);
        });
        lj.classList.toggle('is-chat', i === 0 || i === 2);
        var m = LJ_META[i] || LJ_META[0];
        if (ljTitle) ljTitle.textContent = m.title;
        if (ljTime) ljTime.textContent = m.time;
        if (ljCap) ljCap.textContent = m.cap;
        lj.style.setProperty('--lj-progress', (i / (ljPanels.length - 1) * 100).toFixed(1) + '%');
        ljKanban(i, viaUser);
        if (viaUser) {
          try { (window.dataLayer = window.dataLayer || []).push({ event: 'lead_story_step_click', step: i + 1 }); } catch (e) {}
        }
      };

      ljSteps.forEach(function (b, k) {
        b.addEventListener('click', function () { ljSetStep(k, true); });
      });

      ljSetStep(0, false);

      /* count-up dos números da conta (R$ 3.000 / 36.000 / 28.836) —
         uma vez cada, respeitando reduced-motion */
      var ljNums = [].slice.call(lj.querySelectorAll('[data-lj-num]'));
      if (ljNums.length && !ljReduce && 'IntersectionObserver' in window) {
        var ljNIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var el = e.target;
            ljNIO.unobserve(el);
            var to = parseInt(el.getAttribute('data-to'), 10) || 0;
            var t0 = performance.now(), dur = 1000;
            (function frame(now) {
              var p = Math.min(1, (now - t0) / dur);
              el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('pt-BR');
              if (p < 1) requestAnimationFrame(frame);
            })(t0);
          });
        }, { threshold: 0.6 });
        ljNums.forEach(function (n) { ljNIO.observe(n); });
      }
    }
  } catch (e) {}
})();
