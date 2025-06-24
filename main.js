// // alert("hi! let's get it done :) ")

const urlParams = new URLSearchParams(window.location.search);
const totalCycles = parseInt(urlParams.get('cycles'), 10) || 1;
const intervalMinutes = parseInt(urlParams.get('interval'), 10) || 25;
// const intervalMinutes = 2; // DEBUG  
let breakTime = 10 * 60; // break is 10 mins
if (intervalMinutes === 25) breakTime = 5 * 60; // or 5 min for 25min interval

let currentCycle = 1;
let isBreak = false;
let time = intervalMinutes * 60;
let timerId = null;

const button = document.getElementById("toggle-button");
const countdownElem = document.getElementById("countdown");
const countCycles = document.getElementById("cycles-count");
const infoElem = document.getElementById("info");
const headerElem = document.getElementById("timer-header")

infoElem.innerHTML = `Interval: ${intervalMinutes}; Cycles: ${totalCycles}`;
headerElem.innerHTML = `Do not disturb 📝`


function updateTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownElem.innerHTML = `${minutes}:${seconds}`;
  countCycles.innerHTML = `${currentCycle}/${totalCycles}`;

  time--;

  if (time < 0) {
    clearInterval(timerId);
    timerId = null;

    if (!isBreak) { // if work interval is finished
      if (currentCycle >= totalCycles) {
        headerElem.innerHTML = `🎉 Your session is finished! You are amazing 😸`;
        button.disabled = true;
        return;
      }
      // start break
      isBreak = true; 
      time = breakTime;
      headerElem.innerHTML = `Break time! ☕️`;

      startTimer();
    } else {  // if break is finished
      headerElem.innerHTML = `Do not disturb 📝`
      isBreak = false;
      currentCycle++;
      time = intervalMinutes * 60;
      startTimer();
    }
  }
}

function startTimer() {
  updateTimer(); // show initial time immediately
  timerId = setInterval(updateTimer, 10);
  button.textContent = "Stop";
}

button.addEventListener("click", () => {
  if (timerId === null) {
    startTimer();
  } else {
    clearInterval(timerId);
    timerId = null;
    button.textContent = "Start";
  }
});

