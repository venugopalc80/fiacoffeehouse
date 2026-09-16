import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Gift, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const menuGroups = [
  { title: 'Matcha', items: ['White Chocolate Matcha', 'Raspberry & White Chocolate Matcha', 'Mango Matcha', 'Vanilla Collagen Matcha'] },
  { title: 'Iced Coffee', items: ['Iced Pistachio White Chocolate Latte', 'Iced Spanish Latte'] },
  { title: 'Juices & Soft Drinks', items: ['Orange Juice', 'Cola', 'Still Water'] },
  { title: 'Hot Drinks', items: ['Psh Chai', 'Strawberry & Lime', 'Pomegranate & Red Bull Fusion'] },
  { title: 'Hot Drinks (FIA)', items: ['Pistachio Chai', 'Lotus Hot Chocolate', 'Hazelnut Hot Chocolate', 'Vanilla Latte', 'Rosehip Latte', 'Cappuccino', 'Americano', 'Flat White', 'Latte', 'Mocha', 'English Tea', 'Green Tea'] },
  { title: 'Add Ons', items: ['Extra Espresso Shot', 'Oat Milk', 'Vanilla Caramel', 'Hazelnut Syrup', 'Extra Whip'] },
  { title: 'Bakery', items: ['Cheesecake Choc Cookie', 'Pistachio & White Chocolate Cookie', 'Pistachio & Blackberry Cookie', 'Peach & Croissant', 'Raspberry Croissant'] }
];

const brunchGroups = [
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

const seasonal = [
  { title: 'Seasonal Drinks', text: 'New flavours for the season.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90' },
  { title: 'New Brunch Creations', text: 'Fresh additions to the menu.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1400&q=90' }
];

const galleryImages = [
  ['coffee', 'Coffee'], ['brunch', 'Brunch'], ['interior', 'Interior'], ['coffee2', 'Coffee'],
  ['brunch2', 'Brunch'], ['interior2', 'Interior'], ['coffee3', 'Coffee'], ['brunch3', 'Brunch']
];

const navPages = ['Home', 'Menu', 'Events', 'Gallery', 'About', 'Visit Us'];
const slug = value => value.toLowerCase().replaceAll(' ', '-');

function InstagramIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;
}

function Header({ page, openMenu, setOpenMenu }) {
  const go = target => { setOpenMenu(false); window.location.hash = slug(target); };
  return <header className={`site-header ${page === 'Home' ? 'on-dark' : ''}`}>
    <button className="brand" onClick={() => go('Home')} aria-label="FIA Coffeehouse home"><span>FIA</span><small>COFFEEHOUSE</small></button>
    <button className="mobile-toggle" onClick={() => setOpenMenu(v => !v)} aria-label="Toggle navigation">{openMenu ? <X/> : <MenuIcon/>}</button>
    <nav className={openMenu ? 'main-nav open' : 'main-nav'}>
      {navPages.map(item => <button key={item} className={page === item ? 'current' : ''} onClick={() => go(item)}>{item}</button>)}
      <button className="nav-cta" onClick={() => go('Book a Table')}>Book a Table</button>
    </nav>
  </header>;
}

function PageShell({ page, children, openMenu, setOpenMenu }) {
  return <div className="site"><Header page={page} openMenu={openMenu} setOpenMenu={setOpenMenu}/>{children}<Footer/></div>;
}

function Home({ go }) {
  return <main>
    <section className="home-hero"><div className="hero-content"><p className="eyebrow">COFFEEHOUSE · BRUNCH · GOOD COMPANY</p><h1>Good Coffee.<br/>Brighter Days.</h1><p className="hero-copy">Speciality coffee and seasonal brunch — thoughtfully made in the heart of Preston.</p><div className="button-row"><button className="cream-btn" onClick={() => go('Menu')}>View Menu <ArrowRight size={14}/></button><button className="ghost-btn" onClick={() => go('Book a Table')}>Book a Table</button></div></div><span className="scroll-mark">↓ &nbsp; Scroll</span></section>
    <section className="home-intro"><p className="eyebrow">THE FIA EXPERIENCE</p><h2>A space for coffee,<br/>conversation and creativity.</h2><p className="intro-copy">At FIA, speciality coffee meets fresh brunch, creating a warm space where good food and great ideas come together.</p><div className="intro-cards"><IntroCard image="coffee" title="Speciality Coffee" text="Carefully sourced"/><IntroCard image="brunch" title="Seasonal Brunch" text="Fresh & creative"/></div></section>
    <section className="home-feature"><div className="feature-copy"><p className="eyebrow">FIA BRUNCH</p><h2>Good food.<br/>Better company.</h2><p>From slow mornings to long lunches, our brunch menu is made for sharing, lingering and coming back for more.</p><button className="dark-btn" onClick={() => go('Menu')}>Explore the Menu <ArrowRight size={14}/></button></div><div className="feature-image brunch-photo"/></section>
    <section className="home-events"><div className="events-copy"><p className="eyebrow">EVENTS & PRIVATE HIRE</p><h2>Your occasion.<br/>Our space.</h2><p>Intimate celebrations, brunch gatherings and memorable evenings in the heart of Preston.</p><button className="dark-btn" onClick={() => go('Events')}>Enquire Now <ArrowRight size={14}/></button></div><div className="events-image"/></section>
    <section className="home-seasonal"><div className="section-title"><div><p className="eyebrow">WHAT'S HAPPENING AT FIA</p><h2>Seasonal moments.</h2></div><button className="text-link" onClick={() => go('Seasonal')}>Explore all <ArrowRight size={14}/></button></div><div className="seasonal-strip">{seasonal.map(item=><article key={item.title}><img src={item.image} alt=""/><div><p className="eyebrow">FIA SEASONAL</p><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>
  </main>;
}

function IntroCard({ image, title, text }) { return <article className="intro-card"><div className={`intro-photo ${image}`}/><div><span>{title}</span><small>{text}</small></div></article>; }
function PageHero({ eyebrow, title, image }) { return <section className={`page-hero ${image}`}><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div></section>; }
function MenuGroup({ group, dark=false }) { return <article className={`menu-group ${dark?'dark':''}`}><h3>{group.title}</h3>{group.items.map(item=><div className="menu-row" key={item}><span>{item}</span><i>·</i></div>)}</article>; }

function MenuPage() {
  const [filter,setFilter] = useState('All');
  const filters=['All','Coffee','Brunch','Food','Bakery','Drinks'];
  const groups=useMemo(()=>filter==='All'?menuGroups:filter==='Coffee'?menuGroups.filter(g=>['Iced Coffee','Hot Drinks (FIA)'].includes(g.title)):filter==='Bakery'?menuGroups.filter(g=>g.title==='Bakery'):filter==='Drinks'?menuGroups.filter(g=>['Juices & Soft Drinks','Hot Drinks','Iced Coffee','Hot Drinks (FIA)'].includes(g.title)):filter==='Brunch'?brunchGroups:brunchGroups.slice(0,6),[filter]);
  return <main className="inner-page menu-page"><PageHero eyebrow="OUR MENU" title={<>Our Menu</>} image="menu-hero"/><div className="menu-layout"><div className="menu-tabs">{filters.map(item=><button key={item} className={filter===item?'active':''} onClick={()=>setFilter(item)}>{item}</button>)}</div><div className="menu-columns">{groups.map(group=><MenuGroup key={group.title} group={group}/>)}</div><section className="brunch-menu"><div className="brunch-heading"><p className="eyebrow">FIA BRUNCH</p><h2>Brunch looks<br/>better together.</h2></div><div className="brunch-columns">{brunchGroups.map(group=><MenuGroup key={group.title} group={group} dark/>)}</div></section></div></main>;
}

function EventsPage({ go }) { return <main className="inner-page"><section className="split-hero event-hero"><div><p className="eyebrow">EVENTS / PRIVATE HIRE</p><h1>Your Occasion.<br/>Our Space.</h1><p>From intimate gatherings to special celebrations, FIA is the perfect setting for unforgettable moments.</p><button className="dark-btn" onClick={()=>go('Book a Table')}>Enquire Now <ArrowRight size={14}/></button></div><div className="event-hero-image"/></section><section className="event-gallery">{['event1','event2','event3','event4'].map((c,i)=><div className={`event-tile ${c}`} key={c}><span>{['Birthdays','Baby Showers','Brunch Gatherings','Corporate Events'][i]}</span><small>{['Celebrate in style','Cherish the moments','Good food, great company','A relaxed, inspiring space'][i]}</small></div>)}</section></main>; }

function BookingPage() { return <main className="inner-page"><section className="booking-page"><div className="booking-copy"><p className="eyebrow">RESERVATIONS</p><h1>Good Food<br/>Deserves<br/>Great Company.</h1><p>Join us at FIA for coffee, brunch or simply a moment to yourself.</p><div className="booking-photo"/></div><BookingForm/></section></main>; }
function BookingForm() { const [sent,setSent]=useState(false); return <form className="booking-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><p className="eyebrow">BOOK A TABLE</p><h2>Book a Table</h2><input required placeholder="Name"/><input required type="email" placeholder="Email"/><input required type="tel" placeholder="Phone"/><div className="form-two"><input required type="date"/><input required type="time"/></div><input required type="number" min="1" max="20" placeholder="Guests"/><textarea placeholder="Special Requests (Optional)"/><button className="dark-btn">{sent?'Request Received':'Book Now'} <ArrowRight size={14}/></button>{sent&&<p className="form-success">Thank you. Your request has been recorded and FIA will confirm availability with you.</p>}</form>; }

function AboutPage({ go }) { return <main className="inner-page"><section className="about-page"><div className="about-copy"><p className="eyebrow">OUR STORY</p><h1>A space for<br/>good food,<br/>great company.</h1><p>FIA Coffeehouse brings together a simple idea — speciality coffee and seasonal brunch in one welcoming space.</p><p>We’re more than a café; we’re a place to slow down, connect and enjoy the little things.</p><button className="dark-btn" onClick={()=>go('Visit Us')}>Our Story <ArrowRight size={14}/></button></div><div className="about-photo"/></section><section className="values"><div><span>01</span><h3>Speciality Coffee</h3><p>Carefully sourced.</p></div><div><span>02</span><h3>Seasonal Brunch</h3><p>Fresh & creative.</p></div><div><span>03</span><h3>Our Community</h3><p>Always welcome.</p></div></section></main>; }

function GalleryPage() { return <main className="inner-page"><PageHero eyebrow="MOMENTS AT FIA" title={<>Moments at FIA</>} image="gallery-hero"/><section className="gallery-page"><div className="gallery-filter"><span className="active">All</span><span>Coffee</span><span>Food</span><span>Interior</span><span>Community</span></div><div className="gallery-mosaic">{galleryImages.map(([c,l],i)=><div className={`gallery-image ${c}`} key={i}><span>{l}</span></div>)}</div><a className="instagram-link" href="https://www.instagram.com/fiacoffeehouse/" target="_blank" rel="noreferrer"><InstagramIcon/> Follow us on Instagram</a></section></main>; }

function VisitPage() { return <main className="inner-page"><section className="visit-page"><div className="visit-copy"><p className="eyebrow">VISIT US</p><h1>Find us in the<br/>heart of Preston.</h1><div className="contact-line"><MapPin size={17}/><span>17 Birley St, Miller Arcade,<br/>Preston PR1 2QY</span></div><div className="contact-line"><CalendarDays size={17}/><span>Open · Closes 9:30 pm</span></div><div className="contact-line"><Phone size={17}/><a href="tel:07510007001">07510 007001</a></div><div className="button-row"><a className="dark-btn" href="https://www.google.com/maps/search/?api=1&query=17%20Birley%20St%2C%20Miller%20Arcade%2C%20Preston%20PR1%202QY" target="_blank" rel="noreferrer">Get Directions <ArrowRight size={14}/></a></div></div><div className="visit-photo"/><div className="map-frame"><iframe title="FIA Coffeehouse location" src="https://www.google.com/maps?q=17%20Birley%20St%2C%20Miller%20Arcade%2C%20Preston%20PR1%202QY&output=embed" loading="lazy"/></div></section></main>; }

function SeasonalPage() { return <main className="inner-page"><section className="seasonal-page"><div className="seasonal-heading"><p className="eyebrow">WHAT'S HAPPENING AT FIA</p><h1>Seasonal<br/>moments.</h1><p>Seasonal flavours. Fresh ideas. Special moments.</p></div><div className="seasonal-grid-page">{seasonal.map(item=><article key={item.title}><img src={item.image} alt=""/><p className="eyebrow">FIA SEASONAL</p><h2>{item.title}</h2><p>{item.text}</p></article>)}</div></section></main>; }

function GiftPage() { return <main className="inner-page"><section className="gift-page"><div><p className="eyebrow">GIVE FIA</p><h1>A little FIA<br/>goes a long way.</h1><p>The perfect gift for coffee lovers, brunch dates and beautiful moments.</p><a className="dark-btn" href="mailto:thepixelmuses@gmail.com?subject=FIA%20Gift%20Card%20Enquiry">Buy a Gift Card <ArrowRight size={14}/></a></div><div className="gift-visual"><Gift/><strong>FIA</strong><small>COFFEEHOUSE</small><em>Good Food. Brighter Days.</em></div></section></main>; }

function Footer() { const go=target=>{window.location.hash=slug(target)}; return <footer><div className="footer-brand"><button className="brand" onClick={()=>go('Home')}><span>FIA</span><small>COFFEEHOUSE</small></button><p>Good Food. Brighter Days.</p></div><div className="footer-nav">{navPages.map(item=><button key={item} onClick={()=>go(item)}>{item}</button>)}<button onClick={()=>go('Seasonal')}>Seasonal</button><button onClick={()=>go('Gift Cards')}>Gift Cards</button></div><div className="footer-social"><a href="https://www.instagram.com/fiacoffeehouse/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon/></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><span>© 2026 FIA Coffeehouse. All rights reserved.</span></div></footer>; }

function App() {
  const [path,setPath]=useState(window.location.hash.replace('#','')||'home');
  const [openMenu,setOpenMenu]=useState(false);
  useEffect(()=>{const onHash=()=>{setPath(window.location.hash.replace('#','')||'home');window.scrollTo(0,0);setOpenMenu(false)};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash)},[]);
  const page=path==='book-a-table'?'Book a Table':path==='gift-cards'?'Gift Cards':navPages.find(p=>slug(p)===path)||'Home';
  const go=target=>{window.location.hash=slug(target);setOpenMenu(false)};
  let content=<Home go={go}/>;
  if(page==='Menu') content=<MenuPage/>; else if(page==='Events') content=<EventsPage go={go}/>; else if(page==='Book a Table') content=<BookingPage/>; else if(page==='About') content=<AboutPage go={go}/>; else if(page==='Gallery') content=<GalleryPage/>; else if(page==='Visit Us') content=<VisitPage/>; else if(page==='Seasonal') content=<SeasonalPage/>; else if(page==='Gift Cards') content=<GiftPage/>;
  return <PageShell page={page} openMenu={openMenu} setOpenMenu={setOpenMenu}>{content}</PageShell>;
}

createRoot(document.getElementById('root')).render(<App/>);
