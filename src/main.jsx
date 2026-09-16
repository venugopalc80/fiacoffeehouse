import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, ChevronRight, Flower2, Gift, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react';
import './styles.css';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

const menuGroups = [
  { title: 'Matcha', items: ['White Chocolate Matcha', 'Raspberry & White Chocolate Matcha', 'Mango Matcha', 'Vanilla Collagen Matcha'] },
  { title: 'Iced Coffee', items: ['Iced Pistachio White Chocolate Latte', 'Iced Spanish Latte'] },
  { title: 'Juices & Soft Drinks', items: ['Orange Juice', 'Cola', 'Still Water'] },
  { title: 'Hot Drinks', items: ['Psh Chai', 'Strawberry & Lime', 'Pomegranate & Red Bull Fusion'] },
  { title: 'Hot Drinks (FIA)', items: ['Pistachio Chai', 'Lotus Hot Chocolate', 'Hazelnut Hot Chocolate', 'Vanilla Latte', 'Rosehip Latte', 'Cappuccino', 'Americano', 'Flat White', 'Latte', 'Mocha', 'English Tea', 'Green Tea'] },
  { title: 'Add Ons', items: ['Extra Espresso Shot', 'Oat Milk', 'Vanilla Caramel', 'Hazelnut Syrup', 'Extra Whip'] },
  { title: 'Bakery', items: ['Cheesecake Choc Cookie', 'Pistachio & White Chocolate Cookie', 'Pistachio & Blackberry Cookie', 'Peach & Croissant', 'Raspberry Croissant'] }
];

const brunch = [
  { title: 'Signature Pocket Toast', items: ['Honey Roast Pocket', 'Spicy Chicken Samba', 'Avo & Chili', 'Arancello Veg Taco'] },
  { title: 'Pasta', items: ['Creamy Garlic Prawn & Steak', 'Crispy Chicken Alfredo', 'Crispy Pesto Bacon Salad', 'Chicken Caesar Pasta Salad'] },
  { title: 'Baguettes', items: ['Fried Chicken Baguette', 'Chicken Caesar Baguette', 'Nduja & Tomato Baguette'] },
  { title: 'Salads', items: ['Nocino Salad', 'Chicken Caesar Salad'] },
  { title: 'Fries', items: ['Truffle Skinny Fries', 'Harissa Chicken Fries'] },
  { title: 'French Toasts', items: ['Brioche French Toast with Salted Honey', 'Mixed Berry French Toast', 'Kunafa Strawberry French Toast', 'Nutella French Toast'] },
  { title: 'On The Side', items: ['Fries', 'Garlic Bread', 'Garlic Parmesan Fries'] },
  { title: 'Add Ons', items: ['Scoop of Soft Serve'] },
  { title: 'Breakfast', items: ['Steak & Egg Brioche', 'Three Cheese Miso Toast'] },
  { title: 'Saturday Evenings Only', items: ['House Tiramisu'] }
];

const gallery = [
  ['coffee', 'Coffee'], ['brunch', 'Brunch'], ['floral', 'Florals'], ['interior', 'Interior'],
  ['coffee2', 'Coffee'], ['floral2', 'Florals'], ['brunch2', 'Brunch'], ['interior2', 'Interior']
];

const seasonal = [
  { title: 'Seasonal Drinks', text: 'New flavours for the season.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { title: 'Brunch Creations', text: 'Fresh additions to the menu.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85' },
  { title: 'Seasonal Blooms', text: 'Floral highlights, curated by Leia.', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85' }
];

function Modal({ title, eyebrow, children, onClose }) {
  return <div className="modal" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="modal-card">
      <button className="close" aria-label="Close" onClick={onClose}><X /></button>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </div>
  </div>;
}

function App() {
  const [openNav, setOpenNav] = useState(false);
  const [modal, setModal] = useState(null);
  const [menuFilter, setMenuFilter] = useState('All');
  const [notice, setNotice] = useState('');
  const [newsletter, setNewsletter] = useState('');

  const filters = ['All', 'Matcha', 'Coffee', 'Brunch', 'Bakery', 'Drinks'];
  const filteredMenu = useMemo(() => {
    if (menuFilter === 'All') return menuGroups;
    if (menuFilter === 'Coffee') return menuGroups.filter(g => ['Iced Coffee', 'Hot Drinks (FIA)'].includes(g.title));
    if (menuFilter === 'Drinks') return menuGroups.filter(g => ['Juices & Soft Drinks', 'Hot Drinks', 'Iced Coffee', 'Hot Drinks (FIA)'].includes(g.title));
    if (menuFilter === 'Bakery') return menuGroups.filter(g => g.title === 'Bakery');
    if (menuFilter === 'Matcha') return menuGroups.filter(g => g.title === 'Matcha');
    return menuGroups;
  }, [menuFilter]);

  const closeModal = () => setModal(null);
  const handleForm = (event, message) => {
    event.preventDefault();
    setNotice(message);
    closeModal();
    setTimeout(() => setNotice(''), 5000);
  };

  const nav = ['Home', 'Menu', 'Florals', 'Events', 'Gallery', 'About', 'Visit Us'];
  const go = id => { setOpenNav(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <div className="app">
    <header className="nav">
      <button className="logo logo-button" onClick={() => go('home')}>FIA<span>COFFEEHOUSE</span></button>
      <button className="menu-btn" aria-label="Open menu" onClick={() => setOpenNav(v => !v)}>{openNav ? <X /> : <MenuIcon />}</button>
      <nav className={openNav ? 'nav-links open' : 'nav-links'}>
        {nav.map(item => <button key={item} onClick={() => go(item.toLowerCase().replaceAll(' ', '-'))}>{item}</button>)}
        <button className="primary" onClick={() => setModal('booking')}>Book a Table</button>
      </nav>
    </header>

    <section id="home" className="hero">
      <div className="hero-overlay">
        <p className="eyebrow">COFFEEHOUSE · BRUNCH · FLORALS</p>
        <h1>Good Coffee.<br />Brighter Days.</h1>
        <p className="lead">Speciality coffee, seasonal brunch and beautiful florals, all under one roof in the heart of Preston.</p>
        <div className="actions"><button className="light-btn" onClick={() => go('menu')}>View Menu</button><button className="dark-outline" onClick={() => setModal('booking')}>Book a Table</button></div>
      </div>
    </section>

    <section className="intro">
      <p className="eyebrow">THE FIA EXPERIENCE</p><h2>A space for coffee, conversation and creativity.</h2>
      <p>At FIA, speciality coffee meets fresh brunch and beautiful florals, creating a space where good food and great ideas bloom.</p>
      <div className="pillars">
        <article><div className="pic coffee" /><span>COFFEE</span><small>Speciality coffee, made with care</small><button onClick={() => go('menu')}>Explore <ChevronRight size={14} /></button></article>
        <article><div className="pic brunch" /><span>BRUNCH</span><small>Fresh flavours, all day</small><button onClick={() => go('menu')}>Explore <ChevronRight size={14} /></button></article>
        <article><div className="pic floral" /><span>FLORALS</span><small>Blooms for every moment</small><button onClick={() => go('florals')}>Explore <ChevronRight size={14} /></button></article>
      </div>
    </section>

    <section id="menu" className="menu-section">
      <div className="section-head"><p className="eyebrow">OUR MENU</p><h2>Seasonal ingredients.<br />Thoughtfully prepared.</h2></div>
      <div className="filter-bar">{filters.map(filter => <button className={menuFilter === filter ? 'active' : ''} key={filter} onClick={() => setMenuFilter(filter)}>{filter}</button>)}</div>
      <div className="menu-grid">{filteredMenu.map(group => <article className="menu-card" key={group.title}><h3>{group.title}</h3>{group.items.map(item => <div className="row" key={item}><span>{item}</span><span>›</span></div>)}</article>)}</div>
      <div className="brunch-panel"><div className="brunch-title"><p className="eyebrow">FIA BRUNCH</p><h2>Brunch looks better together.</h2></div><div className="brunch-grid">{brunch.map(group => <article key={group.title}><h3>{group.title}</h3>{group.items.map(item => <div className="row" key={item}><span>{item}</span><span>›</span></div>)}</article>)}</div></div>
      <p className="menu-note">Menu items and availability can change seasonally. Please confirm current availability with FIA.</p>
    </section>

    <section id="florals" className="split dark"><div className="copy"><p className="eyebrow">HOME TO LEIA FLORALS</p><h2>Flowers for every chapter.</h2><p>From everyday bouquets to special occasions, Leia Florals brings a little more beauty to life at FIA.</p><button className="light-btn" onClick={() => setModal('floral')}>Make a Floral Enquiry</button></div><div className="image floral-large" /></section>

    <section id="events" className="events"><p className="eyebrow">EVENTS & PRIVATE HIRE</p><h2>Your occasion.<br />Our space.</h2><p>For celebrations and gatherings, enquire about hosting your next moment at FIA.</p><button className="primary" onClick={() => setModal('event')}>Enquire About an Event</button></section>

    <section className="seasonal"><div className="section-head"><p className="eyebrow">WHAT'S HAPPENING AT FIA</p><h2>Seasonal moments, thoughtfully made.</h2></div><div className="seasonal-grid">{seasonal.map(item => <article key={item.title}><div className="seasonal-image" style={{ backgroundImage: `url(${item.image})` }} /><div><p className="eyebrow">FIA SEASONAL</p><h3>{item.title}</h3><p>{item.text}</p><ChevronRight size={18} /></div></article>)}</div></section>

    <section id="gallery" className="gallery"><div className="section-head"><p className="eyebrow">MOMENTS AT FIA</p><h2>Coffee. Brunch. Florals. People.</h2></div><div className="gallery-grid">{gallery.map(([className, label], index) => <button className={`g ${className}`} key={index} aria-label={`Open ${label} image`} onClick={() => setModal('gallery')}><span>{label}</span></button>)}</div><a className="insta" href="https://www.instagram.com/fiacoffeehouse/" target="_blank" rel="noreferrer"><InstagramIcon size={18} /> Follow on Instagram</a></section>

    <section id="about" className="about"><div><p className="eyebrow">OUR STORY</p><h2>A space for good food, great company and beautiful things.</h2><p>FIA Coffeehouse brings together a simple idea: coffee, seasonal brunch and beautiful florals in one welcoming place.</p><p>We’re more than a café; we’re a place to slow down, connect and enjoy the little things.</p><button className="outline" onClick={() => go('visit-us')}>Plan Your Visit</button></div><div className="about-image" /></section>

    <section className="gift-section"><div className="gift-copy"><Gift /><p className="eyebrow">GIVE FIA</p><h2>A little FIA goes a long way.</h2><p>For coffee lovers, brunch dates and beautiful moments.</p><button className="primary" onClick={() => setModal('gift')}>Gift Card Enquiry</button></div><div className="gift-image" /></section>

    <section id="visit-us" className="visit"><div><p className="eyebrow">VISIT US</p><h2>Find us in the heart of Preston.</h2><p><MapPin size={17} />17 Birley St, Miller Arcade, Preston PR1 2QY</p><p><Phone size={17} /><a href="tel:07510007001">07510 007001</a></p><p><CalendarDays size={17} />Open · Closes 9:30 pm</p><div className="actions"><a className="primary" href="https://www.google.com/maps/search/?api=1&query=17%20Birley%20St%2C%20Miller%20Arcade%2C%20Preston%20PR1%202QY" target="_blank" rel="noreferrer">Get Directions</a><button className="outline" onClick={() => setModal('booking')}>Book a Table</button></div></div><div className="map"><iframe title="FIA Coffeehouse map" src="https://www.google.com/maps?q=17%20Birley%20St%2C%20Miller%20Arcade%2C%20Preston%20PR1%202QY&output=embed" loading="lazy" /></div></section>

    <section className="newsletter"><Flower2 /><div><p className="eyebrow">JOIN OUR FAMILY</p><h2>Seasonal menus, floral collections and FIA moments.</h2><form onSubmit={e => { e.preventDefault(); setNewsletter('Thanks, you’re on the FIA list.'); e.currentTarget.reset(); }}><input required type="email" placeholder="Your email address" aria-label="Email address" /><button className="primary">Subscribe</button></form>{newsletter && <p className="success">{newsletter}</p>}</div></section>

    <footer><div className="footer-brand"><button className="logo logo-button" onClick={() => go('home')}>FIA<span>COFFEEHOUSE</span></button><small>Good Food. Brighter Days.</small></div><div className="footer-links">{nav.map(item => <button key={item} onClick={() => go(item.toLowerCase().replaceAll(' ', '-'))}>{item}</button>)}</div><div className="social"><a href="https://www.instagram.com/fiacoffeehouse/" target="_blank" rel="noreferrer" aria-label="FIA on Instagram"><InstagramIcon /></a></div><small>© 2026 FIA Coffeehouse. All rights reserved.</small></footer>

    {notice && <div className="toast" role="status">{notice}</div>}

    {modal === 'booking' && <Modal eyebrow="BOOK A TABLE" title="Good food deserves great company." onClose={closeModal}><form onSubmit={e => handleForm(e, 'Thanks. Your FIA booking request has been recorded. We’ll be in touch to confirm it.')}><input required placeholder="Name" /><input required type="email" placeholder="Email" /><input required placeholder="Phone" /><div className="two"><input required type="date" /><input required type="time" /></div><input required min="1" max="20" type="number" placeholder="Guests" /><textarea placeholder="Special requests (optional)" /><button className="primary">Send Booking Request</button></form></Modal>}
    {modal === 'floral' && <Modal eyebrow="LEIA FLORALS" title="Tell us about your flowers." onClose={closeModal}><form onSubmit={e => handleForm(e, 'Thanks. Your floral enquiry has been recorded.')}><input required placeholder="Name" /><input required type="email" placeholder="Email" /><select required defaultValue=""><option value="" disabled>What are you looking for?</option><option>Bouquet</option><option>Event flowers</option><option>Wedding flowers</option><option>Gift flowers</option><option>Seasonal collection</option><option>Other</option></select><input type="date" /><textarea placeholder="Tell us a little more (optional)" /><button className="primary">Send Floral Enquiry</button></form></Modal>}
    {modal === 'event' && <Modal eyebrow="EVENTS & PRIVATE HIRE" title="Let's plan your occasion." onClose={closeModal}><form onSubmit={e => handleForm(e, 'Thanks. Your event enquiry has been recorded.')}><input required placeholder="Name" /><input required type="email" placeholder="Email" /><input required type="tel" placeholder="Phone" /><input required placeholder="Event type" /><div className="two"><input required type="date" /><input required type="number" min="1" placeholder="Guests" /></div><textarea placeholder="Tell us about your event" /><button className="primary">Send Event Enquiry</button></form></Modal>}
    {modal === 'gift' && <Modal eyebrow="GIVE FIA" title="Send a gift card enquiry." onClose={closeModal}><form onSubmit={e => handleForm(e, 'Thanks. Your gift card enquiry has been recorded.')}><input required placeholder="Name" /><input required type="email" placeholder="Email" /><input required type="text" placeholder="Gift card amount" /><textarea placeholder="Gift message (optional)" /><button className="primary">Send Gift Card Enquiry</button></form></Modal>}
    {modal === 'gallery' && <Modal eyebrow="MOMENTS AT FIA" title="Follow FIA on Instagram." onClose={closeModal}><p>See the latest coffee, brunch, floral and café moments from FIA Coffeehouse.</p><a className="primary" href="https://www.instagram.com/fiacoffeehouse/" target="_blank" rel="noreferrer"><InstagramIcon /> Open Instagram</a></Modal>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
