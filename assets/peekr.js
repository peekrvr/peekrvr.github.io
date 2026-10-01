/* Peekr VR site — progressive enhancements only. No network calls, no storage beyond the language choice. */
(function () {
  var d = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* language switch (index only) */
  function setLang(l) {
    d.classList.remove('ja', 'en'); d.classList.add(l); d.lang = l;
    var bj = document.getElementById('btnJa'), be = document.getElementById('btnEn');
    if (bj) bj.setAttribute('aria-pressed', String(l === 'ja'));
    if (be) be.setAttribute('aria-pressed', String(l === 'en'));
    try { localStorage.setItem('peekr_lang', l); } catch (e) {}
  }
  window.setLang = setLang;
  var btns = document.querySelectorAll('[data-set-lang]');
  if (btns.length) {
    setLang(d.classList.contains('en') ? 'en' : 'ja');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () { setLang(this.getAttribute('data-set-lang')); });
    }
  }

  /* head-look: the curved panel turns a few degrees with the pointer (fine pointers only) */
  var stage = document.getElementById('stage');
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (stage && fine && !reduce) {
    var rig = stage.querySelector('.stage__rig'), raf = 0, tx = 0, ty = 0;
    var hero = stage.closest('.hero') || stage;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        rig.style.setProperty('--ry', (tx * 6).toFixed(2) + 'deg');
        rig.style.setProperty('--rx', (-ty * 3).toFixed(2) + 'deg');
      });
    });
    hero.addEventListener('pointerleave', function () {
      rig.style.setProperty('--ry', '0deg'); rig.style.setProperty('--rx', '0deg');
    });
  }

  /* zoom loop: downloads and plays only while on screen; never under reduced motion */
  var loops = document.querySelectorAll('.js-loop');
  if (loops.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting && !reduce) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else if (!v.paused) { v.pause(); }
      });
    }, { threshold: 0.35 });
    for (var j = 0; j < loops.length; j++) {
      if (reduce) loops[j].setAttribute('controls', '');
      io.observe(loops[j]);
    }
  }

  /* trailer: swap the poster link for a player only when asked */
  var reel = document.querySelector('.js-reel');
  if (reel) {
    reel.addEventListener('click', function (e) {
      e.preventDefault();
      var v = document.createElement('video');
      v.src = reel.getAttribute('href');
      v.controls = true; v.playsInline = true; v.preload = 'auto';
      v.setAttribute('poster', './assets/trailer_cover.jpg');
      v.setAttribute('aria-label', 'Peekr VR trailer');
      reel.parentNode.replaceChild(v, reel);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      v.focus();
    });
  }
})();
