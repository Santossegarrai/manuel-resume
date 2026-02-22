/**
 * main.js — Manuel Santos Portfolio
 *
 * PARALLAX — identical approach to original working version.
 *
 * #parallax-wrap:
 *   position:fixed  (pinned to viewport, never scrolls)
 *   background-size: auto 200%  (image is 2× viewport height)
 *   background-position-y is animated by JS
 *
 * As user scrolls from top to bottom:
 *   backgroundPositionY goes from 0% → PARALLAX_END_PCT %
 *   This pans the image from its top toward its center/bottom.
 *
 * Content scrolls at 100%.
 * Background pans slowly — clear parallax depth effect.
 *
 * PARALLAX_END_PCT:
 *   10 = very subtle  |  40 = original  |  80 = dramatic
 */

(function () {
  'use strict';

  var wrap = document.getElementById('parallax-wrap');

  var PARALLAX_END_PCT = 70;   /* 70% = fast, very visible parallax */

  /* ── PARALLAX ───────────────────────────────────────────── */
  function updateParallax() {
    if (!wrap) return;

    var scrollY = window.scrollY || window.pageYOffset;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    var progress = scrollY / maxScroll;          /* 0 → 1   */
    var posY = progress * PARALLAX_END_PCT;  /* 0 → 70% */

    wrap.style.backgroundPositionY = posY + '%';
  }

  updateParallax();
  window.addEventListener('load', updateParallax);

  /* ── SCROLL (rAF throttled) ─────────────────────────────── */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── FADE-IN ────────────────────────────────────────────── */
  var fadeEls = document.querySelectorAll('.fade-in');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target;
        var idx = Array.from(el.parentElement.querySelectorAll('.fade-in')).indexOf(el);
        el.style.transitionDelay = (idx * 0.12) + 's';
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(function (el) { observer.observe(el); });

  /* ── HERO INIT ──────────────────────────────────────────── */
  var heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transitionDelay = '0.3s';
    heroContent.classList.add('visible');
  }

}());
