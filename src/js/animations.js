import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function init() {
  if (prefersReduced) return;

  const reveals = document.querySelectorAll('[data-reveal]');
  reveals.forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  const cards = document.querySelectorAll('.card');
  if (cards.length) {
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cards[0],
        start: 'top 85%',
        once: true,
      },
    });
  }

  const tags = document.querySelectorAll('.tag');
  if (tags.length) {
    gsap.from(tags, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: tags[0],
        start: 'top 85%',
        once: true,
      },
    });
  }

  const nav = document.querySelector('.nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        nav.classList.toggle('is-scrolled', self.progress > 0);
      },
    });
  }
}
