/* =====================================================================
   KEVIN JOVER — PORTFOLIO SCRIPT
   Table of contents:
   1. Preloader
   2. Language switch (i18n)
   3. Custom cursor
   4. Scroll progress + nav blur
   5. Mobile menu
   6. Smooth scroll links
   7. Reel modal (Vimeo Player API)
   8. Reveal on scroll (Intersection Observer)
   9. Contact form (Formspree)
   10. Rive logo
   11. Footer year
===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLanguageSwitch();
  initCustomCursor();
  initScrollProgressAndNav();
  initMobileMenu();
  initSmoothScrollLinks();
  initReelModal();
  initRevealAnimations();
  initContactForm();
  initRiveLogo();
  initFooterYear();
});

/* =====================================================================
   1. PRELOADER
===================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const nameEl = document.getElementById('preloaderName');
  if (!preloader || !nameEl) return;

  // Split name into animated letters
  const text = nameEl.textContent;
  nameEl.innerHTML = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${i * 0.03}s`;
    nameEl.appendChild(span);
  });

  const hide = () => {
    preloader.classList.add('is-hidden');
    document.body.style.overflow = '';
  };

  document.body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(hide, 900);
  });

  // Safety fallback in case 'load' fires late (e.g. slow video embeds)
  setTimeout(hide, 3500);
}

/* =====================================================================
   2. LANGUAGE SWITCH (i18n)
===================================================================== */
const TRANSLATIONS = {
  en: {
    'nav.role': 'Motion & Video Editor',
    'nav.about': 'About',
    'nav.work': 'Portfolio',
    'nav.contact': "Let's Work",
    'nav.contactFooter': 'Contact',
    'hero.eyebrow': 'Motion & Video — Portfolio 2026',
    'hero.sub': 'Motion & Video Editor',
    'hero.desc': 'Building cinematic motion, thoughtful video edits, and interactive digital experiences for brands that want to feel unforgettable.',
    'hero.watchReel': 'Watch Reel',
    'hero.viewPortfolio': 'View Portfolio',
    'hero.scrollCue': 'Featured Projects',
    'about.eyebrow': 'About',
    'about.p1': "I'm a Motion & Video Editor with 7+ years of experience creating engaging animations and polished video content for brands, agencies, and digital creators. My work focuses on clear visual storytelling, combining motion, editing, and design to create content that captures attention and communicates ideas effectively.",
    'about.p2': 'From social media campaigns and YouTube videos to product animations and UI motion, I enjoy turning concepts into dynamic visuals that leave a lasting impression.',
    'projects.eyebrow': 'Selected work',
    'projects.heading': 'Featured Projects',
    'contact.eyebrow': 'Get in touch',
    'contact.heading': "Let's Work Together",
    'contact.desc': "Have a project in mind? Tell me a little about it and I'll get back to you shortly.",
    'contact.nameLabel': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.emailLabel': 'Email',
    'contact.emailPlaceholder': 'you@email.com',
    'contact.messageLabel': 'Message',
    'contact.messagePlaceholder': 'Tell me about your project',
    'contact.submit': 'Send Message',
    'contact.sending': 'Sending…',
    'contact.success': "Thanks — your message is on its way. I'll reply soon.",
    'contact.error': 'Something went wrong. Please try again.',
    'contact.networkError': 'Network error — please try again in a moment.',
    'footer.rights': 'All rights reserved.',
  },
  pt: {
    'nav.role': 'Motion & Video Editor',
    'nav.about': 'Sobre',
    'nav.work': 'Portfólio',
    'nav.contact': 'Vamos Falar',
    'nav.contactFooter': 'Contato',
    'hero.eyebrow': 'Motion & Vídeo — Portfólio 2026',
    'hero.sub': 'Motion & Video Editor',
    'hero.desc': 'Criando motion cinematográfico, edições cuidadosas e experiências digitais interativas para marcas que querem ser inesquecíveis.',
    'hero.watchReel': 'Ver Reel',
    'hero.viewPortfolio': 'Ver Portfólio',
    'hero.scrollCue': 'Projetos em Destaque',
    'about.eyebrow': 'Sobre',
    'about.p1': 'Sou Motion & Video Editor com mais de 7 anos de experiência criando animações e conteúdos audiovisuais para marcas, agências e criadores de conteúdo. Meu foco é transformar ideias em narrativas visuais claras e envolventes, unindo motion design, edição e design para produzir peças que comunicam com impacto.',
    'about.p2': 'Atuo em projetos para redes sociais, YouTube, publicidade e produtos digitais, sempre buscando soluções criativas e uma execução cuidadosa em cada detalhe.',
    'projects.eyebrow': 'Trabalhos selecionados',
    'projects.heading': 'Projetos em Destaque',
    'contact.eyebrow': 'Entre em contato',
    'contact.heading': 'Vamos Trabalhar Juntos',
    'contact.desc': 'Tem um projeto em mente? Me conte um pouco sobre ele que eu retorno em breve.',
    'contact.nameLabel': 'Nome',
    'contact.namePlaceholder': 'Seu nome',
    'contact.emailLabel': 'E-mail',
    'contact.emailPlaceholder': 'voce@email.com',
    'contact.messageLabel': 'Mensagem',
    'contact.messagePlaceholder': 'Me conte sobre o seu projeto',
    'contact.submit': 'Enviar Mensagem',
    'contact.sending': 'Enviando…',
    'contact.success': 'Obrigado — sua mensagem já foi enviada. Retorno em breve.',
    'contact.error': 'Algo deu errado. Por favor, tente novamente.',
    'contact.networkError': 'Erro de conexão — tente novamente em instantes.',
    'footer.rights': 'Todos os direitos reservados.',
  },
};

const LANG_STORAGE_KEY = 'kj-site-lang';

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  applyTranslations(lang);
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (err) {
    /* localStorage unavailable — language just won't persist */
  }
}

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;
  } catch (err) {
    /* ignore */
  }
  const browserLang = (navigator.language || 'en').toLowerCase();
  return browserLang.startsWith('pt') ? 'pt' : 'en';
}

function initLanguageSwitch() {
  const lang = getInitialLanguage();
  applyTranslations(lang);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

/* =====================================================================
   3. CUSTOM CURSOR
===================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) return;
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, .project-card, input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('is-hover');
      ring.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('is-hover');
      ring.classList.remove('is-hover');
    }
  });
}

/* =====================================================================
   4. SCROLL PROGRESS + NAV BLUR
===================================================================== */
function initScrollProgressAndNav() {
  const bar = document.getElementById('scrollProgressBar');
  const nav = document.getElementById('siteNav');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (bar) bar.style.width = `${progress}%`;
    if (nav) nav.classList.toggle('is-scrolled', scrollTop > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =====================================================================
   5. MOBILE MENU
===================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('[data-close-menu]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* =====================================================================
   6. SMOOTH SCROLL LINKS
===================================================================== */
function initSmoothScrollLinks() {
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* =====================================================================
   7. REEL MODAL (Vimeo Player API)
===================================================================== */
function initReelModal() {
  const openBtn = document.getElementById('watchReelBtn');
  const closeBtn = document.getElementById('reelModalClose');
  const modal = document.getElementById('reelModal');
  const iframe = document.getElementById('reelModalIframe');
  if (!openBtn || !modal || !iframe) return;

  const REEL_SRC = 'https://player.vimeo.com/video/1200821128?badge=0&autopause=0&autoplay=1&controls=1';
  let player = null;

  function openModal() {
    iframe.src = REEL_SRC;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (window.Vimeo && window.Vimeo.Player) {
      player = new window.Vimeo.Player(iframe);
      player.setVolume(1).catch(() => {});
      player.play().catch(() => {});
    }
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';

    if (player) {
      player.unload().catch(() => {});
      player = null;
    }
    // Fully stop playback + audio by clearing the source
    iframe.src = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

/* =====================================================================
   8. REVEAL ON SCROLL
===================================================================== */
function initRevealAnimations() {
  const revealTargets = document.querySelectorAll('.reveal, .project-card');

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.classList.contains('project-card') ? (i % 3) * 90 : 0;
          setTimeout(() => el.classList.add('is-visible'), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

/* =====================================================================
   9. CONTACT FORM (Formspree)
===================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  const t = (key) => {
    const lang = document.documentElement.lang;
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key];
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.textContent = t('contact.sending');
      submitBtn.disabled = true;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        status.textContent = t('contact.success');
        status.classList.add('is-success');
        form.reset();
      } else {
        status.textContent = t('contact.error');
        status.classList.remove('is-success');
      }
    } catch (err) {
      status.textContent = t('contact.networkError');
      status.classList.remove('is-success');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalLabel;
        submitBtn.disabled = false;
      }
    }
  });
}

/* =====================================================================
   10. RIVE LOGO
===================================================================== */
function initRiveLogo() {
  if (typeof rive === 'undefined') return;

  ['logoCanvas', 'preloaderLogoCanvas'].forEach((id) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const instance = new rive.Rive({
      src: 'logo.riv',
      canvas,
      autoplay: true,
      animations: 'circle',
      onLoad: () => {
        instance.resizeDrawingSurfaceToCanvas();
      },
    });
  });
}

/* =====================================================================
   11. FOOTER YEAR
===================================================================== */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}
