const menuItems = [
  // Italian
  {
    id: 1, cat: 'italian', name: 'Truffle Carbonara', price: 420, badge: "Chef's Pick",
    desc: 'House-made pasta, 63° egg, pancetta, aged Pecorino & truffle shavings.',
    img: '/img/item1.png'
  },
  {
    id: 2, cat: 'italian', name: 'Margherita Napoletana', price: 320, badge: 'Popular',
    desc: 'San Marzano tomatoes, buffalo mozzarella, fresh basil on a 72h fermented base.',
    img: '/img/item2.png'
  },
  {
    id: 3, cat: 'italian', name: 'Cacio e Pepe', price: 380, badge: '',
    desc: 'Spaghetti, Pecorino Romano, Parmigiano Reggiano & freshly cracked black pepper.',
    img: '/img/item3.png'
  },
  // Asian
  {
    id: 4, cat: 'asian', name: 'Tonkotsu Ramen', price: 380, badge: 'New',
    desc: '12-hour pork bone broth, chashu, soft egg, nori & bamboo shoots.',
    img: '/img/item4.png'
  },
  {
    id: 5, cat: 'asian', name: 'Pad Thai', price: 290, badge: '',
    desc: 'Wok-tossed rice noodles, tiger prawns, tamarind, peanuts & lime.',
    img: '/img/item5.png'
  },
  {
    id: 6, cat: 'asian', name: 'Kung Pao Chicken', price: 340, badge: 'Spicy 🌶️',
    desc: 'Wok-fried chicken, peanuts, dried chillies & Sichuan peppercorn.',
    img: '/img/item6.png'
  },
  // Burgers
  {
    id: 7, cat: 'burgers', name: 'Smash Burger', price: 340, badge: 'Best Seller',
    desc: 'Double smash patty, American cheese, caramelised onions & house sauce.',
    img: '/img/item7.png'
  },
  {
    id: 8, cat: 'burgers', name: 'Mushroom Swiss Burger', price: 310, badge: '',
    desc: 'Beef patty, sautéed wild mushrooms, Swiss cheese & garlic aioli.',
    img: '/img/item8.png'
  },
  {
    id: 9, cat: 'burgers', name: 'Crispy Chicken Burger', price: 290, badge: '',
    desc: 'Buttermilk fried chicken, pickles, sriracha mayo & cabbage slaw.',
    img: '/img/item9.png'
  },
  // Salads
  {
    id: 10, cat: 'salads', name: 'Quinoa Power Bowl', price: 260, badge: 'Healthy',
    desc: 'Tricolour quinoa, roasted veggies, avocado, seeds & lemon tahini dressing.',
    img: '/img/item10.png'
  },
  {
    id: 11, cat: 'salads', name: 'Classic Caesar', price: 220, badge: '',
    desc: 'Romaine, house Caesar dressing, parmesan shavings, croutons & anchovies.',
    img: '/img/item11.png'
  },
  {
    id: 12, cat: 'salads', name: 'Burrata & Heirloom', price: 280, badge: 'New',
    desc: 'Creamy burrata, heirloom tomatoes, basil oil & balsamic pearls.',
    img: '/img/item12.png'
  },
  // Desserts
  {
    id: 13, cat: 'desserts', name: 'Tiramisu', price: 180, badge: 'Crowd Fav',
    desc: 'Savoiardi, mascarpone cream, espresso soak & dark cocoa dust.',
    img: '/img/item13.png'
  },
  {
    id: 14, cat: 'desserts', name: 'Mango Panna Cotta', price: 160, badge: 'Seasonal',
    desc: 'Silky vanilla panna cotta with fresh Alphonso mango coulis.',
    img: '/img/item14.png'
  },
  {
    id: 15, cat: 'desserts', name: 'Chocolate Lava Cake', price: 200, badge: '🍫 Hot',
    desc: 'Warm dark chocolate fondant with a gooey centre & vanilla ice cream.',
    img: '/img/item15.png'
  },
  // Drinks
  {
    id: 16, cat: 'drinks', name: 'Watermelon Fresca', price: 120, badge: 'Refreshing',
    desc: 'Fresh watermelon, lime juice, mint & a hint of chilli salt.',
    img: '/img/item16.png'
  },
  {
    id: 17, cat: 'drinks', name: 'Cold Brew Coffee', price: 140, badge: '',
    desc: '18-hour slow-steeped single-origin cold brew, served over ice.',
    img: '/img/item17.png'
  },
  {
    id: 18, cat: 'drinks', name: 'Mango Lassi', price: 110, badge: '',
    desc: 'Thick Alphonso mango, yoghurt, rose water & cardamom.',
    img: '/img/item18.png'
  },
];

// ─────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────
let cart      = [];
let likes     = new Set();
let selUpi    = '';

// ─────────────────────────────────────────────────────
// RENDER MENU
// ─────────────────────────────────────────────────────
function renderMenu(items) {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card visible';
    card.innerHTML = `
      <div class="card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
        ${item.badge ? `<div class="card-badge">${item.badge}</div>` : ''}
        <button class="card-fav ${likes.has(item.id) ? 'liked' : ''}"
                onclick="toggleLike(${item.id}, this)">
          ${likes.has(item.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          <div class="card-price">₹${item.price} <small>/ serving</small></div>
          <button class="add-btn" onclick="addToCart(${item.id})">+ Add</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// Initial render
renderMenu(menuItems);

// ─────────────────────────────────────────────────────
// FILTER BY CATEGORY
// ─────────────────────────────────────────────────────
function filterMenu(cat, el) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const filtered = cat === 'all' ? menuItems : menuItems.filter(i => i.cat === cat);
  renderMenu(filtered);
}

// ─────────────────────────────────────────────────────
// LIKE / FAVOURITE
// ─────────────────────────────────────────────────────
function toggleLike(id, btn) {
  if (likes.has(id)) {
    likes.delete(id);
    btn.innerHTML = '🤍';
    btn.classList.remove('liked');
  } else {
    likes.add(id);
    btn.innerHTML = '❤️';
    btn.classList.add('liked');
  }
}

// ─────────────────────────────────────────────────────
// CART — add / update / remove
// ─────────────────────────────────────────────────────
function addToCart(id) {
  const item     = menuItems.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCart();
  showToast(`${item.name} added to cart!`);
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Badge
  const countEl = document.getElementById('cartCount');
  countEl.textContent    = count;
  countEl.style.display  = count > 0 ? 'flex' : 'none';

  // Total label in sidebar footer
  document.getElementById('cartTotal').textContent = `₹${total}`;

  // Cart items list
  const itemsEl = document.getElementById('cartItems');
  if (!cart.length) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:3rem;margin-bottom:1rem">🛒</div>
        <p>Your cart is empty.<br>Start adding some delicious food!</p>
      </div>`;
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="ci-img" src="${item.img}" alt="${item.name}" />
      <div style="flex:1">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">₹${item.price * item.qty}</div>
        <div class="ci-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},  1)">+</button>
        </div>
      </div>
      <button class="ci-remove" onclick="removeItem(${item.id})">✕</button>
    </div>`).join('');
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

// ─────────────────────────────────────────────────────
// PAYMENT MODAL
// ─────────────────────────────────────────────────────
function openPayment() {
  if (!cart.length) { showToast('Add items to your cart first!'); return; }

  const sub   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax   = Math.round(sub * 0.05);
  const total = sub + tax;

  // Populate summary
  document.getElementById('paySubtotal').textContent = `₹${sub}`;
  document.getElementById('payTax').textContent      = `₹${tax}`;
  document.getElementById('payTotal').textContent    = `₹${total}`;
  document.getElementById('payBtnText').textContent  = `Pay ₹${total}`;
  document.getElementById('paySummaryItems').innerHTML = cart
    .map(i => `<div class="pay-item"><span>${i.name} ×${i.qty}</span><span>₹${i.price * i.qty}</span></div>`)
    .join('');

  // Reset to form view
  document.getElementById('payFormSection').style.display = 'block';
  document.getElementById('paySuccess').classList.remove('show');

  // Open modal, close cart
  document.getElementById('payOverlay').classList.add('open');
  // Close cart sidebar if open
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function closePayment() {
  document.getElementById('payOverlay').classList.remove('open');
}

// Switch UPI / Card / COD tabs
function switchTab(id, btn) {
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
}

// UPI app selection
function selectUpi(el, app) {
  document.querySelectorAll('.upi-app').forEach(a => a.classList.remove('selected'));
  el.classList.add('selected');
  selUpi = app;
}

// Live card preview — number
function fmtCard(el) {
  let v = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
  document.getElementById('cvNumber').textContent = el.value || '•••• •••• •••• ••••';
}

// Live card preview — expiry
function fmtExp(el) {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
  el.value = v;
  document.getElementById('cvExp').textContent = v || 'MM/YY';
}

// Process payment
function processPayment() {
  const name  = document.getElementById('payName').value.trim();
  const phone = document.getElementById('payPhone').value.trim();
  const addr  = document.getElementById('payAddr').value.trim();

  if (!name || !phone || !addr) {
    showToast('Please fill in your delivery details');
    return;
  }

  const btn = document.getElementById('paySubmitBtn');
  btn.innerHTML = '<span>⏳</span><span>Processing...</span>';
  btn.disabled  = true;

  setTimeout(() => {
    btn.disabled  = false;
    btn.innerHTML = '<span>🔒</span><span id="payBtnText">Pay Now</span>';

    const orderNum = 'MT' + Math.floor(100000 + Math.random() * 900000);
    const eta      = Math.floor(20 + Math.random() * 15);
    const total    = document.getElementById('payTotal').textContent;

    document.getElementById('successOrder').innerHTML = `
      <div style="margin-bottom:.4rem;font-weight:600">Order #${orderNum}</div>
      <div style="color:var(--text-muted);font-size:.82rem;margin-top:.3rem">
        Estimated delivery: <strong>${eta} minutes</strong>
      </div>
      <div style="color:var(--text-muted);font-size:.82rem;margin-top:.3rem">
        Amount paid: ${total}
      </div>`;

    document.getElementById('payFormSection').style.display = 'none';
    document.getElementById('paySuccess').classList.add('show');

    // Clear cart
    cart = [];
    updateCart();
  }, 2200);
}

// ─────────────────────────────────────────────────────
// PROMO / NEWSLETTER
// ─────────────────────────────────────────────────────
function handlePromo() {
  const email = document.getElementById('promoEmail').value;
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email.');
    return;
  }
  showToast('🎉 20% off code sent to ' + email + '!');
  document.getElementById('promoEmail').value = '';
}

// ─────────────────────────────────────────────────────
// TOAST NOTIFICATION
// ─────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ─────────────────────────────────────────────────────
// NAV — add shadow on scroll
// ─────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,.08)' : 'none';
});

// ─────────────────────────────────────────────────────
// HERO BACKGROUND SLIDESHOW  (left animated BG)
// ─────────────────────────────────────────────────────
const bgSlides = document.querySelectorAll('.bg-slide');
let bgIdx = 0;

setInterval(() => {
  bgSlides[bgIdx].classList.remove('active');
  bgIdx = (bgIdx + 1) % bgSlides.length;
  bgSlides[bgIdx].classList.add('active');
}, 4500);

// ─────────────────────────────────────────────────────
// HERO RIGHT FOOD PHOTO SLIDESHOW
// ─────────────────────────────────────────────────────
const hsSlides    = document.querySelectorAll('.hs-slide');
const dotsContainer = document.getElementById('slideDots');
let hsIdx = 0;

// Build dots
hsSlides.forEach((_, i) => {
  const dot      = document.createElement('div');
  dot.className  = 'hs-dot' + (i === 0 ? ' active' : '');
  dot.onclick    = () => goSlide(i);
  dotsContainer.appendChild(dot);
});

function goSlide(i) {
  hsSlides[hsIdx].classList.remove('active');
  document.querySelectorAll('.hs-dot')[hsIdx].classList.remove('active');
  hsIdx = i;
  hsSlides[hsIdx].classList.add('active');
  document.querySelectorAll('.hs-dot')[hsIdx].classList.add('active');
}

setInterval(() => goSlide((hsIdx + 1) % hsSlides.length), 3600);

// ─────────────────────────────────────────────────────
// FLOATING FOOD EMOJI PARTICLES
// ─────────────────────────────────────────────────────
const emojis     = ['🍕','🍔','🌮','🍜','🍣','🍰','🥗','🍩','🥩','🍝','🧆','🥘','🍱','🍛','🫕'];
const fpc        = document.getElementById('foodParticles');

function spawnParticle() {
  const fp = document.createElement('div');
  fp.className = 'fp';
  fp.textContent              = emojis[Math.floor(Math.random() * emojis.length)];
  fp.style.left               = Math.random() * 100 + '%';
  fp.style.animationDuration  = (7 + Math.random() * 5)   + 's';
  fp.style.animationDelay     = (Math.random() * 2)        + 's';
  fp.style.fontSize           = (1.2 + Math.random() * 1.2) + 'rem';
  fpc.appendChild(fp);
  // Remove from DOM after animation finishes
  setTimeout(() => fp.remove(), 13000);
}

// Spawn initial burst
for (let i = 0; i < 10; i++) setTimeout(spawnParticle, i * 350);

// Keep spawning continuously
setInterval(spawnParticle, 1600);
