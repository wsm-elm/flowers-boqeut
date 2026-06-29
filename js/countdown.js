// Countdown timer shown at the top of the page.
// Counts down to the configured end date and updates once per second.

const countdownEl = document.getElementById('countdown');
const END_DATE = new Date('June 30, 2026 23:59:59').getTime();

function updateCountdown() {
  if (!countdownEl) return;

  const distance = END_DATE - Date.now();

  if (distance <= 0) {
    countdownEl.textContent = "💌 The letter is ready 💌";
    document.body.classList.add('letter-unlocked');
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML =
    `⏳ <b>${days}</b>d : <b>${hours}</b>h : <b>${minutes}</b>m : <b>${seconds}</b>s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
