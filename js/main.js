/* ============================================
   喝神手作茶飲 Ha ShEN — Main JavaScript
   2026 Premium Interaction Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbar();
  initScrollReveal();
  initBackToTop();
  initButtonRipple();
  initTiltCards();
  initSmoothScroll();
});

/* --- Custom Cursor --- */
function initCustomCursor() {
  // Skip on touch devices
  if ('ontouchstart' in window) return;

  const dot = document.createElement('div');
  dot.classList.add('cursor-dot');
  const ring = document.createElement('div');
  ring.classList.add('cursor-ring');
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth follow for ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .drink-card, .news-card, .store-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* --- Navbar Scroll Effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Liquid glass on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // Active link highlight
  updateActiveNavLink();
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll Reveal (IntersectionObserver) --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .section-header, .drink-card, .news-card, .store-card, .philosophy-text, .philosophy-image, .stores-map-wrapper, .stagger-children'
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add stagger delay for cards
        const el = entry.target;
        if (el.dataset.stagger) {
          el.style.transitionDelay = `${parseInt(el.dataset.stagger) * 0.12}s`;
        }
        el.classList.add('animate-in');
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- Back To Top Button --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > window.innerHeight) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Button Ripple Effect --- */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* --- Tilt Effect for Cards --- */
function initTiltCards() {
  if ('ontouchstart' in window) return;

  document.querySelectorAll('.drink-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- Utility: Throttle --- */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
