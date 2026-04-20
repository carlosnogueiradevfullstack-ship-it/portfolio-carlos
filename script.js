const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.14 });

if (reveals.length) {
  reveals.forEach((el) => revealObserver.observe(el));
}

const counters = document.querySelectorAll('[data-count]');

const animateCounter = (el) => {
  const target = Number(el.dataset.count);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 36));

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, 34);
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.done) {
      entry.target.dataset.done = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.75 });

if (counters.length) {
  counters.forEach((counter) => countObserver.observe(counter));
}

const typeTarget = document.querySelector('.typing');

if (typeTarget) {
  const text = typeTarget.dataset.text || '';
  let index = 0;

  const type = () => {
    if (index <= text.length) {
      typeTarget.textContent = text.slice(0, index);
      index++;
      setTimeout(type, 34);
    }
  };

  type();
}

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav a');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}