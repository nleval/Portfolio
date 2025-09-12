
// Effet fade-in sur la photo de profil
function setupProfileFadeIn() {
  const profileImage = document.querySelector('.fade-in-profile');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.3 });
  if (profileImage) {
    observer.observe(profileImage);
  }
}

// Effet fade-in sur les projets
function setupProjectsFadeIn() {
  const projects = document.querySelectorAll('.fade-in-project');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });
  projects.forEach(project => observer.observe(project));
}

// Gestion du modal projet
function setupProjectModal() {
  document.querySelectorAll('.project-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const description = thumb.getAttribute('data-description');
      const imageSrc = thumb.querySelector('img').getAttribute('src');
      const githubLink = thumb.getAttribute('data-github');
      document.getElementById('modal-description').textContent = description;
      document.getElementById('modal-image').src = imageSrc;
      document.getElementById('modal-github').href = githubLink;
      document.getElementById('modal').style.display = 'block';
    });
  });
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target == document.getElementById('modal')) {
      document.getElementById('modal').style.display = 'none';
    }
  });
}

// Gestion des langues
let currentLang = 'fr';
let translations = {};
function updateTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Mettre à jour le bouton
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';
}
function setupLangToggle() {
  fetch('translations.json')
    .then(response => response.json())
    .then(data => {
      translations = data;
      updateTranslations(currentLang);
      document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        updateTranslations(currentLang);
      });
    });
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
  setupProfileFadeIn();
  setupProjectsFadeIn();
  setupProjectModal();
  setupLangToggle();
});
