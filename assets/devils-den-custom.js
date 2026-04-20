// 1. AURA CURSOR LOGIC
document.addEventListener('mousemove', (e) => {
  const aura = document.querySelector('.cursor-aura');
  if (aura) {
    if (aura.style.opacity == 0) aura.style.opacity = 1;
    document.body.classList.add('aura-ready');
    gsap.to(aura, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
      ease: "power2.out"
    });
  }
});

// 2. IPOD MOVEMENT ENGINE
function moveIpod(dir) {
  const cats = document.querySelectorAll('.ipod-category');
  if (cats.length === 0) return;
  
  let activeIdx = Array.from(cats).findIndex(c => c.classList.contains('active'));
  
  cats[activeIdx].classList.remove('active');
  if (dir === 'next') {
    activeIdx = (activeIdx + 1) % cats.length;
  } else {
    activeIdx = (activeIdx - 1 + cats.length) % cats.length;
  }
  cats[activeIdx].classList.add('active');
}

// 3. SELECTION LOGIC
function ipodEnter() {
  const active = document.querySelector('.ipod-category.active');
  if (active) {
    const url = active.getAttribute('data-url');
    window.location.href = url;
  }
}