// Compatibility navigation bridge for cached/older FIA bundles.
// The current React source uses the Shell `go` handler directly, but this
// global keeps older cached bundles from throwing `navigate is not defined`.
(() => {
  const routes = {
    Home: '',
    Menu: 'menu',
    Gallery: 'gallery',
    About: 'about',
    'Visit Us': 'visit-us',
    'Online Order': 'online-order',
    'Book a Table': 'book-a-table',
    Seasonal: 'seasonal',
    'Gift Cards': 'gift-cards'
  };

  window.navigate = (label) => {
    const key = String(label || '').replace(/→/g, '').trim();
    const hash = routes[key];
    if (hash === undefined) return false;

    if (window.location.hash.slice(1) !== hash) {
      window.location.hash = hash;
    } else {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.mobile-toggle');
    if (nav?.classList.contains('open')) toggle?.click();
    return true;
  };
})();
