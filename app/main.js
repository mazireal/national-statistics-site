// Meridian Atlas router: hash routes for overview, country, compare,
// rankings and sources. Unknown routes fall back to the overview.
import { renderOverview, renderCountry, renderCompare, renderRankings, renderAbout } from './views.js';

const view = document.getElementById('view');
const navLinks = [...document.querySelectorAll('[data-nav]')];

function markNav(name) {
  for (const link of navLinks) link.classList.toggle('active', link.dataset.nav === name);
}

function route() {
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  window.scrollTo(0, 0);
  if (parts.length === 0) {
    markNav('home');
    document.title = 'Meridian Atlas — National Statistics Explorer';
    renderOverview(view);
  } else if (parts[0] === 'country' && parts[1]) {
    markNav('home');
    renderCountry(view, parts[1].toUpperCase());
  } else if (parts[0] === 'compare') {
    markNav('compare');
    document.title = 'Compare countries — Meridian Atlas';
    renderCompare(view);
  } else if (parts[0] === 'rankings') {
    markNav('rankings');
    document.title = 'Rankings — Meridian Atlas';
    renderRankings(view);
  } else if (parts[0] === 'about') {
    markNav('about');
    document.title = 'Sources and methods — Meridian Atlas';
    renderAbout(view);
  } else {
    markNav('home');
    renderOverview(view);
  }
}

window.addEventListener('hashchange', route);
route();
