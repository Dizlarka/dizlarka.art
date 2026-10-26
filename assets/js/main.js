// Dizlarka — landing interactions: image lightbox + YouTube video lightbox.
(function () {
  'use strict';

  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbVideo = null;

  function clearVideo() {
    if (lbVideo) { lbVideo.remove(); lbVideo = null; } // removing the iframe stops playback
  }

  function openImage(src, size) {
    clearVideo();
    lbImg.src = src;
    lbImg.hidden = false;
    lb.style.setProperty('--lb-w', size + 'vw');
    lb.style.setProperty('--lb-h', size + 'vh');
    lb.classList.add('open');
  }

  function openVideo(id, title) {
    lbImg.hidden = true;
    lbImg.removeAttribute('src');
    clearVideo();
    lbVideo = document.createElement('div');
    lbVideo.className = 'lb-video';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0&playsinline=1';
    iframe.title = title || 'Video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    lbVideo.appendChild(iframe);
    lb.insertBefore(lbVideo, lbImg);
    lb.classList.add('open');
  }

  function close() {
    lb.classList.remove('open');
    lbImg.hidden = false;
    lbImg.removeAttribute('src');
    clearVideo();
  }

  if (!lb || !lbImg) return;

  // Click an artwork to enlarge it.
  document.querySelectorAll('img[data-zoom]').forEach(function (img) {
    var trigger = img.closest('.zoom') || img;
    trigger.addEventListener('click', function () {
      openImage(img.getAttribute('src'), img.getAttribute('data-size') || '90');
    });
  });

  // Click a video poster to play it in the overlay.
  document.querySelectorAll('.vid[data-video]').forEach(function (el) {
    el.addEventListener('click', function () {
      openVideo(el.getAttribute('data-video'), el.getAttribute('data-title'));
    });
  });

  document.getElementById('lbClose').addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('open')) close();
  });
})();
