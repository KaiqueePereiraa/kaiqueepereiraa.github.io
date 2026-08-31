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
})();
