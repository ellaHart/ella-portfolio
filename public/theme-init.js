// Apply the saved presentation mode and theme before first paint to avoid a flash.
// Loaded as a tiny blocking script (not inline) so the Content Security Policy
// can stay strict: script-src 'self'.
(function () {
  var root = document.documentElement, saved = null;
  try {
    if (localStorage.getItem('eh:mode') === 'creative') root.dataset.mode = 'creative';
    saved = localStorage.getItem('eh:theme');
  } catch (e) {}
  root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();
