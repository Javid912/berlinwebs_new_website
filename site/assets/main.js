// Mobile nav toggle + theme toggle + mailto contact form. No backend, no tracking.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
      // Focusing the toggle can trigger the browser to scroll the page
      // horizontally into view; this layout never scrolls sideways.
      if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('bw-theme', next); } catch (e) {}
    });
  }

  var isEn = document.documentElement.lang === 'en';
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var company = form.company.value.trim();
      var message = form.message.value.trim();

      var subject = (isEn ? 'Consultation request from ' : 'Beratungsanfrage von ') + name;
      var bodyLines = [
        'Name: ' + name,
        (isEn ? 'Email: ' : 'E-Mail: ') + email,
        phone ? (isEn ? 'Phone: ' : 'Telefon: ') + phone : null,
        company ? (isEn ? 'Company: ' : 'Unternehmen: ') + company : null,
        '',
        message
      ].filter(Boolean);

      var mailto = 'mailto:info@berlinwebs.de'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
    });
  }

  // Auto-advancing image carousel (e.g. the Cleany project preview).
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var slides = root.querySelectorAll('.carousel-slide');
    var captions = root.querySelectorAll('.carousel-caption');
    var dots = root.querySelectorAll('.dash-dots i');
    if (!slides.length) return;
    var i = 0;
    var timer = null;

    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
      captions.forEach(function (c, idx) { c.classList.toggle('active', idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
    }
    function start() { timer = setInterval(function () { show(i + 1); }, 3200); }
    function stop() { clearInterval(timer); }

    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () { show(idx); stop(); start(); });
    });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);

    show(0);
    start();
  });
});
