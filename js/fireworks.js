// Canvas fireworks engine. Adapted from the classic requestAnimationFrame
// fireworks demo. Call `startFireworks()` to kick off the animation loop on the
// #canvas element; fireworks then auto-launch (and follow the mouse while held).

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

const fireworks = [];
const particles = [];
let hue = 120;

// Rate limiters: throttle launches while the mouse is down, and time the auto-launches.
const LIMITER_TOTAL = 5;
let limiterTick = 0;
const TIMER_TOTAL = 80;
let timerTick = 0;

let mousedown = false;
let mx;
let my;
let running = false;

const requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  ((callback) => window.setTimeout(callback, 1000 / 60));

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateDistance(p1x, p1y, p2x, p2y) {
  const xDistance = p1x - p2x;
  const yDistance = p1y - p2y;
  return Math.sqrt(xDistance ** 2 + yDistance ** 2);
}

// A firework travels from a start point toward a target, then explodes.
function Firework(sx, sy, tx, ty) {
  this.x = sx;
  this.y = sy;
  this.sx = sx;
  this.sy = sy;
  this.tx = tx;
  this.ty = ty;
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;
  // Past coordinates, used to draw a trail.
  this.coordinates = [];
  this.coordinateCount = 3;
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = 2;
  this.acceleration = 1.05;
  this.brightness = random(50, 70);
  this.targetRadius = 1;
}

Firework.prototype.update = function (index) {
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);

  // Pulse the target indicator radius.
  if (this.targetRadius < 8) this.targetRadius += 0.3;
  else this.targetRadius = 1;

  this.speed *= this.acceleration;

  const vx = Math.cos(this.angle) * this.speed;
  const vy = Math.sin(this.angle) * this.speed;
  this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

  // Reached the target → explode into particles and remove the firework.
  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty);
    fireworks.splice(index, 1);
  } else {
    this.x += vx;
    this.y += vy;
  }
};

Firework.prototype.draw = function () {
  ctx.beginPath();
  const last = this.coordinates[this.coordinates.length - 1];
  ctx.moveTo(last[0], last[1]);
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
  ctx.stroke();
};

// A particle is one spark of an explosion; it drifts, slows, and fades out.
function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.coordinates = [];
  this.coordinateCount = 5;
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);
  this.friction = 0.95;
  this.gravity = 1;
  this.hue = random(hue - 20, hue + 20);
  this.brightness = random(50, 80);
  this.alpha = 1;
  this.decay = random(0.015, 0.03);
}

Particle.prototype.update = function (index) {
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);
  this.speed *= this.friction;
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  this.alpha -= this.decay;

  if (this.alpha <= this.decay) particles.splice(index, 1);
};

Particle.prototype.draw = function () {
  ctx.beginPath();
  const last = this.coordinates[this.coordinates.length - 1];
  ctx.moveTo(last[0], last[1]);
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
  ctx.stroke();
};

function createParticles(x, y) {
  let particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y));
  }
}

// Main animation loop — runs endlessly once started.
function loop() {
  requestAnimFrame(loop);

  hue += 0.5;

  // Trailing effect: fade the previous frame instead of clearing it outright.
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';

  let i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  let j = particles.length;
  while (j--) {
    particles[j].draw();
    particles[j].update(j);
  }

  // Auto-launch from the bottom-middle toward a random point in the top half.
  if (timerTick >= TIMER_TOTAL) {
    if (!mousedown) {
      fireworks.push(new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  // Launch toward the mouse while held, rate-limited.
  if (limiterTick >= LIMITER_TOTAL) {
    if (mousedown) {
      fireworks.push(new Firework(cw / 2, ch, mx, my));
      limiterTick = 0;
    }
  } else {
    limiterTick++;
  }
}

// Keep the canvas sized to the window and track mouse input.
window.addEventListener('resize', () => {
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas.width = cw;
  canvas.height = ch;
});

canvas.addEventListener('mousedown', (e) => {
  e.preventDefault();
  mousedown = true;
  mx = e.pageX - canvas.offsetLeft;
  my = e.pageY - canvas.offsetTop;
});

canvas.addEventListener('mousemove', (e) => {
  e.preventDefault();
  mx = e.pageX - canvas.offsetLeft;
  my = e.pageY - canvas.offsetTop;
});

canvas.addEventListener('mouseup', (e) => {
  e.preventDefault();
  mousedown = false;
});

// Start the animation loop (no-op if already running).
export function startFireworks() {
  if (running) return;
  running = true;
  loop();
}
