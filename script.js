// Color palette - shades of light purple
    const purpleShades = [
  { name: 'Iris', colors: { 
      main: '#6f42c1', 
      light: '#8c63d6', 
      lighter: '#a784e8', 
      lightest: '#c7b3f5' 
  }},
  { name: 'Plum', colors: { 
      main: '#8e4585', 
      light: '#a8689f', 
      lighter: '#c28abb', 
      lightest: '#dfbfd9' 
  }},
  { name: 'Grape', colors: { 
      main: '#5d3fd3', 
      light: '#7d66e0', 
      lighter: '#9c8dec', 
      lightest: '#c0b6f7' 
  }},
  { name: 'Violet Mist', colors: { 
      main: '#a29acb', 
      light: '#b9b3dc', 
      lighter: '#d2cdea', 
      lightest: '#e5e0f5' 
  }},
  { name: 'Royal Purple', colors: { 
      main: '#4b0082', 
      light: '#69269b', 
      lighter: '#8750b4', 
      lightest: '#b389d3' 
  }},
  { name: 'Lilac Smoke', colors: { 
      main: '#b8a9c9', 
      light: '#d0c3dd', 
      lighter: '#e3d9eb', 
      lightest: '#f3edf7' 
  }},
  { name: 'Moon Purple', colors: { 
      main: '#9a4dff', 
      light: '#b57aff', 
      lighter: '#d0aaff', 
      lightest: '#e6d4ff' 
  }},
  { name: 'Magenta Bloom', colors: { 
      main: '#c61aff', 
      light: '#d657ff', 
      lighter: '#e38aff', 
      lightest: '#f0c4ff' 
  }},
  { name: 'Dusty Lavender', colors: { 
      main: '#a991ba', 
      light: '#c0a9cf', 
      lighter: '#d9c6e3', 
      lightest: '#efe4f3' 
  }}
];

    const defaultColors = purpleShades[0].colors;

    // Elements
    const wrapper = document.querySelector('.wrapper');
    const lidOne = document.querySelector('.lid.one');
    const lidTwo = document.querySelector('.lid.two');
    const envelope = document.querySelector('.envelope');
    const colorToggle = document.getElementById('colorToggle');
    const colorPanel = document.getElementById('colorPanel');
    const colorOptions = document.getElementById('colorOptions');
    const resetBtn = document.getElementById('resetBtn');
    const btn = document.getElementById('openBtn');
    const smallLetter = document.getElementById('smallLetter');
    const showBtn = document.getElementById('showModelBtn');

    // Overlays
    const flowerOverlay = document.getElementById('overlay');
    const letterOverlay = document.getElementById('letterOverlay');
    const closeModelBtn = document.getElementById('closeModel');
    const closeLetterBtn = document.getElementById('closeLetter');

    // Flower Navigation
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const flowerModel = document.getElementById('flowerModel');
    const counter = document.getElementById('counter');

    let isOpen = false;
    let currentFlowerIndex = 0;

    const flowerModels = [
      'flowers.glb',
      'generic_tulip_flower.glb',
      'lilies.glb',
      'bouquet_of_flowers.glb',
      'bouquet_roses_blanches.glb'
    ];

    // Create color options
    purpleShades.forEach((shade, index) => {
      const option = document.createElement('div');
      option.className = 'color-option';
      option.style.background = `linear-gradient(135deg, ${shade.colors.main}, ${shade.colors.light})`;
      option.dataset.index = index;
      option.title = shade.name;
      
      if (index === 0) option.classList.add('active');
      
      option.addEventListener('click', () => {
        document.querySelectorAll('.color-option').forEach(el => el.classList.remove('active'));
        option.classList.add('active');
        applyColors(shade.colors);
      });
      
      colorOptions.appendChild(option);
    });

    // Toggle color panel
    colorToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      colorPanel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!colorPanel.contains(e.target) && e.target !== colorToggle) {
        colorPanel.classList.remove('active');
      }
    });

    // Prevent panel clicks from closing it
    colorPanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Apply colors function
    function applyColors(colors) {
      wrapper.style.backgroundColor = colors.main;
      lidOne.style.borderTopColor = colors.main;
      lidTwo.style.borderTopColor = colors.light;
      envelope.style.borderRightColor = colors.lighter;
      envelope.style.borderBottomColor = colors.lighter;
      envelope.style.borderLeftColor = colors.lightest;
    }

    // Reset to default
    resetBtn.addEventListener('click', () => {
      applyColors(defaultColors);
      document.querySelectorAll('.color-option').forEach((el, i) => {
        el.classList.toggle('active', i === 0);
      });
    });

    // Flower navigation
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

    // Envelope open/close
    btn.addEventListener('click', () => {
      wrapper.classList.toggle('open');
      isOpen = !isOpen;
      btn.textContent = isOpen ? 'Close Letter' : 'Open Letter';
      showBtn.style.display = isOpen ? 'block' : 'none';
      smallLetter.style.pointerEvents = isOpen ? "auto" : "none";
    });

    // Flower overlay
    showBtn.addEventListener('click', () => {
      flowerOverlay.classList.add('active');
      updateCounter();
    });

    closeModelBtn.addEventListener('click', () => {
      flowerOverlay.classList.remove('active');
    });

    // Letter overlay
    smallLetter.addEventListener('click', () => {
      if (isOpen) {
        letterOverlay.classList.add('active');
      }
    });

    closeLetterBtn.addEventListener('click', () => {
      letterOverlay.classList.remove('active');
    });

    letterOverlay.addEventListener('click', (e) => {
      if (e.target === letterOverlay) {
        letterOverlay.classList.remove('active');
      }
    });

    // Countdown
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
    updateCountdown()

let isNight = false;

// 1. Select the new Sun and Moon models
const sunModel = document.getElementById('sunModel');
const moonModel = document.getElementById('moonModel');

// Connect the button
if (dayNightBtn) {
    setDayMode(); // Set default state

    dayNightBtn.addEventListener('click', () => {
        isNight = !isNight;
        if (isNight) {
            setNightMode();
        } else {
            setDayMode();
        }
    });
}

function setNightMode() {
    // --- Flower Model Lighting ---
    flowerModel.setAttribute('environment-image', 'neutral');
    flowerModel.setAttribute('exposure', '0.5'); // Slightly brighter than 0.4 to see detail
    flowerModel.setAttribute('environment-intensity', '2.5'); // High shine for moonlight
    
    // --- Celestial Swap ---
    // We let CSS handle the movement, but we control model exposure here
    if (sunModel) sunModel.setAttribute('exposure', '0'); 
    if (moonModel) moonModel.setAttribute('exposure', '1.2');

    // --- Visual Effects ---
    flowerOverlay.classList.add('night-mode');
    dayNightBtn.textContent = '☀️';
    
    // --- Star Creation ---
    removeStars(); 
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 2 + 's';
        flowerOverlay.appendChild(star);
    }
}

function setDayMode() {
    // --- Flower Model Lighting ---
    flowerModel.setAttribute('environment-image', 'neutral');
    flowerModel.setAttribute('exposure', '1.2');
    flowerModel.setAttribute('environment-intensity', '1.0');

    // --- Celestial Swap ---
    if (sunModel) sunModel.setAttribute('exposure', '1.5'); // Bright sun
    if (moonModel) moonModel.setAttribute('exposure', '0');

    // --- Visual Effects ---
    flowerOverlay.classList.remove('night-mode');
    dayNightBtn.textContent = '🌙';
    
    // --- Clean up ---
    removeStars();
}

function removeStars() {
    const stars = document.querySelectorAll('.star-particle');
    stars.forEach(s => s.remove());
}