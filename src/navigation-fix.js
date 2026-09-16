(() => {
  const routes = {
    'home': 'home',
    'menu': 'menu',
    'gallery': 'gallery',
    'about': 'about',
    'visit us': 'visit-us',
    'online order': 'online-order',
    'book a table': 'book-a-table'
  };

  function navigate(label) {
    const hash = routes[label.trim().toLowerCase()];
    if (!hash) return false;
    window.history.pushState({}, '', `#${hash}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    window.scrollTo({ top: 0, behavior: 'auto' });
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');
    if (nav?.classList.contains('open')) toggle?.click();
    return true;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.main-nav button, .footer nav button');
    if (!button) return;
    const label = button.textContent.replace(/→/g, '').trim();
    if (!routes[label.toLowerCase()]) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    navigate(label);
  }, true);
})();
