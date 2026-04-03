/* =========================================
   SCRIPT.JS — AARON ISRAEL PORTFOLIO
   Handles: Nav, Hamburger, Counter Animations,
            Scroll Reveals, Smooth Interactions
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ==============================
     NAVBAR — SCROLL BEHAVIOR
     ============================== */
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function handleNavScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 80) {
      navbar.style.borderBottomColor = '#0a0a0a';
      navbar.style.boxShadow = '0 4px 0 rgba(10,10,10,0.06)';
    } else {
      navbar.style.borderBottomColor = '#0a0a0a';
      navbar.style.boxShadow = 'none';
    }
    lastScrollY = currentScrollY;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ==============================
     HAMBURGER MENU
     ============================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ==============================
     ACTIVE NAV LINK ON SCROLL
     ============================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    let scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.style.color = '';
        });
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }
  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  /* ==============================
     SCROLL REVEAL OBSERVER
     ============================== */
  const revealEls = document.querySelectorAll(
    '.value-card, .service-item, .work-card, .testimonial-card, ' +
    '.stat-block, .process-step, .about-inner, .hero-badge, .positioning-bar'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ==============================
     COUNTER ANIMATION
     ============================== */
  function animateCounter(el, target, duration = 1400) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start);
      }
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.stat-num');
        if (numEl) {
          const target = parseInt(numEl.dataset.target, 10);
          animateCounter(numEl, target);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-block').forEach(block => {
    statsObserver.observe(block);
  });

  /* ==============================
     STAGGERED VALUE CARDS
     ============================== */
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.06}s`;
  });

  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });

  /* ==============================
     MARQUEE PAUSE ON HOVER
     ============================== */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ==============================
     TOOL BADGE HOVER RIPPLE
     ============================== */
  document.querySelectorAll('.tool-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'translate(-2px, -2px)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = '';
    });
  });

  /* ==============================
     PROCESS STEPS — SEQUENTIAL REVEAL
     ============================== */
  const processSteps = document.querySelectorAll('.process-step');
  const processObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      processSteps.forEach((step, i) => {
        setTimeout(() => {
          step.classList.add('visible');
        }, i * 120);
      });
      processObserver.disconnect();
    }
  }, { threshold: 0.2 });

  const processSection = document.getElementById('process');
  if (processSection) processObserver.observe(processSection);

  /* ==============================
     CURSOR ENHANCEMENT (DESKTOP)
     ============================== */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: #c8ff00;
      border: 2px solid #0a0a0a;
      pointer-events: none;
      z-index: 99999;
      transition: transform 0.1s, width 0.15s, height 0.15s;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .value-card, .work-card, .tool-badge').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.background = '#0a0a0a';
        cursor.style.borderColor = '#c8ff00';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.background = '#c8ff00';
        cursor.style.borderColor = '#0a0a0a';
      });
    });
  }

  /* ==============================
     HERO CTA CLICK TRACKING (DEMO)
     ============================== */
  function logInteraction(name) {
    console.log(`[Aaron Israel Portfolio] Interaction: ${name} — ${new Date().toISOString()}`);
  }

  ['hero-book-btn', 'hero-projects-btn', 'about-book-btn', 'cta-book-btn',
   'cta-email-btn', 'nav-cta-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => logInteraction(id));
  });

  /* ==============================
     SMOOTH SECTION ENTRY BORDERS
     ============================== */
  const borderSections = document.querySelectorAll(
    '.value-section, .services-section, .process-section, ' +
    '.work-section, .testimonials-section, .results-section, ' +
    '.about-section, .cta-section'
  );
  const borderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.borderTopColor = 'var(--accent)';
        setTimeout(() => {
          entry.target.style.borderTopColor = '';
        }, 600);
        borderObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  borderSections.forEach(s => borderObserver.observe(s));

  console.log('%cAARON ISRAEL PORTFOLIO%c — No code. Just results.', 
    'font-family:monospace;font-size:16px;font-weight:bold;color:#c8ff00;background:#0a0a0a;padding:4px 8px',
    'font-family:monospace;font-size:12px;color:#888');
});
