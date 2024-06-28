const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

let startTime;
let elapsedTime = 0;
let intervalId;
let lapTimes = []; // Array to store lap times

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
  startTime = Date.now();
  intervalId = setInterval(updateTime, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopTimer() {
  clearInterval(intervalId);
  elapsedTime += Date.now() - startTime;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  display.textContent = '00:00:00:00';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapTimes = [];
  updateLapsDisplay();
}

function recordLap() {
  const lapTime = Date.now() - startTime;
  lapTimes.push(lapTime);
  updateLapsDisplay();
}

function updateTime() {
  const currentTime = elapsedTime + Date.now() - startTime;
  const hours = Math.floor((currentTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
  const seconds = Math.floor((currentTime / 1000) % 60);
  const milliseconds = Math.floor((currentTime / 10) % 100);

  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function updateLapsDisplay() {
  const lapsContainer = document.querySelector('.laps');
  lapsContainer.innerHTML = ''; // Clear previous lap times

  if (lapTimes.length > 0) {
    lapTimes.forEach((lapTime, index) => {
      const minutes = Math.floor((lapTime / (1000 * 60)) % 60);
      const seconds = Math.floor((lapTime / 1000) % 60);
      const milliseconds = Math.floor((lapTime / 10) % 100);

      const lapText = `Lap ${index + 1}: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
      const lapItem = document.createElement('li');
      lapItem.textContent = lapText;
      lapsContainer.appendChild(lapItem);
    });
  } else {
    lapsContainer.innerHTML = '<li>No laps recorded</li>';
  }
}
