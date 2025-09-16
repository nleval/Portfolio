// Gestion du mode clair/sombre
function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const icon = themeBtn.querySelector('i');
  // Appliquer le thème stocké si présent
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
}

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

// Séquence du Konami Code : ↑ ↑ ↓ ↓ ← → ← → B A Entrée
const konamiCode = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a","Enter"
];

let position = 0;

document.addEventListener("keydown", function(event) {
  console.log(event.key); // Pour le débogage
  if (event.key === konamiCode[position]) {
    position++;
    if (position === konamiCode.length) {
      // Succès : redirection
      window.location.href = "secret/secret.html";
      position = 0;
    }
  } else {
    // Reset si la touche n'est pas la bonne
    position = 0;
  }
});


// Animation des barres de compétences
function setupSkillsAnimation() {
  const skillBars = document.querySelectorAll('.skills-bars > div > div > div');

  skillBars.forEach(bar => {
    bar.setAttribute('data-width', bar.style.width); // stocke la largeur cible
    bar.style.width = '0%'; // initialise à 0

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animation de remplissage
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width');
          }, 100); // léger délai pour style plus doux
        } else {
          // Reset si sortie de la vue
          bar.style.width = '0%';
        }
      });
    }, { threshold: 0.3 });

    observer.observe(bar); // observe chaque barre individuellement
  });
}


// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
  setupProfileFadeIn();
  setupProjectsFadeIn();
  setupProjectModal();
  setupLangToggle();
  setupThemeToggle();
  setupSkillsAnimation();
});
