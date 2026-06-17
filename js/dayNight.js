// Day / night toggle (☀️ / 🌙) inside the flower overlay. Swaps the sun and moon
// models, adjusts the flower model's lighting, and sprinkles stars at night.

const dayNightBtn = document.getElementById('dayNightBtn');
const flowerModel = document.getElementById('flowerModel');
const flowerOverlay = document.getElementById('overlay');
const sunModel = document.getElementById('sunModel');
const moonModel = document.getElementById('moonModel');

const STAR_COUNT = 80;
let isNight = false;

function removeStars() {
  document.querySelectorAll('.star-particle').forEach((s) => s.remove());
}

function setNightMode() {
  // Flower model lighting — dimmer exposure, high intensity for a moonlit shine.
  flowerModel.setAttribute('environment-image', 'neutral');
  flowerModel.setAttribute('exposure', '0.5');
  flowerModel.setAttribute('environment-intensity', '2.5');

  // Celestial swap: hide the sun, show the moon.
  if (sunModel) sunModel.setAttribute('exposure', '0');
  if (moonModel) moonModel.setAttribute('exposure', '1.2');

  flowerOverlay.classList.add('night-mode');
  dayNightBtn.textContent = '☀️';

  // Scatter stars across the overlay.
  removeStars();
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDelay = Math.random() * 2 + 's';
    flowerOverlay.appendChild(star);
  }
}

function setDayMode() {
  // Flower model lighting — brighter, neutral intensity.
  flowerModel.setAttribute('environment-image', 'neutral');
  flowerModel.setAttribute('exposure', '1.2');
  flowerModel.setAttribute('environment-intensity', '1.0');

  // Celestial swap: show the sun, hide the moon.
  if (sunModel) sunModel.setAttribute('exposure', '1.5');
  if (moonModel) moonModel.setAttribute('exposure', '0');

  flowerOverlay.classList.remove('night-mode');
  dayNightBtn.textContent = '🌙';

  removeStars();
}

if (dayNightBtn) {
  setNightMode(); // default state

  dayNightBtn.addEventListener('click', () => {
    isNight = !isNight;
    if (isNight) setNightMode();
    else setDayMode();
  });
}
