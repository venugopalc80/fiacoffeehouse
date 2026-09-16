// Native navigation fallback for FIA.
// React remains the source of truth, but these links also work if a cached
// React bundle misses an onClick handler. This listener never prevents or
// stops the original event, so it cannot break other site interactions.
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
    'gift cards': 'gift-cards',
    'view menu': 'menu',
    'order online': 'online-order',
    'explore the menu': 'menu',
    'start an order': 'online-order',
    'find fia': 'visit-us'
  };

  function routeFor(button) {
    if (!button) return undefined;
    const text = button.textContent
      .replace(/→/g, '')
      .replace(/✓/g, '')
      .replace(/·\s*\d+$/g, '')
      .trim()
      .toLowerCase();
    return routes[text];
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button, a');
    if (!button) return;

    // Do not touch external links, forms, mobile menu toggle, or cart controls.
    if (button.classList.contains('mobile-toggle') ||
        button.classList.contains('fia-cart-trigger') ||
        button.closest('.fia-cart') ||
        button.closest('form') ||
        button.tagName === 'A') return;

    const hash = routeFor(button);
    if (hash === undefined) return;

    // Let React's own handler run as normal. This native fallback simply
    // guarantees that the URL/hash changes even if the React handler is stale.
    if (window.location.hash.slice(1).toLowerCase() !== hash) {
      window.location.hash = hash;
    } else {
      // Clicking the current route should still return the user to the top.
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, true);

  // Keep compatibility for any previously cached bundle that calls navigate().
  window.navigate = (label) => {
    const key = String(label || '').replace(/→/g, '').trim().toLowerCase();
    const hash = routes[key];
    if (hash === undefined) return false;
    if (window.location.hash.slice(1).toLowerCase() !== hash) {
      window.location.hash = hash;
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    return true;
  };
})();
