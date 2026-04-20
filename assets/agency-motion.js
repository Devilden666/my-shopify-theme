// Agency-Level Engine: Maison Alaïa x Bécane Paris Fusion
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. SELECTORS
  const aura = document.querySelector(".cursor-aura");
  const kineticTitles = document.querySelectorAll('h1, h2, .hero__title, .video-section__heading, .runway-title');
  const sections = gsap.utils.toArray('.shopify-section');
  const runwayWrapper = document.querySelector('.runway-wrapper');

  // 2. ULTRA-STABLE CURSOR ENGINE
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0;
let mouseY = 0;

if (cursor) {
  // 1. Update coordinates on move
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 2. Use a high-speed loop for movement (smoother than standard CSS)
  const render = () => {
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  };
  render();

  // 3. Hover Interactions
  const links = document.querySelectorAll('a, button, .runway-item, .nav-item');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}

  // 3. BÉCANE KINETIC TYPOGRAPHY (3D Flip Reveal)
  if (window.SplitType) {
    kineticTitles.forEach(title => {
      const text = new SplitType(title, { types: 'chars' });
      
      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
        },
        y: 80,
        rotateX: -90, 
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "expo.out"
      });
    });
  }

  // 4. ALAÏA SECTION REVEALS (Vertical Sections)
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: "power3.out"
    });
  });

  // 5. CINEMATIC VIDEO PARALLAX (Hero Section)
  const heroVideo = document.querySelector(".alaia-hero-video video");
  if (heroVideo) {
    gsap.to(heroVideo, {
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: ".alaia-hero-video",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // 6. BÉCANE RUNWAY ENGINE (3D Horizontal Scroll)
  if (runwayWrapper) {
    const runwayItems = gsap.utils.toArray('.runway-item');

    // Main Horizontal Movement
    const scrollTween = gsap.to(runwayItems, {
      xPercent: -100 * (runwayItems.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".becane-runway-container",
        pin: true,
        scrub: 1,
        // Calculate end based on container width for smooth speed
        end: () => "+=" + runwayWrapper.offsetWidth
      }
    });

    // Individual Item Parallax (Depth Effect)
    runwayItems.forEach(item => {
      const img = item.querySelector('.runway-img');
      const speed = parseFloat(item.getAttribute('data-speed')) || 1;

      gsap.to(img, {
        x: speed * 60, // Depth movement
        ease: "none",
        scrollTrigger: {
          trigger: item,
          containerAnimation: scrollTween, // Essential for horizontal parallax
          start: "left right",
          end: "right left",
          scrub: true
        }
      });
    });
    
    // Initial Staggered Reveal
    gsap.from(".runway-item", {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".becane-runway-container",
        start: "top 80%"
      }
      
    });
  }
  // 7. PDP FLOATING IMAGE ENGINE
const pdpImages = gsap.utils.toArray('.pdp-media-item');
if (pdpImages.length > 0) {
  pdpImages.forEach((item, i) => {
    const img = item.querySelector('.pdp-floating-img');
    
    // Parallax effect for the image inside the pinned container
    gsap.to(img, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Subtle 3D Tilt on MouseMove
    item.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(img, {
        x: xPos,
        y: yPos,
        rotationY: xPos / 2,
        rotationX: -yPos / 2,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  });
}
// 9. TECHNICAL DATA TILT EFFECT
const techCards = document.querySelectorAll('.runway-card');

techCards.forEach(card => {
  const dataOverlay = card.querySelector('.item-technical-data');
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt
    const xMove = (x / rect.width - 0.5) * 20;
    const yMove = (y / rect.height - 0.5) * 20;

    gsap.to(dataOverlay, {
      x: xMove,
      y: yMove,
      rotationY: xMove / 2,
      rotationX: -yMove / 2,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(dataOverlay, {
      x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 0.6
    });
  });
});
// 10. KINETIC CART DRAWER REVEAL
const cartDrawer = document.querySelector('cart-drawer');

if (cartDrawer) {
  // We watch for the 'open' attribute which Shopify adds automatically
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && cartDrawer.classList.contains('active')) {
        gsap.from(".cart-item", {
          x: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power4.out"
        });
      }
    });
  });

  observer.observe(cartDrawer, { attributes: true });
}
// Inside your DOMContentLoaded block
const aura = document.querySelector(".cursor-aura");

// Check if the screen is desktop width (990px is the standard Shopify breakpoint)
if (aura && window.innerWidth > 989) {
    gsap.set(aura, { xPercent: -50, yPercent: -50 });
    window.addEventListener("mousemove", (e) => {
      gsap.to(aura, { opacity: 1, x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
    });
} else if (aura) {
    // Hide the aura entirely on mobile
    aura.style.display = 'none';
}
// Inside your DOMContentLoaded block
const isMobile = window.innerWidth < 750;

if (!isMobile) {
  // Only run aggressive parallax on desktop
  gsap.utils.toArray(".media--parallax").forEach(container => {
    const img = container.querySelector("img");
    if(img) {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scrub: true
          }
        });
    }
  });
}
// 11. COLLECTION SWITCHER ENGINE
const toggles = document.querySelectorAll('.runway-toggle');
const tracks = document.querySelectorAll('.runway-wrapper');

toggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const targetTrack = document.getElementById(targetId);
    const currentTrack = document.querySelector('.runway-wrapper.active-track');

    if (targetTrack === currentTrack) return;

    // 1. Update Buttons
    toggles.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // 2. Kinetic Transition
    gsap.to(currentTrack, {
      opacity: 0,
      x: -100,
      duration: 0.6,
      onComplete: () => {
        currentTrack.style.display = 'none';
        currentTrack.classList.remove('active-track');
        
        targetTrack.style.display = 'flex';
        targetTrack.classList.add('active-track');
        
        gsap.fromTo(targetTrack, 
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        );
        
        // Refresh ScrollTrigger to recalculate horizontal length
        ScrollTrigger.refresh();
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const aura = document.querySelector(".cursor-aura");
  
  // 1. FAIL-SAFE: Hide default cursor only if aura is present
  if (aura) {
    document.body.style.cursor = "none";
    gsap.set(aura, { xPercent: -50, yPercent: -50, opacity: 0 });

    window.addEventListener("mousemove", (e) => {
      gsap.to(aura, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1, // Becomes visible only once moving
        duration: 0.5,
        ease: "power2.out"
      });
    });

    // Hover effects for the iPod & Products
    const targets = document.querySelectorAll('a, button, .ipod-wheel, .runway-item');
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(aura, { scale: 3, mixBlendMode: "difference", backgroundColor: "#fff" }));
      el.addEventListener('mouseleave', () => gsap.to(aura, { scale: 1, mixBlendMode: "normal", backgroundColor: "transparent" }));
    });
  }
});
});