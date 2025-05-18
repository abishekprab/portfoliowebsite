// Typing effect in hero
const text = "Web Developer | Coder";
let index = 0;
const typingElement = document.querySelector(".lead");

function typeEffect() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
typingElement.textContent = ""; // Clear initial text
typeEffect();

// Scroll animations
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll); // Trigger on load

// Smooth scrolling
document.querySelectorAll("a.nav-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Reveal each section
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

// Counter animation (e.g., number stats)
function animateCounter(id, end) {
  const el = document.getElementById(id);
  let current = 0;
  const duration = 2000;
  const increment = end / (duration / 16); // ~60fps

  function update() {
    current += increment;
    if (current < end) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      el.textContent = end;
    }
  }

  update();
}

// Trigger counters on scroll
ScrollTrigger.create({
  trigger: "#skills",
  start: "top 80%",
  once: true,
  onEnter: () => {
    animateCounter("html-counter", 90);
    animateCounter("css-counter", 85);
    animateCounter("js-counter", 80);
    animateCounter("react-counter", 75);
  }
});

// Hero parallax effect
document.addEventListener("mousemove", e => {
  const hero = document.querySelector("header");
  const x = (e.clientX - window.innerWidth / 2) * 0.02;
  const y = (e.clientY - window.innerHeight / 2) * 0.02;
  hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});


