(() => {
  const hashes = {
    Home: '#Home',
    Menu: '#Menu',
    Gallery: '#Gallery',
    About: '#About',
    'Visit Us': '#visit-us',
    'Online Order': '#online-order',
    'Book a Table': '#book-a-table'
  };

  function navigate(label) {
    const clean = label.replace(/→/g, '').trim();
    const target = clean === 'View Menu' ? 'Menu' : clean === 'Order Online' ? 'Online Order' : clean;
    const hash = hashes[target];
    if (!hash) return false;
    if (window.location.hash !== hash) window.location.hash = hash;
    else window.dispatchEvent(new HashChangeEvent('hashchange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');
    if (nav?.classList.contains('open')) toggle?.click();
    return true;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.main-nav button, footer nav button, .brand, .hero .cream-btn');
    if (!button) return;
    const label = button.textContent.trim();
    if (!hashes[label] && label !== 'View Menu' && label !== 'Order Online') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    navigate(label);
  }, true);

  const filterMap = {
    All: () => true,
    Coffee: title => ['Iced Coffee', 'Hot Drinks', 'Hot Drinks (FIA)', 'Add Ons'].includes(title),
    Matcha: title => title === 'Matcha',
    Drinks: title => ['Iced Coffee', 'Juices & Soft Drinks', 'Hot Drinks', 'Hot Drinks (FIA)'].includes(title),
    Bakery: title => title === 'Bakery',
    Brunch: () => false
  };

  function setupMenuTabs() {
    const tabs = [...document.querySelectorAll('.menu-tabs button')];
    if (!tabs.length) return;

    const desired = ['All', 'Coffee', 'Matcha', 'Drinks', 'Bakery', 'Brunch'];
    tabs.slice(0, desired.length).forEach((tab, index) => { tab.textContent = desired[index]; });

    const menuColumns = document.querySelector('.menu-columns');
    const brunchPanel = document.querySelector('.brunch-panel');
    const groups = [...document.querySelectorAll('.menu-columns .menu-group')];

    function applyFilter(filter) {
      tabs.forEach(tab => tab.classList.toggle('active', tab.textContent.trim() === filter));
      if (menuColumns) menuColumns.style.display = filter === 'Brunch' ? 'none' : '';
      if (brunchPanel) brunchPanel.style.display = filter === 'Brunch' || filter === 'All' ? '' : 'none';
      const test = filterMap[filter] || filterMap.All;
      groups.forEach(group => {
        const title = group.querySelector('h3')?.textContent.trim() || '';
        group.style.display = test(title) ? '' : 'none';
      });
    }

    tabs.forEach(tab => {
      if (tab.dataset.interactionFixed === '1') return;
      tab.dataset.interactionFixed = '1';
      tab.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        applyFilter(tab.textContent.trim());
      }, true);
    });

    applyFilter(tabs.find(tab => tab.classList.contains('active'))?.textContent.trim() || 'All');
  }

  const observer = new MutationObserver(() => setupMenuTabs());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupMenuTabs);
  else setupMenuTabs();
})();
