/* ============================================================
   UNDANGAN DIGITAL PERNIKAHAN — ADAT JAWA
   script.js
   ============================================================ */

/* ===================================================
   1. SCROLL REVEAL
   Semua elemen dengan class .reveal, .reveal-left,
   .reveal-right, .reveal-scale, dan .divider akan
   muncul dengan animasi saat masuk viewport.
   =================================================== */
(function initNamaTamu() {
  var params = new URLSearchParams(window.location.search);
  var nama = params.get('to');
  if (nama) {
    var el = document.getElementById('cover-recipient');
    if (el) el.textContent = decodeURIComponent(nama);
  }
})();

(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .divider'
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ===================================================
   2. COUNTDOWN TIMER
   Ganti nilai TARGET_DATE dengan tanggal & waktu
   pernikahan yang sebenarnya.
   Format: 'YYYY-MM-DDTHH:MM:SS+07:00'
   =================================================== */
(function initCountdown() {
  // ✏️ EDIT TANGGAL DI SINI
  const TARGET_DATE = new Date('2026-05-24T08:00:00+08:00');

  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now  = new Date();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      elDays.textContent  = '00';
      elHours.textContent = '00';
      elMins.textContent  = '00';
      elSecs.textContent  = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    elDays.textContent  = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(minutes);
    elSecs.textContent  = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();

/* ===== 9. GALERI SLIDER ===== */
(function initSlider() {
  const track   = document.getElementById('slider-track');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsWrap = document.getElementById('slider-dots');

  if (!track) return;

  const items = track.querySelectorAll('.galeri-item');
  const total = items.length;
  let current = 0;

  // Buat dots
  items.forEach(function (_, i) {
    var dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsWrap.querySelectorAll('.slider-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  // Swipe support (mobile)
  var startX = 0;
  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  // Lightbox tetap jalan
  items.forEach(function (item) {
    var img = item.querySelector('img');
    img.addEventListener('click', function () {
      var lb = document.getElementById('lightbox');
      var lbImg = document.getElementById('lightbox-img');
      if (lb && lbImg) {
        lbImg.src = img.src;
        lb.classList.add('open');
      }
    });
  });
})();


/* ===================================================
   3. RSVP BUTTONS
   Klik tombol Hadir / Berhalangan untuk toggle
   status konfirmasi.
   =================================================== */
(function initRsvp() {
  const btnHadir = document.getElementById('btn-hadir');
  const btnTidak = document.getElementById('btn-tidak');

  if (!btnHadir || !btnTidak) return;

  function setActive(activeBtn, inactiveBtn) {
    activeBtn.classList.add('primary');
    inactiveBtn.classList.remove('primary');
  }

  btnHadir.addEventListener('click', () => setActive(btnHadir, btnTidak));
  btnTidak.addEventListener('click', () => setActive(btnTidak, btnHadir));
})();
