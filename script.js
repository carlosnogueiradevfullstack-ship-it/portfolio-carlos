const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
reveals.forEach((el) => observer.observe(el));

const counters = document.querySelectorAll('[data-count]');
const animateCounter = (el) => {
  const target = Number(el.dataset.count);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = current;
    }
  }, 35);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.7 });

counters.forEach((counter) => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    projects.forEach((project) => {
      const category = project.dataset.category;
      if (filter === 'all' || category.includes(filter)) {
        project.classList.remove('hidden');
      } else {
        project.classList.add('hidden');
      }
    });
  });
});

const openButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.modal);
    if (modal) modal.classList.add('active');
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.modal').classList.remove('active');
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const theme = document.body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', theme);
});

const heroCard = document.querySelector('.hero-card');
const codeCard = document.querySelector('.code-card');

if (heroCard && codeCard) {
  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((y / rect.height) - 0.5) * -14;
    codeCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    codeCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}
