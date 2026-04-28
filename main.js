/* ===== MALGEUM — main.js ===== */

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 가감속
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Smooth scrolling for anchor links using Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      lenis.scrollTo(targetElement, { offset: -72 }); // Navbar offset 적용
      
      // Close mobile menu if open
      if (navToggle.classList.contains('open')) {
        navToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });
});

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
// (앵커 링크 클릭 시 모바일 메뉴 닫기 로직은 상단 Lenis 앵커 핸들러로 통합됨)

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
}, { threshold: 0, rootMargin: '0px 0px -15% 0px' });

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
  const name = document.getElementById('name-input').value.trim();
  const phone = document.getElementById('phone-input').value.trim();
  const zipcode = document.getElementById('zipcode-input').value.trim();
  const address = document.getElementById('address-input').value.trim();
  const quantity = document.getElementById('quantity-input').value.trim();
  const privacy = document.getElementById('privacy-input').checked;

  if (!email || !name || !phone || !zipcode || !address || !quantity || !privacy) {
    alert('모든 필수 항목을 입력하고 개인정보 수집에 동의해주세요.');
    return;
  }

  if (!validateEmail(email)) { 
    emailError.textContent = '올바른 이메일 주소를 입력해 주세요.'; 
    return; 
  }
  
  emailError.textContent = '';
  submitBtn.classList.add('btn--loading');
  submitBtn.disabled = true;

  const selectedInterests = document.querySelectorAll('input[name="interest"]:checked');
  let interestTexts = [];
  selectedInterests.forEach(checkbox => {
    // 구글폼에 설정된 정확한 선택지 텍스트와 매칭해야 합니다
    if (checkbox.value === 'jangsanbeom') interestTexts.push('장산범');
    if (checkbox.value === 'omija') interestTexts.push('오미자');
    if (checkbox.value === 'chamoe') interestTexts.push('참외');
    if (checkbox.value === 'hongsi') interestTexts.push('홍시');
    if (checkbox.value === 'hallabong') interestTexts.push('한라봉');
    if (checkbox.value === 'hanbok') interestTexts.push('한복');
  });

  const formData = new FormData();
  formData.append('entry.1683502974', name);
  formData.append('entry.1030619106', phone);
  formData.append('entry.1205993398', zipcode);
  formData.append('entry.884922465', address);
  formData.append('entry.1107055866', quantity); // 희망 수량
  formData.append('entry.130393391', '개인정보 수집 · 이용에 동의합니다'); // 체크박스 값
  formData.append('emailAddress', email); // 구글폼 설정의 이메일 수집용 필드

  interestTexts.forEach(interest => {
    formData.append('entry.804199593', interest);
  });

  try {
    // Google Forms 숨겨진 API 엔드포인트로 전송 (mode: no-cors 필수)
    await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdXOWt-LhjTYFEoP-vBFUVPQsPdMdBu6UrqLNrtcfEIMgFqmw/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    // no-cors 모드에서는 응답 성공 여부를 알 수 없으므로 성공으로 간주
    contactForm.style.display = 'none';
    contactSuccess.style.display = 'block';
    contactSuccess.removeAttribute('aria-hidden');
    contactSuccess.classList.add('visible');
  } catch (error) {
    console.error('Submission error:', error);
    alert('제출 중 문제가 발생했습니다. 다시 시도해주세요.');
  } finally {
    submitBtn.classList.remove('btn--loading');
    submitBtn.disabled = false;
  }
});
