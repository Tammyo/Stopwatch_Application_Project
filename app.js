// DECLARING VARIABLES
let seconds, minutes, hours;
seconds = 0;
minutes = 0;
hours = 0;

let intervalId = null;
let startTimestamp = null;
let elapsedBefore = 0;

// STORING ELEMENTS TO VARIABLE
const startBtn = document.querySelector(".btn--start");
const pauseBtn = document.querySelector(".btn--pause");
const resetBtn = document.querySelector(".btn--reset");

const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondsEl = document.querySelector(".seconds");
const millisecondsEl = document.querySelector(".milliseconds");

// FUNCTIONS

// Function for the double digit
function numberPad(n) {
  return String(n).padStart(2, "0");
}

// Starting of the stopwatch
function startStopwatch() {
  if (intervalId !== null) return; // already running
  // record when this run started
  startTimestamp = performance.now();

  // update UI frequently
  intervalId = setInterval(() => {
    const now = performance.now();
    const totalElapsed = elapsedBefore + (now - startTimestamp); // milliseconds

    const totalSeconds = Math.floor(totalElapsed / 1000);
    const ms = Math.floor(totalElapsed % 1000); // 0..999

    seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    minutes = totalMinutes % 60;
    hours = Math.floor(totalMinutes / 60);

    updateDisplay(ms);
  }, 50);

  // disable start button while running
  startBtn.disabled = true;
}

// Pause Stopwatch function
function pauseStopwatch() {
  if (intervalId === null) return; // not running
  // save elapsed time up to this pause time
  const now = performance.now();
  elapsedBefore += now - startTimestamp;

  clearInterval(intervalId);
  intervalId = null;
  startTimestamp = null;
  startBtn.disabled = false;
  startBtn.textContent = "Resume";
}

// Reset stopwatch function
function resetStopwatch() {
  pauseStopwatch();
  elapsedBefore = 0;
  startTimestamp = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  startBtn.textContent = "Start";
  updateDisplay(0);
}

// Update UI function
function updateDisplay(ms = 0) {
  hourEl.textContent = numberPad(hours);
  minuteEl.textContent = numberPad(minutes);
  secondsEl.textContent = numberPad(seconds);
  millisecondsEl.textContent = String(ms).padStart(3, "0");
}
updateDisplay(0);

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
