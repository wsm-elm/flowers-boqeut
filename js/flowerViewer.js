// Flower viewer (💐) — the overlay that shows 3D flower models. Handles opening/
// closing the overlay, prev/next navigation, and the "Wissem's Collection" garden
// panel (🌷) that filters models by category.

const MODELS_DIR = 'assets/models';

// Flower models grouped by category. `all` is the full gallery.
const flowerCategories = {
  tulip:         [`${MODELS_DIR}/tulips.glb`, `${MODELS_DIR}/generic_tulip_flower.glb`],
  lily:          [`${MODELS_DIR}/bunga_sabun_lily.glb`, `${MODELS_DIR}/lilies.glb`],
  rose:          [`${MODELS_DIR}/bouquet_of_flowers.glb`, `${MODELS_DIR}/bouquet_roses_blanches.glb`],
  bouquet:       [`${MODELS_DIR}/flowers_in_vase.glb`, `${MODELS_DIR}/flowers.glb`],
  echinopsis:    [`${MODELS_DIR}/flowerscopy.glb`],
  chrysanthemum: [`${MODELS_DIR}/flower_bouquet.glb`],
  all: [
    `${MODELS_DIR}/bunga_sabun_lily.glb`,
    `${MODELS_DIR}/flower_bouquet.glb`,
    `${MODELS_DIR}/flowerscopy.glb`,
    `${MODELS_DIR}/tulips.glb`,
    `${MODELS_DIR}/flowers_in_vase.glb`,
    `${MODELS_DIR}/flowers.glb`,
    `${MODELS_DIR}/generic_tulip_flower.glb`,
    `${MODELS_DIR}/lilies.glb`,
    `${MODELS_DIR}/bouquet_of_flowers.glb`,
    `${MODELS_DIR}/bouquet_roses_blanches.glb`,
  ],
};

// Elements
const flowerOverlay = document.getElementById('overlay');
const flowerModel = document.getElementById('flowerModel');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const showBtn = document.getElementById('showModelBtn');
const showDuckBtn = document.getElementById('showDuckBtn');
const closeModelBtn = document.getElementById('closeModel');
const dayNightBtn = document.getElementById('dayNightBtn');
const gardenBtn = document.getElementById('Garden');
const gardenPanel = document.getElementById('gardenPanel');
const colorPanel = document.getElementById('colorPanel');
const flowerOptions = document.querySelectorAll('.flower-option');

// State
let currentFlowerModels = flowerCategories.all;
let currentFlowerIndex = 0;

function updateCounter() {
  if (counter) {
    counter.textContent = `${currentFlowerIndex + 1} / ${currentFlowerModels.length}`;
  }
}

function changeFlower(index) {
  currentFlowerIndex = index;
  if (flowerModel) flowerModel.src = currentFlowerModels[currentFlowerIndex];
  updateCounter();
}

function selectCategory(category) {
  if (!flowerCategories[category]) return;
  currentFlowerModels = flowerCategories[category];
  currentFlowerIndex = 0;
  changeFlower(0);
}

// --- Navigation arrows ---
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    const last = currentFlowerModels.length;
    changeFlower((currentFlowerIndex - 1 + last) % last);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    changeFlower((currentFlowerIndex + 1) % currentFlowerModels.length);
  });
}

// --- Overlay open / close ---
function openFlowerOverlay() {
  flowerOverlay.classList.add('active');
  updateCounter();
  dayNightBtn.style.display = 'block';
  gardenBtn.style.display = 'block';
}

// 💐 — open the full flower gallery.
showBtn.addEventListener('click', () => {
  selectCategory('all');
  openFlowerOverlay();
});

// 🦆 — open the same centered viewer showing just the duck.
if (showDuckBtn) {
  showDuckBtn.addEventListener('click', () => {
    currentFlowerModels = [`${MODELS_DIR}/duck.glb`];
    changeFlower(0);
    openFlowerOverlay();
  });
}

closeModelBtn.addEventListener('click', () => {
  flowerOverlay.classList.remove('active');
  dayNightBtn.style.display = 'none';
  gardenBtn.style.display = 'none';
});

// --- Garden category panel ---
if (gardenBtn) {
  gardenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    gardenPanel.classList.toggle('active');
    // Don't show the color panel and garden panel at the same time.
    if (colorPanel) colorPanel.classList.remove('active');
  });
}

flowerOptions.forEach((option) => {
  option.addEventListener('click', () => {
    flowerOptions.forEach((opt) => opt.classList.remove('active'));
    option.classList.add('active');
    // The category name is the second class on the element (e.g. "flower-option tulip").
    selectCategory(option.classList[1]);
  });
});

// Close the garden panel when clicking outside of it.
document.addEventListener('click', (e) => {
  if (gardenPanel && !gardenPanel.contains(e.target) && e.target !== gardenBtn) {
    gardenPanel.classList.remove('active');
  }
});

// --- AR "Live View" ---
// The button is pinned to the bottom of the overlay (not slotted into the
// viewer), so clicking it launches AR manually with activateAR(). AR uses the
// model's current src, so whatever flower is on screen is the one shown in AR.
// It's only usable on AR-capable devices (Android over HTTPS), so reveal the
// button only when the viewer reports it can actually start a session.
const arButton = document.getElementById('arButton');
if (arButton && flowerModel) {
  const refreshArButton = () => {
    arButton.style.display = flowerModel.canActivateAR ? 'flex' : 'none';
  };
  flowerModel.addEventListener('load', refreshArButton);
  flowerModel.addEventListener('ar-status', refreshArButton);
  // canActivateAR can resolve a moment after load, so re-check shortly after.
  refreshArButton();
  setTimeout(refreshArButton, 1200);

  arButton.addEventListener('click', () => flowerModel.activateAR());
}
