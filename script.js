
// ==================== LUCIDE ICONS ====================
lucide.createIcons();

// ==================== LOADER ====================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hoverTargets = document.querySelectorAll('.hover-target');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateFollower);
}
animateFollower();


// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== MOBILE NAV TOGGLE ====================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ==================== SCROLL REVEAL ANIMATION ====================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ==================== COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

function animateCounter(element, target) {
    let count = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count);
        }
    }, 30);
}

// ==================== SKILL BAR ANIMATION ====================
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i data-lucide="check"></i> পাঠানো হয়েছে!';
    submitBtn.style.background = '#4ade80';

    lucide.createIcons();

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
        lucide.createIcons();
    }, 3000);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const gradients = document.querySelectorAll('.bg-gradient');

    gradients.forEach((gradient, index) => {
        const speed = (index + 1) * 0.1;
        gradient.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== TYPEWRITER EFFECT FOR HERO ====================
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.innerHTML;

// Add typing effect on load
window.addEventListener('load', () => {
    setTimeout(() => {
        heroSubtitle.style.opacity = '0';
        setTimeout(() => {
            heroSubtitle.innerHTML = originalText;
            heroSubtitle.style.opacity = '1';
        }, 500);
    }, 1500);
});

// ==================== BUTTON RIPPLE EFFECT ====================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: 100px;
                    height: 100px;
                    margin-left: -50px;
                    margin-top: -50px;
                    pointer-events: none;
                `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});


// Add ripple animation
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Ripple effect বা analytics ট্র্যাক করতে চাইলে এখানে কোড লিখুন
        console.log(`Opened: ${this.title}`);
        
        // উদাহরণ: Google Analytics Event
        // gtag('event', 'click', { 'event_category': 'social', 'event_label': this.title });
    });
});






console.log('🚀 Portfolio loaded successfully!');
