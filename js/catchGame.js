// "Catch the Petals" mini-game (🧺). Petals fall from the top of an overlay;
// tap them before they reach the bottom. Beat the target score within the time
// limit to reveal a sweet message.

const gameBtn = document.getElementById('catchGameBtn');
const overlay = document.getElementById('gameOverlay');
const closeBtn = document.getElementById('closeGame');
const field = document.getElementById('gameField');
const startBtn = document.getElementById('startGame');
const scoreEl = document.getElementById('gameScore');
const timeEl = document.getElementById('gameTime');
const resultEl = document.getElementById('gameResult');

const GAME_SECONDS = 30;
const SPAWN_MS = 480;
const PETAL_EMOJIS = ['🌸', '🌷', '💮', '🌺'];

let score = 0;
let timeLeft = GAME_SECONDS;
let spawnTimer = null;
let countdownTimer = null;
let playing = false;

const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function spawnPetal() {
  const petal = document.createElement('div');
  petal.className = 'game-petal';
  petal.textContent = pick(PETAL_EMOJIS);
  petal.style.left = rand(2, 92) + 'vw';
  petal.style.fontSize = rand(26, 42) + 'px';
  petal.style.setProperty('--drift', rand(-60, 60) + 'px');
  petal.style.setProperty('--spin', rand(-360, 360) + 'deg');
  petal.style.animationDuration = rand(3, 5) + 's';

  // Removed when it either falls off-screen or finishes its caught-pop.
  petal.addEventListener('animationend', () => petal.remove());

  petal.addEventListener('pointerdown', () => {
    if (!playing || petal.classList.contains('caught')) return;
    petal.classList.add('caught');
    score++;
    scoreEl.textContent = String(score);
  });

  field.appendChild(petal);
}

function stopTimers() {
  if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
}

function startGame() {
  if (playing) return;
  playing = true;
  score = 0;
  timeLeft = GAME_SECONDS;
  scoreEl.textContent = '0';
  timeEl.textContent = String(GAME_SECONDS);
  resultEl.textContent = '';
  startBtn.style.display = 'none';
  field.innerHTML = '';

  spawnTimer = setInterval(spawnPetal, SPAWN_MS);
  countdownTimer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = String(Math.max(0, timeLeft));
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  playing = false;
  stopTimers();
  startBtn.style.display = 'inline-block';
  startBtn.textContent = 'Play again';
}

function openGame() {
  overlay.classList.add('active');
  // Reset to a fresh "Start" state each time it's opened.
  playing = false;
  stopTimers();
  score = 0;
  timeLeft = GAME_SECONDS;
  scoreEl.textContent = '0';
  timeEl.textContent = String(GAME_SECONDS);
  resultEl.textContent = '';
  startBtn.style.display = 'inline-block';
  startBtn.textContent = 'Start';
  field.innerHTML = '';
}

function closeGame() {
  playing = false;
  stopTimers();
  overlay.classList.remove('active');
}

gameBtn.addEventListener('click', openGame);
closeBtn.addEventListener('click', closeGame);
startBtn.addEventListener('click', startGame);
