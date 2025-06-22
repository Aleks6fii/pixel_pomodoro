// alert("hi! let's get it done :) ")

const urlParams = new URLSearchParams(window.location.search);
const intervalMinutes = parseInt(urlParams.get('interval'), 10) || 25;
const totalCycles = parseInt(urlParams.get('cycles'), 10) || 1;

let currentCycle = 1;         // "let" bc we want to change these
let time = intervalMinutes * 60;
let timerId = null;
let breakTime = 10;           // break is 10mins for intervals 30 & 40
if (intervalMinutes == 25) {  // for interval 25 it is 5mins
  breakTime = 5;
}

const button = document.getElementById("toggle-button");
const countdownElem = document.getElementById("countdown");   // this is timer itself - eg 23:42
const countCycles = document.getElementById("cycles-count");  // current cycle counter
const infoElem = document.getElementById("info"); // paragraph to show selected options

infoElem.innerHTML = `Interval: ${intervalMinutes}; Cycles: ${totalCycles}`;

function updateTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds; // to get rid of times like 10:0

  countdownElem.innerHTML = `${minutes}:${seconds}`;
  countCycles.innerHTML = `${currentCycle}/${totalCycles}`
  time--;
}
// ------------- old part --------------------------------


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
