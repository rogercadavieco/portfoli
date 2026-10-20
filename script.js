'use strict';
const playButton = document.querySelector('#load-video');
playButton?.addEventListener('click', () => {
  const screen = document.querySelector('#interview-screen');
  const video = document.createElement('iframe');
  video.src = 'https://www.youtube-nocookie.com/embed/JFxvCnSNkHk?autoplay=1&rel=0';
  video.title = 'Entrevista a Roger Cadavieco, director de La Fotografia';
  video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  video.referrerPolicy = 'strict-origin-when-cross-origin';
  video.allowFullscreen = true;
  screen.classList.add('is-playing');
  screen.replaceChildren(video);
  video.focus();
}, { once: true });
