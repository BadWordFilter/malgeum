/* ===== MALGEUM — main.js ===== */

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = -100, mouseY = -100;
let curX = -100, curY = -100;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .radio-label, input').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// Hero reveal on load
window.addEventListener('load', () => {
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    const delay = parseInt(el.getAttribute('data-reveal-delay') || 0) * 120;
    setTimeout(() => el.classList.add('revealed'), 100 + delay);
  });
});

// Scroll reveal
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-scroll-reveal]').forEach(el => scrollObserver.observe(el));

// Vibe bars animation
const vibeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.vibe-fill').forEach((fill, i) => {
        setTimeout(() => fill.classList.add('animated'), i * 120);
      });
      vibeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.switch-vibe').forEach(el => vibeObserver.observe(el));

// Divider marquee duplicate
const divText = document.querySelector('.divider-text');
if (divText) {
  const content = divText.textContent;
  divText.textContent = content + content;
}

// Contact form
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const submitBtn = document.getElementById('submit-btn');
const emailInput = document.getElementById('email-input');
const emailError = document.getElementById('email-error');

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

emailInput && emailInput.addEventListener('blur', () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    emailError.textContent = '올바른 이메일 주소를 입력해 주세요.';
    emailInput.setAttribute('aria-invalid', 'true');
  } else {
    emailError.textContent = '';
    emailInput.removeAttribute('aria-invalid');
  }
});

contactForm && contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) { emailError.textContent = '이메일 주소를 입력해 주세요.'; return; }
  if (!validateEmail(email)) { emailError.textContent = '올바른 이메일 주소를 입력해 주세요.'; return; }
  emailError.textContent = '';
  submitBtn.classList.add('btn--loading');
  submitBtn.disabled = true;
  await new Promise(r => setTimeout(r, 1400));
  contactForm.style.display = 'none';
  contactSuccess.style.display = 'block';
  contactSuccess.removeAttribute('aria-hidden');
  contactSuccess.classList.add('visible');
});
