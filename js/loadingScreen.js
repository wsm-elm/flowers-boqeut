// Loading screen. Covers the page until everything is ready, then fades out.
// A minimum display time keeps it from flashing on fast (cached) loads.

const loadingScreen = document.getElementById('loadingScreen');
const MIN_DISPLAY_MS = 700;
const startTime = Date.now();

function hideLoadingScreen() {
  if (!loadingScreen) return;
  const elapsed = Date.now() - startTime;
  const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
  setTimeout(() => loadingScreen.classList.add('hidden'), wait);
}

// `load` may have already fired by the time this module runs.
if (document.readyState === 'complete') {
  hideLoadingScreen();
} else {
  window.addEventListener('load', hideLoadingScreen);
}

// Safety net: never trap the user behind the loader.
setTimeout(() => loadingScreen && loadingScreen.classList.add('hidden'), 8000);
