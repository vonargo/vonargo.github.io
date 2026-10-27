(() => {
  'use strict';
  const header = document.getElementById('site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const refreshHeader = () => header?.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', refreshHeader, { passive: true });
  refreshHeader();

  function closeMenu() {
    nav?.classList.remove('open');
    header?.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  }
  menuButton?.addEventListener('click', () => {
    const opening = !nav.classList.contains('open');
    nav.classList.toggle('open', opening);
    header.classList.toggle('menu-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (nav?.classList.contains('open') && !header?.contains(e.target)) closeMenu();
  });

  // This is a navigable design preview, not an operational AI chat service.
  const demoViews = {
    chat: {
      title: 'Good morning.', subtitle: 'What can I help you with today?',
      prompt: 'Compare these three supplier proposals and show the source documents.',
      chips: [['▢','Chat','Ideas and answers','blue'],['▤','Documents','Review and compare','jade'],['⌕','Research','Find what matters','amber'],['⌘','Applications','Tools for your work','violet']]
    },
    documents: {
      title: 'Work with your documents.', subtitle: 'Keep useful information close to your work.',
      prompt: 'Summarize the differences between the latest proposal drafts. Include references.',
      chips: [['▤','Files','Authorized collections','jade'],['⌕','Search','Find relevant passages','amber'],['▢','Sources','Inspect evidence','blue'],['⌘','Projects','Organize your work','violet']]
    },
    research: {
      title: 'Explore an idea.', subtitle: 'Research with useful context and source material.',
      prompt: 'Compare these technical reports and identify where their conclusions differ.',
      chips: [['⌕','Research','Frame questions','amber'],['▤','Sources','Review documents','jade'],['▢','Findings','Summarize evidence','blue'],['⌘','Output','Prepare a briefing','violet']]
    },
    apps: {
      title: 'Tools for your work.', subtitle: 'A shared home for configured AI applications.',
      prompt: 'Choose a configured application or open an existing workspace.',
      chips: [['▢','Assistant','Conversations','blue'],['▤','Document studio','Work with files','jade'],['⌕','Knowledge','Explore information','amber'],['⌘','Integrations','Connected tools','violet']]
    }
  };
  const buttons = Array.from(document.querySelectorAll('[data-demo]'));
  const el = {
    title: document.getElementById('mock-heading'),
    subtitle: document.getElementById('mock-subheading'),
    prompt: document.querySelector('.mock-prompt-copy'),
    chips: document.getElementById('mock-features')
  };
  function showDemo(mode) {
    const item = demoViews[mode];
    if (!item) return;
    if (el.title) el.title.textContent = item.title;
    if (el.subtitle) el.subtitle.textContent = item.subtitle;
    if (el.prompt) el.prompt.textContent = item.prompt;
    if (el.chips) {
      el.chips.replaceChildren(...item.chips.map(([glyph,name,desc,color]) => {
        const box = document.createElement('div'); box.className = 'mock-feature';
        const icon = document.createElement('span'); icon.className = `mock-feature-glyph ${color}`; icon.textContent = glyph;
        const label = document.createElement('b'); label.textContent = name;
        const sub = document.createElement('small'); sub.textContent = desc;
        box.append(icon,label,sub);
        return box;
      }));
    }
    buttons.forEach(button => {
      const active = button.dataset.demo === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  buttons.forEach(b => b.addEventListener('click', () => showDemo(b.dataset.demo)));

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-hidden');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold: 0.04, rootMargin: '0px 0px 30px 0px'});
    document.body.classList.add('js-motion');
    items.forEach(item => {
      if (item.getBoundingClientRect().top > window.innerHeight - 5) {
        item.classList.add('is-hidden');
      } else {
        item.classList.add('is-visible');
      }
      observer.observe(item);
    });
  }
})();
