document.addEventListener('DOMContentLoaded', function(){

  // Each feature runs in its own try/catch. If one feature has a problem,
  // it's logged to the console but does NOT stop the other features below
  // it from running. This is the key fix: before, one failure anywhere
  // would silently kill everything after it in the file.

  try { initThemeToggle(); } catch(err){ console.error('Theme toggle failed to start:', err); }
  try { initCarousel(); } catch(err){ console.error('Carousel failed to start:', err); }
  try { initScrollReveal(); } catch(err){ console.error('Scroll reveal failed to start:', err); }
  try { initEnrollModal(); } catch(err){ console.error('Enroll modal failed to start:', err); }
  try { initDirectWhatsAppButtons(); } catch(err){ console.error('Direct WhatsApp buttons failed to start:', err); }
  try { initWelcomePopup(); } catch(err){ console.error('Welcome popup failed to start:', err); }
  try { initCountdown(); } catch(err){ console.error('Countdown timer failed to start:', err); }
  try { initFaqAccordion(); } catch(err){ console.error('FAQ accordion failed to start:', err); }
  try { initSectionMenu(); } catch(err){ console.error('Section menu failed to start:', err); }
  try { initScrollToButtons(); } catch(err){ console.error('Scroll-to buttons failed to start:', err); }
  try { initCoursesMenu(); } catch(err){ console.error('Courses menu failed to start:', err); }

  // ---------- theme toggle (light / dark) ----------
  function initThemeToggle(){
    const themeToggle = document.getElementById('themeToggle');
    if(!themeToggle) return;
    themeToggle.addEventListener('click', ()=>{
      const isLight = themeToggle.getAttribute('aria-pressed') === 'true';
      const next = isLight ? 'signal' : 'daylight';
      document.documentElement.setAttribute('data-theme', next);
      themeToggle.setAttribute('aria-pressed', isLight ? 'false' : 'true');
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  // ---------- success story carousel ----------
  function initCarousel(){
    const track = document.getElementById('carouselTrack');
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if(!(track && dotsWrap && prevBtn && nextBtn)) return;

    const slides = track.querySelectorAll('.carousel-slide');
    let current = 0;
    let autoplayTimer = null;

    slides.forEach((_, i)=>{
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to story ' + (i + 1));
      dot.addEventListener('click', ()=>goToSlide(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('.carousel-dot');

    function goToSlide(index){
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((d, i)=>d.classList.toggle('active', i === current));
    }
    function startAutoplay(){
      stopAutoplay();
      autoplayTimer = setInterval(()=>goToSlide(current + 1), 5000);
    }
    function stopAutoplay(){
      if(autoplayTimer) clearInterval(autoplayTimer);
    }

    prevBtn.addEventListener('click', ()=>{ goToSlide(current - 1); startAutoplay(); });
    nextBtn.addEventListener('click', ()=>{ goToSlide(current + 1); startAutoplay(); });

    const carouselEl = track.closest('.carousel');
    if(carouselEl){
      carouselEl.addEventListener('mouseenter', stopAutoplay);
      carouselEl.addEventListener('mouseleave', startAutoplay);
    }

    goToSlide(0);
    startAutoplay();
  }

  // ---------- scroll reveal ----------
  function initScrollReveal(){
    const revealEls = document.querySelectorAll('.reveal');
    if(!revealEls.length) return;
    if(typeof IntersectionObserver === 'undefined'){
      revealEls.forEach(el=>el.classList.add('show'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
    }, {threshold:0.12});
    revealEls.forEach(el=>io.observe(el));
  }

  // ---------- Enroll modal ----------
  function initEnrollModal(){
    const overlay = document.getElementById('enrollModal');
    const openBtns = document.querySelectorAll('.js-enroll-btn');
    const closeBtn = document.getElementById('modalClose');
    const successClose = document.getElementById('successClose');
    const formState = document.getElementById('formState');
    const successState = document.getElementById('successState');
    const form = document.getElementById('enrollForm');

    if(!(overlay && openBtns.length && closeBtn && successClose && formState && successState && form)){
      console.warn('Enroll modal not initialized — missing element(s) on the page.');
      return;
    }

    const WHATSAPP_NUMBER = '918247564178';

    function openModal(){
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      formState.classList.remove('hide');
      successState.classList.remove('show');
      const nameField = document.getElementById('f-name');
      if(nameField) setTimeout(()=>nameField.focus(), 250);
    }
    function closeModal(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    openBtns.forEach(b=>b.addEventListener('click', openModal));
    closeBtn.addEventListener('click', closeModal);
    successClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

    function setError(fieldId, msg){
      const input = document.getElementById(fieldId);
      const err = document.getElementById('err-' + fieldId.split('-')[1]);
      if(!input || !err) return;
      if(msg){ input.classList.add('err'); err.textContent = msg; }
      else{ input.classList.remove('err'); err.textContent = ''; }
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      const nameEl = document.getElementById('f-name');
      const mobileEl = document.getElementById('f-mobile');
      const emailEl = document.getElementById('f-email');
      if(!(nameEl && mobileEl && emailEl)) return;

      const name = nameEl.value.trim();
      const mobile = mobileEl.value.trim();
      const email = emailEl.value.trim();

      let valid = true;
      if(name.length < 2){ setError('f-name', 'Please enter your full name'); valid = false; }
      else setError('f-name', '');

      const mobileDigits = mobile.replace(/\D/g,'');
      if(mobileDigits.length < 10){ setError('f-mobile', 'Enter a valid 10-digit mobile number'); valid = false; }
      else setError('f-mobile', '');

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!emailOk){ setError('f-email', 'Enter a valid email address'); valid = false; }
      else setError('f-email', '');

      if(!valid) return;

      // Each page can set its own intro line via data-intro-message on #enrollModal;
      // falls back to the original TypeScript-course wording if not set.
      const introMessage = overlay.getAttribute('data-intro-message')
        || "Hi! I'd like to enroll in the Playwright Automation with TypeScript course.";

      const message =
        introMessage + "\n\n" +
        "Name: " + name + "\n" + "Mobile: " + mobile + "\n" + "Email: " + email;

      const waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
      window.open(waUrl, '_blank');

      formState.classList.add('hide');
      successState.classList.add('show');
    });
  }

  // ---------- Direct-to-WhatsApp buttons ----------
  function initDirectWhatsAppButtons(){
    const WHATSAPP_NUMBER = '918247564178';
    const directBtns = document.querySelectorAll('.js-whatsapp-direct');
    if(!directBtns.length) return;
    directBtns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        // Each button can set its own data-wa-message; falls back to a generic
        // "tell us your query" message if none is set on the element.
        const customMessage = btn.getAttribute('data-wa-message');
        const message = customMessage || "Hi! I have a query about your courses. My question is: ";
        const waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
        window.open(waUrl, '_blank');
      });
    });
  }
  // ---------- Welcome popup ----------
  function initWelcomePopup(){
    const overlay = document.getElementById('welcomeModal');
    const closeBtn = document.getElementById('welcomeClose');
    if(!(overlay && closeBtn)) return;

    function openWelcome(){
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeWelcome(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    setTimeout(openWelcome, 600);

    closeBtn.addEventListener('click', closeWelcome);
    overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeWelcome(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && overlay.classList.contains('open')) closeWelcome(); });

    // The course buttons are now plain links (each redirects to its own page),
    // so no extra click handling is needed for them — the browser navigates on its own.
    // welcomeExplore is kept optional here for backward compatibility with any page
    // that still uses an in-page "explore" button instead of a link.
    const exploreBtn = document.getElementById('welcomeExplore');
    if(exploreBtn){
      exploreBtn.addEventListener('click', ()=>{
        closeWelcome();
        const curriculum = document.getElementById('curriculum');
        if(curriculum && typeof curriculum.scrollIntoView === 'function'){
          curriculum.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // ---------- Countdown timer to batch start (21 Sep 2026, IST) ----------
  function initCountdown(){
    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minutesEl = document.getElementById('cdMinutes');
    const secondsEl = document.getElementById('cdSeconds');
    const timerWrap = document.getElementById('countdownTimer');
    if(!(daysEl && hoursEl && minutesEl && secondsEl && timerWrap)) return;

    // Batch start date. Change this line if the date/year is ever different.
    const targetDate = new Date('2026-09-21T00:00:00+05:30').getTime();

    function pad(n){ return String(n).padStart(2, '0'); }

    let intervalId = null;

    function tick(){
      const now = Date.now();
      const diff = targetDate - now;

      if(diff <= 0){
        timerWrap.innerHTML = '<span class="cd-done">Batch has started — reach out to check seat availability</span>';
        if(intervalId) clearInterval(intervalId);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    tick();
    intervalId = setInterval(tick, 1000);
  }

  // ---------- Section nav menu (hamburger icon) ----------
  function initSectionMenu(){
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('sectionMenu');
    if(!(toggle && menu)) return;

    const links = menu.querySelectorAll('.section-menu-link');

    function openMenu(){
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function closeMenu(){
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu(){
      if(menu.classList.contains('open')) closeMenu();
      else openMenu();
    }

    toggle.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleMenu();
    });

    // Buttons (not links) — navigation happens entirely via scrollIntoView,
    // so clicking never changes the URL hash or navigates away from the page.
    links.forEach(link=>{
      link.addEventListener('click', ()=>{
        const targetId = link.getAttribute('data-target');
        const targetEl = targetId ? document.getElementById(targetId) : null;
        closeMenu();
        if(targetEl && typeof targetEl.scrollIntoView === 'function'){
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Close when clicking anywhere outside the menu/toggle.
    document.addEventListener('click', (e)=>{
      if(!menu.classList.contains('open')) return;
      if(menu.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape.
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
  }

  // ---------- Generic same-page scroll buttons (e.g. hero "See full curriculum") ----------
  function initScrollToButtons(){
    const btns = document.querySelectorAll('.js-scroll-to');
    if(!btns.length) return;
    btns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const targetId = btn.getAttribute('data-target');
        const targetEl = targetId ? document.getElementById(targetId) : null;
        if(targetEl && typeof targetEl.scrollIntoView === 'function'){
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---------- Header "Courses" dropdown menu ----------
  function initCoursesMenu(){
    const btn = document.getElementById('coursesMenuBtn');
    const dropdown = document.getElementById('coursesMenuDropdown');
    if(!(btn && dropdown)) return;

    function openMenu(){
      dropdown.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu(){
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu(){
      if(dropdown.classList.contains('open')) closeMenu();
      else openMenu();
    }

    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener('click', (e)=>{
      if(!dropdown.classList.contains('open')) return;
      if(dropdown.contains(e.target) || btn.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && dropdown.classList.contains('open')) closeMenu();
    });
  }

  // ---------- FAQ accordion ----------
  function initFaqAccordion(){
    const items = document.querySelectorAll('.faq-item');
    if(!items.length) return;
    items.forEach(item=>{
      const btn = item.querySelector('.faq-q');
      if(!btn) return;
      btn.addEventListener('click', ()=>{
        const wasOpen = item.classList.contains('open');
        items.forEach(i=>i.classList.remove('open'));
        if(!wasOpen) item.classList.add('open');
      });
    });
  }
});
