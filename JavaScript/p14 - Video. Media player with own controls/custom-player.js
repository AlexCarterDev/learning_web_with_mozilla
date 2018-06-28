var media = document.querySelector('video');
var controls = document.querySelector('.controls');

var play = document.querySelector('.play');
var stop = document.querySelector('.stop');
var rwd = document.querySelector('.rwd');
var fwd = document.querySelector('.fwd');

var timerWrapper = document.querySelector('.timer');
var timer = document.querySelector('.timer span');
var timerBar = document.querySelector('.timer div');

var intervalFwd;
var intervalRwd;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTES = 60;
const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTES;

media.removeAttribute('controls');
controls.style.visibility = 'visible';

play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

media.addEventListener('timeupdate', setTime);

timerWrapper.onclick = function(e) {
  var domRect = timerWrapper.getBoundingClientRect();
  var relativeX = e.x - domRect.x;
  var width = domRect.width;
  var proportion = relativeX / width;
  var newTime = proportion * media.duration;

  media.currentTime = newTime;
}

test_convertSecondsToTime_10000();
test_convertSecondsToTime_1000();

function test_convertSecondsToTime_1000() {
  var time = convertSecondsToTime(1000);
  console.assert(time.hours === 0);
  console.assert(time.minutes === 16);
  console.assert(time.seconds === 40);
}

function test_convertSecondsToTime_10000() {
  var time = convertSecondsToTime(10000);
  console.assert(time.hours === 2);
  console.assert(time.minutes === 46);
  console.assert(time.seconds === 40);
}

function stopMedia() {
  mediaStopForward();
  mediaStopBackward();
  mediaPause();
  media.currentTime = 0;
}

function mediaPlay() {
  play.setAttribute('data-icon', 'u');
  media.play();
}

function mediaPause() {
  play.setAttribute('data-icon', 'P');
  media.pause();
}

function mediaStopForward() {
  fwd.classList.remove('active');
  // cancels a timed, repeating action which was previously established
  // by a call to setInterval().
  clearInterval(intervalFwd);
  intervalFwd = false;
}

function mediaStopBackward() {
  rwd.classList.remove('active');
  clearInterval(intervalRwd);
  intervalRwd = false;
}

function playPauseMedia() {
  if (media.paused) {
    mediaStopForward();
    mediaStopBackward();
    mediaPlay();
  } else {
    mediaPause();
  }
}

function mediaBackward() {
  mediaStopForward();

  if (rwd.classList.contains('active')) {
    mediaStopBackward();
    mediaPlay();
  } else {
    rwd.classList.add('active');
    mediaPause();
    // repeatedly calls a function or executes a code snippet,
    // with a fixed time delay between each call.
    // Returned intervalID. This value can be passed to
    // WindowOrWorkerGlobalScope.clearInterval() to cancel the timeout.
    intervalRwd = setInterval(windBackward, 400);
  }
}

function mediaForward() {
  mediaStopBackward();

  if (fwd.classList.contains('active')) {
    mediaStopForward();
    mediaPlay();
  } else {
    fwd.classList.add('active');
    mediaPause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
  if (media.currentTime <= 3) {
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward() {
  if (media.currentTime >= media.duration - 3) {
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

function convertSecondsToTime(s) {
  var time = { };

  time.hours = Math.floor(s / SECONDS_IN_HOUR);
  time.minutes = Math.floor((s - time.hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTES);
  time.seconds = Math.floor(s - (time.minutes * SECONDS_IN_MINUTES + time.hours * SECONDS_IN_HOUR));
  return time;
}

function pad(n) {
  return ('0' + n).slice(-2);
}

function setTime() {
  var time = convertSecondsToTime(media.currentTime);

  var hourValue = pad(time.hours);
  var minuteValue = pad(time.minutes);
  var secondValue = pad(time.seconds);

  var mediaTime = hourValue + ':' + minuteValue + ':' + secondValue;
  timer.textContent = mediaTime;

  var barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = barLength + 'px';
}
