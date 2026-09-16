(() => {
  const TIKTOK_URL = 'https://www.tiktok.com/@fiacoffeehouse';

  function updateTikTokLink() {
    const socialLinks = document.querySelectorAll('.footer-social a');
    if (socialLinks.length >= 3) {
      const link = socialLinks[2];
      link.href = TIKTOK_URL;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.setAttribute('aria-label', 'FIA Coffeehouse on TikTok');
    }
  }

  updateTikTokLink();
  new MutationObserver(updateTikTokLink).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
