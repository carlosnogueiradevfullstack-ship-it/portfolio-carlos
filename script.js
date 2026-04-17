const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
revealObserver.observe ? reveals.forEach((el) => revealObserver.observe(el)) : null;

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
counters.forEach((counter) => countObserver.observe(counter));

const typeTarget = document.querySelector('.typing');
if (typeTarget) {
  const text = typeTarget.dataset.text || '';
  let index = 0;
  const type = () => {
    if (index <= text.length) {
      typeTarget.textContent = text.slice(0, index);
      index += 1;
      setTimeout(type, 45);
    }
  };
  setTimeout(type, 500);
}

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      card.classList.toggle('hidden', !(filter === 'all' || category.includes(filter)));
    });
  });
});

const modalButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.modal);
    if (modal) modal.classList.add('active');
  });
});
closeButtons.forEach((button) => {
  button.addEventListener('click', () => button.closest('.modal').classList.remove('active'));
});
modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modals.forEach((modal) => modal.classList.remove('active'));
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

const heroVisual = document.querySelector('.hero-visual');
const floatingCard = document.querySelector('.floating-card');
if (heroVisual && floatingCard) {
  heroVisual.addEventListener('mousemove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    floatingCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroVisual.addEventListener('mouseleave', () => {
    floatingCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}
