import '../css/fonts.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/components.css';
import '../css/sections.css';

import { init as initI18n } from './i18n.js';
import { init as initAnimations } from './animations.js';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initLenis() {
  if (prefersReduced) return;
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({ lerp: 0.1 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
}

function initGL() {
  const canvas = document.getElementById('gl-stage');
  if (!canvas) return;
  if (prefersReduced) { canvas.style.display = 'none'; return; }
  import('../gl/index.js').then(({ init }) => init(canvas));
}

function initNav() {
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !open);
    menu.classList.toggle('is-open', !open);
    menu.setAttribute('aria-hidden', open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;
    const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
    window.location.href = `mailto:christopher.buechner@protonmail.com?subject=${subject}&body=${body}`;
  });
}

function hidePreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  if (prefersReduced) { el.classList.add('is-hidden'); return; }
  setTimeout(() => el.classList.add('is-hidden'), 600);
}

document.addEventListener('DOMContentLoaded', () => {
  hidePreloader();
  initNav();
  initI18n();
  initAnimations();
  initContactForm();
  initLenis();
  initGL();
});
