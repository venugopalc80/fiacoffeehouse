// Navigation safety layer: keep hash-based routing responsive even when a button's
// React handler is not available during hydration or after a cached deployment.
const routes = {
  'Home': 'home',
  'Menu': 'menu',
  'Gallery': 'gallery',
  'About': 'about',
  'Visit Us': 'visit-us',
  'Online Order': 'online-order',
  'Book a Table': 'book-a-table',
};

document.addEventListener('click', (event) => {
  const button = event.target.closest('.main-nav button, footer nav button, .brand');
  if (!button) return;

  const label = button.textContent.trim();
  const hash = routes[label];
  if (!hash) return;

  event.preventDefault();
  event.stopImmediatePropagation();

  const nextHash = `#${hash}`;
  if (window.location.hash === nextHash) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  window.history.pushState({}, '', nextHash);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, true);
