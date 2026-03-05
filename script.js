// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SEARCH DRAWER ──
const searchToggle = document.getElementById('searchToggle');
const searchDrawer = document.getElementById('searchDrawer');
const searchClose  = document.getElementById('searchClose');
searchToggle.addEventListener('click', () => {
  searchDrawer.classList.toggle('open');
  if (searchDrawer.classList.contains('open'))
    document.getElementById('searchInput').focus();
});
searchClose.addEventListener('click', () => searchDrawer.classList.remove('open'));

// ── LOGIN MODAL ──
const loginToggle = document.getElementById('loginToggle');
const loginModal  = document.getElementById('loginModal');
const loginClose  = document.getElementById('loginClose');
loginToggle.addEventListener('click', () => loginModal.classList.add('open'));
loginClose.addEventListener('click',  () => loginModal.classList.remove('open'));
loginModal.addEventListener('click', e => {
  if (e.target === loginModal) loginModal.classList.remove('open');
});

// ── HERO CAROUSEL ──
let currentSlide = 0;
const totalSlides = 3;
const wrapper = document.getElementById('slidesWrapper');
const dots    = document.querySelectorAll('.dot');

function goToSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  wrapper.style.transform = `translateX(-${currentSlide * (100 / 3)}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('heroNext').addEventListener('click', () => goToSlide(currentSlide + 1));
document.getElementById('heroPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
dots.forEach((d, i) => d.addEventListener('click', () => goToSlide(i)));

// Auto-advance
setInterval(() => goToSlide(currentSlide + 1), 5000);

// ── ABOUT TOGGLE ──
const aboutToggle = document.getElementById('aboutToggle');
const aboutText   = document.getElementById('aboutText');
const toggleIcon  = document.getElementById('toggleIcon');

aboutToggle.addEventListener('click', () => {
  const open = aboutText.classList.toggle('open');
  toggleIcon.classList.toggle('open', open);
});

// ── SHOW/HIDE CARDS ──
const productGrid = document.getElementById('productGrid');
const showCards   = document.getElementById('showCards');
const hideCards   = document.getElementById('hideCards');

showCards.addEventListener('click', () => {
  productGrid.classList.remove('hidden');
  showCards.classList.add('active');
  hideCards.classList.remove('active');
});
hideCards.addEventListener('click', () => {
  productGrid.classList.add('hidden');
  hideCards.classList.add('active');
  showCards.classList.remove('active');
});

// ── CART ──
let cartCount = 0;
let cartTotal = 0;
const cartCountEl = document.querySelector('.cart-count');
const cartTotalEl = document.querySelector('.cart-total');
const toast       = document.getElementById('cartToast');
const toastMsg    = document.getElementById('toastMsg');
let toastTimer;

function addToCart(btn, price) {
  cartCount++;
  cartTotal += price;
  cartCountEl.textContent = cartCount;
  cartTotalEl.textContent = `£${cartTotal.toFixed(2)}`;

  const name = btn.closest('.product-card').querySelector('h4').textContent;
  toastMsg.textContent = `"${name}" added to cart!`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Expose to HTML
window.addToCart = addToCart;
