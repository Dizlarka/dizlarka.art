// Dizlarka — landing interactions: image lightbox + click-to-load YouTube players.
(function () {
  'use strict';

  // --- Image lightbox ---------------------------------------------------
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');

  function openLightbox(src, size) {
    lbImg.src = src;
    lb.style.setProperty('--lb-w', size + 'vw');
    lb.style.setProperty('--lb-h', size + 'vh');
    lb.classList.add('open');
  }
  function closeLightbox() {
    lb.classList.remove('open');
    lbImg.removeAttribute('src');
  }

  if (lb && lbImg) {
    document.querySelectorAll('img[data-zoom]').forEach(function (img) {
      img.closest('.zoom').addEventListener('click', function () {
        openLightbox(img.getAttribute('src'), img.getAttribute('data-size') || '90');
      });
    });
    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
    });
  }

  // --- YouTube facade: load the player only when the poster is clicked ---
  document.querySelectorAll('.vid[data-video]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (el.dataset.loaded) return;
      el.dataset.loaded = '1';
      var id = el.getAttribute('data-video');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0&playsinline=1';
      iframe.title = el.getAttribute('data-title') || 'Video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.setAttribute('allowfullscreen', '');
      el.innerHTML = '';
      el.appendChild(iframe);
    });
  });
})();
