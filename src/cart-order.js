(() => {
  const products = [
    ['Coffee','Americano',3.4],['Coffee','Cappuccino',3.4],['Coffee','Latte',3.4],['Coffee','Iced Spanish Latte',4.5],['Coffee','Iced Pistachio & White Chocolate Latte',4.8],
    ['Matcha','White Chocolate Matcha',4.5],['Matcha','Raspberry & White Chocolate Matcha',4.8],['Matcha','Mango Matcha',4.6],['Matcha','Vanilla Collagen Matcha',4.6],
    ['Drinks','Orange Juice',3.5],['Drinks','Cola',2.5],['Drinks','Still Water',2],['Drinks','Strawberry & Lime',4],['Drinks','Pomegranate & Red Bull Fusion',4.5],
    ['Bakery','Cheesecake Choc Cookie',4.5],['Bakery','Pistachio & White Chocolate Cookie',4.5],['Bakery','Pistachio & Blackberry Cookie',4.5],['Bakery','Peach & Croissant',4.6],['Bakery','Raspberry Croissant',4.6],
    ['Brunch','Honey Roast Pocket',9.5],['Brunch','Spicy Chicken Samba',9.5],['Brunch','Avocado Veg Taco',9.5],['Brunch','Fried Chicken Baguette',8.5],['Brunch','Chicken Caesar Baguette',8.5],['Brunch','Creamy Garlic Prawn & Steak',14.5],['Brunch','Crispy Chicken Alfredo',13.5],['Brunch','Chicken Caesar Pasta Salad',12.5],['Brunch','Truffle Skinny Fries',5.5],['Brunch','Harissa Chicken Fries',5.5],['Brunch','Kunafa French Toast',9.5],['Brunch','Mixed Berry French Toast',9.5]
  ];
  const money = n => `£${n.toFixed(2)}`;
  let cart = JSON.parse(localStorage.getItem('fia-cart') || '[]');
  let active = 'All';
  let mounted = false;

  function save(){localStorage.setItem('fia-cart', JSON.stringify(cart)); updateCartUI();}
  function add(name, price){const item=cart.find(x=>x.name===name); if(item)item.qty++; else cart.push({name,price,qty:1}); save(); openCart();}
  function change(name,delta){const item=cart.find(x=>x.name===name); if(!item)return; item.qty+=delta; if(item.qty<=0)cart=cart.filter(x=>x.name!==name); save();}
  function total(){return cart.reduce((s,x)=>s+x.price*x.qty,0)}
  function count(){return cart.reduce((s,x)=>s+x.qty,0)}

  function mount(){
    if(location.hash.replace('#','')!=='online-order') {mounted=false; return;}
    const root=document.querySelector('.order-page');
    const oldForm=document.querySelector('.order-form-wrap');
    if(!root || !oldForm) return;
    if(mounted && document.querySelector('.fia-order-shop')) {updateCartUI(); return;}
    mounted=true;
    oldForm.remove();
    root.innerHTML=`<div class="fia-order-shop">
      <div class="fia-order-heading"><div><p class="eyebrow">ONLINE ORDER</p><h2>Choose your favourites.</h2><p>Build your order, choose a collection time and send your request to FIA.</p></div><button class="fia-cart-trigger" type="button" aria-label="Open cart">Cart <span id="fia-cart-count">0</span></button></div>
      <div class="fia-order-tabs">${['All','Coffee','Matcha','Drinks','Bakery','Brunch'].map(x=>`<button type="button" class="${active===x?'active':''}" data-cat="${x}">${x}</button>`).join('')}</div>
      <div class="fia-products">${products.map((p,i)=>`<article class="fia-product" data-category="${p[0]}"><div><small>${p[0]}</small><h3>${p[1]}</h3></div><div class="fia-product-bottom"><strong>${money(p[2])}</strong><button type="button" data-add="${i}">Add to cart</button></div></article>`).join('')}</div>
    </div>
    <aside class="fia-cart" aria-hidden="true"><div class="fia-cart-head"><div><p class="eyebrow">YOUR ORDER</p><h3>Cart</h3></div><button type="button" data-close-cart aria-label="Close cart">×</button></div><div class="fia-cart-items" id="fia-cart-items"></div><div class="fia-cart-footer"><div class="fia-cart-total"><span>Total</span><strong id="fia-cart-total">£0.00</strong></div><form id="fia-checkout"><input required name="name" placeholder="Name"><input required name="phone" type="tel" placeholder="Phone"><div class="fia-checkout-row"><input required name="date" type="date"><input required name="time" type="time"></div><textarea name="notes" placeholder="Notes (Optional)"></textarea><button class="dark-btn" type="submit">Send Order Request <span>→</span></button><p class="fia-order-success" id="fia-order-success" hidden>Thanks — your order request has been recorded.</p></form></div></aside><div class="fia-cart-backdrop" data-close-cart></div>`;
    document.querySelectorAll('[data-cat]').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.cat;document.querySelectorAll('[data-cat]').forEach(b=>b.classList.toggle('active',b===btn));document.querySelectorAll('.fia-product').forEach(card=>card.hidden=active!=='All'&&card.dataset.category!==active)}));
    document.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>{const p=products[Number(btn.dataset.add)];add(p[1],p[2]);}));
    document.querySelector('.fia-cart-trigger').addEventListener('click',openCart);
    document.querySelectorAll('[data-close-cart]').forEach(x=>x.addEventListener('click',closeCart));
    document.getElementById('fia-checkout').addEventListener('submit',e=>{e.preventDefault(); if(!cart.length){openCart();return;} document.getElementById('fia-order-success').hidden=false; cart=[]; save();});
    updateCartUI();
  }
  function openCart(){const c=document.querySelector('.fia-cart');if(!c)return;c.classList.add('is-open');c.setAttribute('aria-hidden','false');document.body.classList.add('fia-cart-open');}
  function closeCart(){const c=document.querySelector('.fia-cart');if(!c)return;c.classList.remove('is-open');c.setAttribute('aria-hidden','true');document.body.classList.remove('fia-cart-open');}
  function updateCartUI(){const items=document.getElementById('fia-cart-items');const badge=document.getElementById('fia-cart-count');const totalEl=document.getElementById('fia-cart-total');if(!items)return;if(badge)badge.textContent=count();if(totalEl)totalEl.textContent=money(total());items.innerHTML=cart.length?cart.map(x=>`<div class="fia-cart-item"><div><strong>${x.name}</strong><small>${money(x.price)} each</small></div><div class="fia-qty"><button type="button" data-minus="${x.name}">−</button><span>${x.qty}</span><button type="button" data-plus="${x.name}">+</button></div><b>${money(x.price*x.qty)}</b></div>`).join(''):`<div class="fia-empty-cart">Your cart is empty.<br><small>Add something delicious from the menu.</small></div>`;items.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>change(b.dataset.minus,-1));items.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>change(b.dataset.plus,1));}
  window.addEventListener('hashchange',()=>setTimeout(mount,50));
  new MutationObserver(()=>setTimeout(mount,0)).observe(document.body,{childList:true,subtree:true});
  setTimeout(mount,100);
})();
