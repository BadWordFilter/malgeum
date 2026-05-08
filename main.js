document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled');
            navbar.classList.remove('scrolled'); // Force reflow
            if(window.scrollY <= 50) {
                 navbar.classList.remove('scrolled');
            }
        }
    });

    // Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Interactive Aurora Background in Hero Section
    const hero = document.getElementById('hero');
    const auroraBlobs = document.querySelectorAll('.aurora-blob');

    if (hero && auroraBlobs.length > 0) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            auroraBlobs.forEach((blob, index) => {
                // Different movement multipliers for parallax effect
                const multX = (index % 2 === 0 ? 1 : -1) * (index + 1) * 0.5;
                const multY = (index % 2 === 0 ? -1 : 1) * (index + 1) * 0.5;
                
                blob.style.transform = `translate(${xPos * multX}px, ${yPos * multY}px)`;
            });
        });
    }

    // Summer Switch (Miri) Ripple Effect on Hover/Click
    const summerCard = document.querySelector('.summer-card');
    const rippleContainer = document.querySelector('.ripple-container');

    if (summerCard && rippleContainer) {
        const createRipple = (e) => {
            const circle = document.createElement('div');
            const rect = summerCard.getBoundingClientRect();
            
            // Handle both mouse click and just center for hover if needed
            // For now, let's just trigger it on click to match "역동적인 톡톡 튀는 트랜지션"
            const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
            const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

            circle.style.width = circle.style.height = '100px';
            circle.style.left = `${x - 50}px`;
            circle.style.top = `${y - 50}px`;
            circle.style.position = 'absolute';
            circle.style.borderRadius = '50%';
            circle.style.background = 'rgba(255, 255, 255, 0.4)';
            circle.style.transform = 'scale(0)';
            circle.style.animation = 'ripple 0.6s linear';
            circle.style.pointerEvents = 'none';

            rippleContainer.appendChild(circle);

            setTimeout(() => {
                circle.remove();
            }, 600);
        };

        summerCard.addEventListener('click', createRipple);
        // Also fire once on mouseenter for the "경쾌한" feel
        summerCard.addEventListener('mouseenter', (e) => {
             // Create a subtle ripple in the center
             const circle = document.createElement('div');
             circle.style.width = '100%';
             circle.style.height = '100%';
             circle.style.left = '0';
             circle.style.top = '0';
             circle.style.position = 'absolute';
             circle.style.borderRadius = '24px';
             circle.style.background = 'radial-gradient(circle, rgba(74, 144, 226, 0.4) 0%, transparent 70%)';
             circle.style.animation = 'pulseRipple 1s ease-out';
             circle.style.pointerEvents = 'none';
             rippleContainer.appendChild(circle);
             setTimeout(() => circle.remove(), 1000);
        });
    }

    // Modal Open/Close Logic
    const preorderModal = document.getElementById('preorderModal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.getElementById('closeModal');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            preorderModal.classList.add('active');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        preorderModal.classList.remove('active');
    });

    // Close on overlay click
    preorderModal.addEventListener('click', (e) => {
        if (e.target === preorderModal) {
            preorderModal.classList.remove('active');
        }
    });

    // Close on OK button click (Coming Soon Message)
    const modalOkBtn = document.getElementById('modalOkBtn');
    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', () => {
            preorderModal.classList.remove('active');
        });
    }
});

// Adding styles dynamically for the JS-created animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes pulseRipple {
        0% { transform: scale(0.9); opacity: 1; }
        100% { transform: scale(1.1); opacity: 0; }
    }
`;
document.head.appendChild(style);
