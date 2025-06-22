alert("hi! let's get it done :) ")

const startingMinutes = 25;
let time = startingMinutes * 60; // seconds; let bc we want to change it
let timerId = null;
const button = document.getElementById("toggle-button");

const countdownElem = document.getElementById("countdown");

function updateTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds; // to get rid of times like 10:0

  countdownElem.innerHTML = `${minutes}:${seconds}`;
  time--;
}

button.addEventListener("click", () => {
  if (timerId === null) {
    // Start the timer
    timerId = setInterval(updateTimer, 1000); // update every second
    button.textContent = "Stop";
  } else {
    // Stop the timer
    clearInterval(timerId);
    timerId = null;
    button.textContent = "Start";
  }
});
