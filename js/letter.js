// Envelope + letter. Opening the envelope reveals the small letter; clicking the
// small letter (while open) shows the full letter in an overlay.

const openBtn = document.getElementById('openBtn');
const smallLetter = document.getElementById('smallLetter');
const wrapper = document.querySelector('.wrapper');
const letterOverlay = document.getElementById('letterOverlay');
const closeLetterBtn = document.getElementById('closeLetter');

let isOpen = false;

// Open / close the envelope.
openBtn.addEventListener('click', () => {
  isOpen = !isOpen;
  wrapper.classList.toggle('open', isOpen);
  openBtn.textContent = isOpen ? 'Close Letter' : 'Open Letter';
  smallLetter.style.pointerEvents = isOpen ? 'auto' : 'none';
});

// Expand the small letter into the full-screen overlay.
smallLetter.addEventListener('click', () => {
  if (isOpen) letterOverlay.classList.add('active');
});

closeLetterBtn.addEventListener('click', () => {
  letterOverlay.classList.remove('active');
});

// Click the dimmed backdrop to dismiss.
letterOverlay.addEventListener('click', (e) => {
  if (e.target === letterOverlay) letterOverlay.classList.remove('active');
});
