import de from './locales/de.js';
import en from './locales/en.js';

const dictionaries = { de, en };
let current = 'de';

function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function apply(lang) {
  current = lang;
  const dict = dictionaries[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = resolve(dict, el.dataset.i18n);
    if (val) el.textContent = val;
  });
  document.documentElement.lang = lang;
}

export function init() {
  const btn = document.querySelector('.lang-switch');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = current === 'de' ? 'en' : 'de';
    apply(next);
    btn.textContent = next === 'de' ? 'EN' : 'DE';
    btn.dataset.lang = current === 'de' ? 'en' : 'de';
  });
}

export function getLang() { return current; }
