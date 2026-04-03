/* ============================================================
   ZHONGBANG PHARM-TECH — script.js
   Handles: DNA helix SVG, nav scroll, mobile menu, form submit
   ============================================================ */

// ── DNA HELIX SVG GENERATOR ─────────────────────────────────
(function generateDNA() {
  const container = document.getElementById('dnaSvg');
  if (!container) return;

  const W = 420, H = 600;
  const cx = W / 2;
  const amplitude = 90;
  const frequency = 0.022;
  const nodes = 32;

  let paths = '';
  let dots  = '';

  // Left strand
  let leftD = '', rightD = '';
  for (let i = 0; i <= 200; i++) {
    const y = (i / 200) * H;
    const x1 = cx + Math.sin(y * frequency) * amplitude;
    const x2 = cx - Math.sin(y * frequency) * amplitude;
    if (i === 0) { leftD += `M ${x1} ${y}`; rightD += `M ${x2} ${y}`; }
    else { leftD += ` L ${x1} ${y}`; rightD += ` L ${x2} ${y}`; }
  }

  paths += `<path d="${leftD}" stroke="#4cc98a" stroke-width="1.5" fill="none" opacity="0.9"/>`;
  paths += `<path d="${rightD}" stroke="#2d9c84" stroke-width="1.5" fill="none" opacity="0.9"/>`;

  // Cross rungs
  for (let i = 0; i < nodes; i++) {
    const y = (i / (nodes - 1)) * H;
    const x1 = cx + Math.sin(y * frequency) * amplitude;
    const x2 = cx - Math.sin(y * frequency) * amplitude;
    const op = 0.3 + 0.4 * Math.abs(Math.sin(y * frequency));

    paths += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#4cc98a" stroke-width="1" opacity="${op.toFixed(2)}"/>`;

    // Node circles
    dots += `<circle cx="${x1}" cy="${y}" r="3" fill="#4cc98a" opacity="${op.toFixed(2)}"/>`;
    dots += `<circle cx="${x2}" cy="${y}" r="3" fill="#2d9c84" opacity="${op.toFixed(2)}"/>`;
  }

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      ${paths}
      ${dots}
    </svg>`;

  // Floating animation via CSS injection
  const style = document.createElement('style');
  style.textContent = `
    .dna-helix svg { animation: dnaFloat 8s ease-in-out infinite; }
    @keyframes dnaFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50%       { transform: translateY(-20px) rotate(1deg); }
    }
  `;
  document.head.appendChild(style);
})();


// ── NAVIGATION: scroll shadow ───────────────────────────────
(function navScroll() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 40
      ? '0 4px 24px rgba(0,0,0,0.3)'
      : 'none';
  }, { passive: true });
})();


// ── MOBILE MENU ──────────────────────────────────────────────
(function mobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', menu.classList.contains('open'));
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
})();


// ── FORM SUBMIT ──────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Sent';
    btn.style.background = '#4cc98a';
    btn.style.color = '#0d1f1a';
    if (success) success.style.display = 'block';
    e.target.reset();
  }, 1200);
}


// ── SCROLL REVEAL ─────────────────────────────────────────────
(function scrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .product-tile, .cert-card, .mission-card, .stat'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    io.observe(el);
  });
})();
