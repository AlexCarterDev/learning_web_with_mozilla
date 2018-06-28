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

media.removeAttribute('controls');
controls.style.visibility = 'visible';

play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

media.addEventListener('timeupdate', setTime);

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

function setTime() {
  var minutes = Math.floor(media.currentTime / 60);
  var seconds = Math.floor(media.currentTime - minutes * 60);

  var minuteValue;
  var secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  var mediaTime = minuteValue + ':' + secondValue;
  timer.textContent = mediaTime;

  var barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = barLength + 'px';
}
