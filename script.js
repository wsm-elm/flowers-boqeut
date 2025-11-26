const btn = document.getElementById('openBtn');
const wrapper = document.querySelector('.wrapper');
const smallLetter = document.getElementById('smallLetter');
const showBtn = document.getElementById('showModelBtn');

// Overlays
const flowerOverlay = document.getElementById('overlay');
const letterOverlay = document.getElementById('letterOverlay');

// Close buttons
const closeModelBtn = document.getElementById('closeModel');
const closeLetterBtn = document.getElementById('closeLetter');

// Flower Navigation
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flowerModel = document.getElementById('flowerModel');
const counter = document.getElementById('counter');

let isOpen = false;

const flowerModels = [
  'flowers.glb',
  'generic_tulip_flower.glb',
  'lilies.glb',
  'bouquet_of_flowers.glb',
  'bouquet_roses_blanches.glb'
];
let currentFlowerIndex = 0;

function updateCounter() {
  counter.textContent = `${currentFlowerIndex + 1} / ${flowerModels.length}`;
}

function changeFlower(index) {
  currentFlowerIndex = index;
  flowerModel.src = flowerModels[currentFlowerIndex];
  updateCounter();
}

prevBtn.addEventListener('click', () => {
  currentFlowerIndex = (currentFlowerIndex - 1 + flowerModels.length) % flowerModels.length;
  changeFlower(currentFlowerIndex);
});

nextBtn.addEventListener('click', () => {
  currentFlowerIndex = (currentFlowerIndex + 1) % flowerModels.length;
  changeFlower(currentFlowerIndex);
});

// --- ENVELOPE OPEN/CLOSE LOGIC ---
btn.addEventListener('click', () => {
  wrapper.classList.toggle('open');
  isOpen = !isOpen;
  btn.textContent = isOpen ? 'Close Letter' : 'Open Letter';
  showBtn.style.display = isOpen ? 'block' : 'none';
  
  // Allow interaction with the letter only when open
  if (isOpen) {
    smallLetter.style.pointerEvents = "auto";
  } else {
    smallLetter.style.pointerEvents = "none";
  }
});

// --- FLOWER OVERLAY LOGIC ---
showBtn.addEventListener('click', () => {
  flowerOverlay.classList.add('active');
  updateCounter();
});

closeModelBtn.addEventListener('click', () => {
  flowerOverlay.classList.remove('active');
});

// --- BIG LETTER OVERLAY LOGIC ---
smallLetter.addEventListener('click', () => {
    if (isOpen) {
        letterOverlay.classList.add('active');
    }
});

closeLetterBtn.addEventListener('click', () => {
    letterOverlay.classList.remove('active');
});

// Optional: Close letter if clicking outside the paper
letterOverlay.addEventListener('click', (e) => {
    if (e.target === letterOverlay) {
        letterOverlay.classList.remove('active');
    }
});


// --- COUNTDOWN LOGIC ---
const countdownEl = document.getElementById('countdown');
const endDate = new Date("June 30, 2026 23:59:59").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    countdownEl.textContent = "🎉 Time's up! 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `⏳ <b>${days}</b>d : <b>${hours}</b>h : <b>${minutes}</b>m : <b>${seconds}</b>s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();