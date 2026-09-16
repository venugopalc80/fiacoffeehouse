(() => {
  const products = [
    ['Coffee','Americano',3.4],['Coffee','Cappuccino',3.4],['Coffee','Latte',3.4],
    ['Coffee','Iced Pistachio & White Chocolate Latte',4.8],['Coffee','Iced Spanish Latte',4.5],
    ['Matcha','White Chocolate Matcha',4.5],['Matcha','Raspberry & White Chocolate Matcha',4.8],['Matcha','Rosemo & White Chocolate Matcha',4.8],['Matcha','Mango Matcha',4.6],['Matcha','Vanilla Collagen Matcha',4.6],
    ['Drinks','Orange Juice',3.5],['Drinks','Cola',2.5],['Drinks','Still Water',2],['Drinks','Classic Hot',4],['Drinks','Strawberry & Lime',4],['Drinks','Pomegranate & Red Bull Fusion',4.5],
    ['Drinks','Psh Chai',4.2],['Drinks','Dabterchd',4.2],['Drinks','Lotus Hot Chocolate',4.3],['Drinks','Hazelnut Chai',4.2],['Drinks','English Tea',3.2],['Drinks','Lemon Tea',2.8],
    ['Bakery','Cheesecake Choc Cookie',4.5],['Bakery','Pistachio & White Chocolate Cookie',4.5],['Bakery','Pistachio & Blackberry Cookie',4.5],['Bakery','Peach & Croissant',4.6],['Bakery','Raspberry Croissant',4.6],
    ['Brunch','Honey Roast Pocket',9.5],['Brunch','Spicy Chicken Samba',9.5],['Brunch','Avocado Veg Taco',9.5],['Brunch','Fried Chicken Baguette',8.5],['Brunch','Chicken Caesar Baguette',8.5],['Brunch','Creamy Garlic Prawn & Steak',14.5],['Brunch','Crispy Chicken Alfredo',13.5],['Brunch','Chicken Caesar Pasta Salad',12.5],['Brunch','Truffle Skinny Fries',5.5],['Brunch','Harissa Chicken Fries',5.5],['Brunch','Kunafa French Toast',9.5],['Brunch','Mixed Berry French Toast',9.5]
  ];
  const money = n => `£${n.toFixed(2)}`;
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('fia-cart') || '[]'); } catch (_) { cart = []; }
  let active = 'All';
  let mountedFor = null;

  const save = () => { localStorage.setItem('fia-cart', JSON.stringify(cart)); updateCartUI(); };
  const total = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = () => cart.reduce((sum, item) => sum + item.qty, 0);
  const add = (name, price) => {
    const item = cart.find(x => x.name === name);
    if (item) item.qty += 1;
    else cart.push({ name, price, qty: 1 });
    save();
    openCart();
  };
  const change = (name, delta) => {
    const item = cart.find(x => x.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(x => x.name !== name);
    save();
  };

  function mount() {
    const hash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
    const page = document.querySelector('.order-page');
    if (hash !== 'online-order' || !page) return;
    if (page.querySelector('.fia-order-shop')) { updateCartUI(); return; }

    const oldForm = document.querySelector('.order-form-wrap');
    if (oldForm) oldForm.remove();

    page.innerHTML = `
      <div class="fia-order-shop">
        <div class="fia-order-heading">
          <div>
            <p class="eyebrow">ONLINE ORDER</p>
            <h2>Choose your favourites.</h2>
            <p>Browse the FIA menu, add your favourites to your cart and choose a collection time.</p>
          </div>
          <button class="fia-cart-trigger" type="button" aria-label="Open shopping cart">Cart <span id="fia-cart-count">0</span></button>
        </div>
        <div class="fia-order-tabs" role="tablist" aria-label="Order categories">
          ${['All','Coffee','Matcha','Drinks','Bakery','Brunch'].map(x => `<button type="button" class="${active === x ? 'active' : ''}" data-cat="${x}">${x}</button>`).join('')}
        </div>
        <div class="fia-products">
          ${products.map((p, i) => `<article class="fia-product" data-category="${p[0]}"><div><small>${p[0]}</small><h3>${p[1]}</h3></div><div class="fia-product-bottom"><strong>${money(p[2])}</strong><button type="button" data-add="${i}">Add to Cart</button></div></article>`).join('')}
        </div>
      </div>
      <aside class="fia-cart" aria-hidden="true" aria-label="Shopping cart">
        <div class="fia-cart-head"><div><p class="eyebrow">YOUR ORDER</p><h3>Your Cart</h3></div><button type="button" data-close-cart aria-label="Close cart">×</button></div>
        <div class="fia-cart-items" id="fia-cart-items"></div>
        <div class="fia-cart-footer">
          <div class="fia-cart-total"><span>Total</span><strong id="fia-cart-total">£0.00</strong></div>
          <form id="fia-checkout">
            <input required name="name" placeholder="Name" autocomplete="name">
            <input required name="phone" type="tel" placeholder="Phone" autocomplete="tel">
            <div class="fia-checkout-row"><input required name="date" type="date" aria-label="Collection date"><input required name="time" type="time" aria-label="Collection time"></div>
            <textarea name="notes" placeholder="Notes (Optional)"></textarea>
            <button class="dark-btn" type="submit">Send Order Request <span>→</span></button>
            <p class="fia-order-success" id="fia-order-success" hidden>Thanks — your order request has been recorded.</p>
          </form>
        </div>
      </aside>
      <div class="fia-cart-backdrop" data-close-cart></div>`;

    page.querySelectorAll('[data-cat]').forEach(btn => btn.addEventListener('click', () => {
      active = btn.dataset.cat;
      page.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b === btn));
      page.querySelectorAll('.fia-product').forEach(card => { card.hidden = active !== 'All' && card.dataset.category !== active; });
    }));
    page.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => {
      const p = products[Number(btn.dataset.add)];
      add(p[1], p[2]);
    }));
    page.querySelector('.fia-cart-trigger').addEventListener('click', openCart);
    page.querySelectorAll('[data-close-cart]').forEach(el => el.addEventListener('click', closeCart));
    page.querySelector('#fia-checkout').addEventListener('submit', event => {
      event.preventDefault();
      if (!cart.length) { openCart(); return; }
      page.querySelector('#fia-order-success').hidden = false;
      cart = [];
      save();
    });

    mountedFor = page;
    updateCartUI();
  }

  function openCart() {
    const cartPanel = document.querySelector('.fia-cart');
    if (!cartPanel) return;
    cartPanel.classList.add('is-open');
    cartPanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('fia-cart-open');
  }

  function closeCart() {
    const cartPanel = document.querySelector('.fia-cart');
    if (!cartPanel) return;
    cartPanel.classList.remove('is-open');
    cartPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('fia-cart-open');
  }

  function updateCartUI() {
    const items = document.getElementById('fia-cart-items');
    if (!items) return;
    const badge = document.getElementById('fia-cart-count');
    const totalEl = document.getElementById('fia-cart-total');
    if (badge) badge.textContent = count();
    if (totalEl) totalEl.textContent = money(total());
    items.innerHTML = cart.length ? cart.map(item => `
      <div class="fia-cart-item">
        <div><strong>${item.name}</strong><small>${money(item.price)} each</small><div class="fia-qty"><button type="button" data-minus="${item.name}" aria-label="Decrease ${item.name}">−</button><span>${item.qty}</span><button type="button" data-plus="${item.name}" aria-label="Increase ${item.name}">+</button></div></div>
        <b>${money(item.price * item.qty)}</b>
      </div>`).join('') : `<div class="fia-empty-cart">Your cart is empty.<br><small>Add something delicious from the menu.</small></div>`;
    items.querySelectorAll('[data-minus]').forEach(btn => btn.onclick = () => change(btn.dataset.minus, -1));
    items.querySelectorAll('[data-plus]').forEach(btn => btn.onclick = () => change(btn.dataset.plus, 1));
  }

  window.addEventListener('hashchange', () => setTimeout(mount, 80));
  new MutationObserver(() => setTimeout(mount, 30)).observe(document.body, { childList: true, subtree: true });
  setTimeout(mount, 120);
})();
