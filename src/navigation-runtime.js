// Small navigation compatibility layer. It is intentionally passive: React owns
// the current page state. This only provides a safe global for older cached bundles.
(() => {
  const routes = {
    home: '',
    menu: 'menu',
    gallery: 'gallery',
    about: 'about',
    'visit us': 'visit-us',
    'online order': 'online-order',
    'book a table': 'book-a-table',
    seasonal: 'seasonal',
    'gift cards': 'gift-cards'
  };

  window.navigate = (label) => {
    const key = String(label || '')
      .replace(/→/g, '')
      .trim()
      .toLowerCase();
    const hash = routes[key];
    if (hash === undefined) return false;

    // Update the URL only. The React app's hashchange listener is responsible
    // for rendering the requested page, avoiding competing DOM navigation logic.
    if (window.location.hash.slice(1).toLowerCase() !== hash) {
      window.location.hash = hash;
    } else {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    return true;
  };
})();
