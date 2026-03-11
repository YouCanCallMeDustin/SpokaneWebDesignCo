// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// GSAP Setup
gsap.registerPlugin(ScrollTrigger);

const introContainer = document.getElementById('intro-container');
const mainContent = document.getElementById('main-content');
const grid = document.querySelector('.intro-grid');

// Timeline for Intro Sequence
const tl = gsap.timeline({
    onComplete: () => {
        introContainer.style.display = 'none';
        
        document.body.style.overflow = 'auto';
        mainContent.style.position = 'relative';
        mainContent.style.height = 'auto';
        mainContent.style.overflow = 'visible';
        mainContent.style.transform = 'none';
        
        ScrollTrigger.refresh();
    }
});

document.body.style.overflow = 'hidden';

const targetScale = 1 / 0.28;

tl.to(grid, {
    scale: targetScale,
    duration: 2.2,
    ease: "power3.inOut",
    delay: 0.5
})
.to('.target-item', {
    borderRadius: "0px",
    duration: 2.2,
    ease: "power3.inOut"
}, "<")
.to(mainContent, {
    scale: 1.0,
    duration: 2.2,
    ease: "power3.inOut",
    clearProps: "transform"
}, "<");


// Scroll-triggered animations for sections
const revealElements = document.querySelectorAll('.reveal-up');
revealElements.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Parallax slight offset for header
gsap.to('.hero-bg-elements', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 200,
    opacity: 0
});

// Magnetic Physics for Cards (Standard interactive cards)
const interactiveCards = document.querySelectorAll('.service-card, .process-step, .faq-item, .testimonial-card, .live-project-card, .comparison-row');
interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const xPos = e.clientX - rect.left - rect.width / 2;
        const yPos = e.clientY - rect.top - rect.height / 2;
        
        // Subtle magnetic pull + slight tilt for premium feel
        gsap.to(card, {
            x: xPos * 0.1,
            y: yPos * 0.1,
            rotationY: (xPos / rect.width) * 5,
            rotationX: -(yPos / rect.height) * 5,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// Magnetic Buttons & Links
const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav, .nav-links a, .footer-links-col a, .socials a');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Stronger pull for small elements like buttons/links
        gsap.to(el, { x: x * 0.5, y: y * 0.5, duration: 0.4, ease: "power2.out" });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    });
});

// 3D Tilt on Portfolio Cards
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    const wrap = item.querySelector('.portfolio-img-wrap');
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(wrap, {
            rotationY: x * 20,
            rotationX: -y * 20,
            transformPerspective: 1000,
            ease: "power1.out",
            duration: 0.4
        });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(wrap, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });
});
