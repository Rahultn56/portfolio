// Rahul Portfolio - Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing Effect
  const phrases = [
    'B.Tech IT Student',
    'Full Stack Web Developer',
    'MERN Stack Enthusiast',
    'Future Software Engineer'
  ];
  
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typingText');

  function type() {
    if (!typingEl) return;
    const current = phrases[phraseIdx];
    
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 90;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400; // Pause before typing next word
    }

    setTimeout(type, delay);
  }
  type();

  // 2. Theme Toggle (Dark / Light Mode)
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio_theme');
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // 4. Scroll To Top & Active Link Highlight
  const topBtn = document.getElementById('topBtn');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Show back-to-top button
    if (topBtn) {
      topBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    }

    // Highlight current section in navbar
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector('.nav-links a[href*=' + sectionId + ']');

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      // Store in localStorage as contact submission
      const submissions = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
      submissions.push({
        name,
        email,
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: new Date().toISOString()
      });
      localStorage.setItem('portfolio_contacts', JSON.stringify(submissions));

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = `Thank you, ${name}! Your message has been received. I will get back to you soon.`;
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
      }, 700);
    });
  }

  // 6. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
