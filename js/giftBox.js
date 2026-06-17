// Surprise gift box (🎁). Clicking the box plays a 4-step unwrapping animation
// (driven by the .step-1 … .step-4 CSS classes), then reveals the 3D gift model
// and launches the fireworks.

import { startFireworks } from './fireworks.js';

const surpriseBtn = document.getElementById('Surprise');
const overlay = document.getElementById('surpriseOverlay');
const closeBtn = document.getElementById('closeSurprise');
const merrywrap = document.getElementById('merrywrap');

// Delay (ms) before advancing to each next step.
const STEP_DELAYS = [2000, 2000, 1000, 1000];
const FINAL_STEP = 4;

// --- Surprise overlay open / close ---
surpriseBtn.addEventListener('click', () => overlay.classList.add('active'));
closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

// --- Box unwrapping animation ---
const box = merrywrap.querySelector('.giftbox');
let step = 1;

function advanceStep() {
  merrywrap.className = `merrywrap step-${step}`;

  if (step === FINAL_STEP) {
    reveal();
    return;
  }

  setTimeout(advanceStep, STEP_DELAYS[step - 1]);
  step++;
}

function startUnwrap() {
  box.removeEventListener('click', startUnwrap);
  advanceStep();
}

box.addEventListener('click', startUnwrap);

// Final reveal: clear the wrapping, bring the gift model forward, fire the fireworks.
function reveal() {
  merrywrap.style.backgroundColor = 'transparent';

  const giftModel = document.getElementById('giftModel');
  if (giftModel) giftModel.style.zIndex = 20;

  startFireworks();
}
