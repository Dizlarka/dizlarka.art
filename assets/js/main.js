// Dizlarka — landing interactions: image lightbox + YouTube video lightbox.
(function () {
  'use strict';

  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbVideo = null;
  var scrollLock = 0;

  // Freeze the page behind the overlay. Without this, Safari lets the
  // background scroll while the lightbox is open and jumps it to the top
  // when you tap inside — so we pin the body and restore the position on close.
  function lockScroll() {
    scrollLock = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = (-scrollLock) + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }
  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollLock);
  }

  function clearVideo() {
    if (lbVideo) { lbVideo.remove(); lbVideo = null; } // removing the iframe stops playback
  }

  function openImage(src, size) {
    clearVideo();
    lbImg.src = src;
    lbImg.hidden = false;
    lb.style.setProperty('--lb-w', size + 'vw');
    lb.style.setProperty('--lb-h', size + 'vh');
    if (!lb.classList.contains('open')) lockScroll();
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
    if (!lb.classList.contains('open')) lockScroll();
    lb.classList.add('open');
  }

  function close() {
    if (!lb.classList.contains('open')) return;
    lb.classList.remove('open');
    lbImg.hidden = false;
    lbImg.removeAttribute('src');
    clearVideo();
    unlockScroll();
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
