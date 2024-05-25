let startTime;
let running = false;
let interval;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapTimesDiv = document.getElementById('lapTimes');

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startStop() {
  if (!running) {
    startStopBtn.textContent = 'Stop';
    startTime = Date.now() - (parseInt(display.textContent.split(':')[0]) * 3600 + parseInt(display.textContent.split(':')[1]) * 60 + parseInt(display.textContent.split(':')[2])) * 1000;
    interval = setInterval(updateDisplay, 1000);
  } else {
    startStopBtn.textContent = 'Start';
    clearInterval(interval);
  }
  running = !running;
}

function reset() {
  clearInterval(interval);
  running = false;
  display.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  lapTimesDiv.innerHTML = '';
}

function updateDisplay() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  display.textContent = formatTime(elapsedTime);
}

function lap() {
  const lapTime = display.textContent;
  const lapItem = document.createElement('div');
  lapItem.textContent = `Lap ${lapTimesDiv.childElementCount + 1}: ${lapTime}`;
  lapTimesDiv.appendChild(lapItem);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
