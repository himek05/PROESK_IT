// Enhanced Script for Prodesk IT landing page
(function(){
  
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ===== DARK MODE TOGGLE =====
  const body = document.body;
  const darkToggle = document.getElementById('darkToggle');
  const saved = localStorage.getItem('prodesk-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if(saved === 'dark' || (!saved && prefersDark)) {
    body.classList.add('dark');
    if(darkToggle) darkToggle.textContent = '☀️';
  } else {
    if(darkToggle) darkToggle.textContent = '🌙';
  }

  if(darkToggle){
    darkToggle.addEventListener('click', ()=>{
      const isDark = body.classList.toggle('dark');
      localStorage.setItem('prodesk-theme', isDark ? 'dark' : 'light');
      darkToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if(hamburger && navLinks){
    hamburger.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', open);
    });

    document.querySelectorAll('.nav-links a').forEach(a=>{
      a.addEventListener('click', ()=> navLinks.classList.remove('show'))
    });
  }

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const formMessage = document.getElementById('formMessage');

      // Basic validation
      if(!name || !email || !message) {
        showMessage(formMessage, 'Please fill in all fields.', 'error');
        return;
      }

      if(!isValidEmail(email)) {
        showMessage(formMessage, 'Please enter a valid email address.', 'error');
        return;
      }

      // Simulate form submission
      const button = contactForm.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;

      setTimeout(() => {
        showMessage(formMessage, 'Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        button.textContent = originalText;
        button.disabled = false;

        // Hide message after 4 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 4000);
      }, 1000);
    });
  }

  // ===== NEWSLETTER FORM HANDLING =====
  const newsletterForm = document.getElementById('newsletterForm');
  if(newsletterForm) {
    newsletterForm.addEventListener('submit', function(e){
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value.trim();
      
      if(!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const button = this.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Subscribed ✓';
      button.disabled = true;

      setTimeout(() => {
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    });
  }

  // ===== UTILITY FUNCTIONS =====
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(element, text, type) {
    element.textContent = text;
    element.className = 'form-message ' + type;
    element.style.display = 'block';
  }

  // ===== FAQ SMOOTH OPEN/CLOSE =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if(e.target.tagName !== 'P') {
        faqItems.forEach(other => {
          if(other !== item) other.open = false;
        });
      }
    });
  });

})();
