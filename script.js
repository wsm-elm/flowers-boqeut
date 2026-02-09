
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
      'bouquet_roses_blanches.glb',
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

const surpriseBtn = document.getElementById("Surprise");
  const overlay = document.getElementById("surpriseOverlay");
  const closeBtn = document.getElementById("closeSurprise");

  surpriseBtn.addEventListener("click", () => {
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  // Optional: click outside to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });

const merrywrap = document.getElementById("merrywrap");
const box = merrywrap.querySelector(".giftbox");

let step = 1;
const stepDelays = [1500, 1200];

box.addEventListener("click", openBox);

function openBox() {
  merrywrap.className = "merrywrap step-" + step;
  let giftModel = document.getElementById("giftModel");
  if (step === 2) {
    box.removeEventListener("click", openBox);
    giftModel.style.zIndex = 20; // Ensure the model is above the box
    startFireworks();
    return;
  }

  setTimeout(() => step++, stepDelays[step - 1]);
}

window.requestAnimFrame = function () {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

// now we will setup our basic variables for the demo
var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
// full screen dimensions
cw = window.innerWidth,
ch = window.innerHeight,
// firework collection
fireworks = [],
// particle collection
particles = [],
// starting hue
hue = 120,
// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
limiterTotal = 5,
limiterTick = 0,
// this will time the auto launches of fireworks, one launch per 80 loop ticks
timerTotal = 80,
timerTick = 0,
mousedown = false,
// mouse x coordinate,
mx,
// mouse y coordinate
my;

// set canvas dimensions
canvas.width = cw;
canvas.height = ch;

// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// calculate the distance between two points
function calculateDistance(p1x, p1y, p2x, p2y) {
  var xDistance = p1x - p2x,
  yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// create firework
function Firework(sx, sy, tx, ty) {
  // actual coordinates
  this.x = sx;
  this.y = sy;
  // starting coordinates
  this.sx = sx;
  this.sy = sy;
  // target coordinates
  this.tx = tx;
  this.ty = ty;
  // distance from starting point to target
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;
  // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = [];
  this.coordinateCount = 3;
  // populate initial coordinate collection with the current coordinates
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = 2;
  this.acceleration = 1.05;
  this.brightness = random(50, 70);
  // circle target indicator radius
  this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function (index) {
  // remove last item in coordinates array
  this.coordinates.pop();
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y]);

  // cycle the circle target indicator radius
  if (this.targetRadius < 8) {
    this.targetRadius += 0.3;
  } else {
    this.targetRadius = 1;
  }

  // speed up the firework
  this.speed *= this.acceleration;

  // get the current velocities based on angle and speed
  var vx = Math.cos(this.angle) * this.speed,
  vy = Math.sin(this.angle) * this.speed;
  // how far will the firework have traveled with velocities applied?
  this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

  // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty);
    // remove the firework, use the index passed into the update function to determine which to remove
    fireworks.splice(index, 1);
  } else {
    // target not reached, keep traveling
    this.x += vx;
    this.y += vy;
  }
};

// draw firework
Firework.prototype.draw = function () {
  ctx.beginPath();
  // move to the last tracked coordinate in the set, then draw a line to the current x and y
  ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
  ctx.stroke();

  ctx.beginPath();
  // draw the target for this firework with a pulsing circle
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
  ctx.stroke();
};

// create particle
function Particle(x, y) {
  this.x = x;
  this.y = y;
  // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = [];
  this.coordinateCount = 5;
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  // set a random angle in all possible directions, in radians
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);
  // friction will slow the particle down
  this.friction = 0.95;
  // gravity will be applied and pull the particle down
  this.gravity = 1;
  // set the hue to a random number +-20 of the overall hue variable
  this.hue = random(hue - 20, hue + 20);
  this.brightness = random(50, 80);
  this.alpha = 1;
  // set how fast the particle fades out
  this.decay = random(0.015, 0.03);
}

// update particle
Particle.prototype.update = function (index) {
  // remove last item in coordinates array
  this.coordinates.pop();
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y]);
  // slow down the particle
  this.speed *= this.friction;
  // apply velocity
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  // fade out the particle
  this.alpha -= this.decay;

  // remove the particle once the alpha is low enough, based on the passed in index
  if (this.alpha <= this.decay) {
    particles.splice(index, 1);
  }
};

// draw particle
Particle.prototype.draw = function () {
  ctx.beginPath();
  // move to the last tracked coordinates in the set, then draw a line to the current x and y
  ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
  ctx.stroke();
};

// create particle group/explosion
function createParticles(x, y) {
  // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
  var particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y));
  }
}

// main demo loop
function loop() {
  // this function will run endlessly with requestAnimationFrame
  requestAnimFrame(loop);

  // increase the hue to get different colored fireworks over time
  hue += 0.5;

  // normally, clearRect() would be used to clear the canvas
  // we want to create a trailing effect though
  // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
  ctx.globalCompositeOperation = 'destination-out';
  // decrease the alpha property to create more prominent trails
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, cw, ch);
  // change the composite operation back to our main mode
  // lighter creates bright highlight points as the fireworks and particles overlap each other
  ctx.globalCompositeOperation = 'lighter';

  // loop over each firework, draw it, update it
  var i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  // loop over each particle, draw it, update it
  var i = particles.length;
  while (i--) {
    particles[i].draw();
    particles[i].update(i);
  }

  // launch fireworks automatically to random coordinates, when the mouse isn't down
  if (timerTick >= timerTotal) {
    if (!mousedown) {
      // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
      fireworks.push(new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  // limit the rate at which fireworks get launched when mouse is down
  if (limiterTick >= limiterTotal) {
    if (mousedown) {
      // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
      fireworks.push(new Firework(cw / 2, ch, mx, my));
      limiterTick = 0;
    }
  } else {
    limiterTick++;
  }
}

window.onload = function () {
  var merrywrap = document.getElementById("merrywrap");
  var box = merrywrap.getElementsByClassName("giftbox")[0];
  var step = 1;
  var stepMinutes = [2000, 2000, 1000, 1000];
  function init() {
    box.addEventListener("click", openBox, false);
  }
  function stepClass(step) {
    merrywrap.className = 'merrywrap';
    merrywrap.className = 'merrywrap step-' + step;
  }
  function openBox() {
    if (step === 1) {
      box.removeEventListener("click", openBox, false);
    }
    stepClass(step);
    if (step === 3) {
    }
    if (step === 4) {
      reveal();
      return;
    }
    setTimeout(openBox, stepMinutes[step - 1]);
    step++;
  }

  init();

};

function reveal() {
  document.querySelector('.merrywrap').style.backgroundColor = 'transparent';

  loop();

  var w, h;
  if (window.innerWidth >= 1000) {
    w = 295;h = 185;
  } else
  {
    w = 255;h = 155;
  }

  var ifrm = document.createElement("iframe");
  ifrm.setAttribute("src", "https://www.youtube.com/embed/gbICivOO26U?controls=0&loop=1&autoplay=1");
  //ifrm.style.width = `${w}px`;
  //ifrm.style.height = `${h}px`;
  ifrm.style.border = 'none';
  document.querySelector('#video').appendChild(ifrm);
}



