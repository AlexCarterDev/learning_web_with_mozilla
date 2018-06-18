// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function EvilCircle(x, y, color, size, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = color;
  this.size = size;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}
EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}
EvilCircle.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e) {
    if (e.keyCode === 65) { // a
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) { // d
      _this.x += _this.velX;
    } else if (e.keyCode === 87) { // w
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) { // s
      _this.y += _this.velY;
    }
  }
}
EvilCircle.prototype.collisionDetect = function() {
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      var dx = this.x - balls[i].x;
      var dy = this.y - balls[i].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[i].size) {
        balls[i].exists = false;
        ballCount--;
      }
    }
  }
}

function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
Ball.prototype.update = function() {
  var velCoeff = 0.1;

  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX * velCoeff;
  this.y += this.velY * velCoeff;
}
Ball.prototype.collisionDetect = function() {
  for (var i = 0; i < balls.length; i++) {
    if (!(this === balls[i])) {
      var dx = this.x - balls[i].x;
      var dy = this.y - balls[i].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (balls[i].exists & (distance < this.size + balls[i].size)) {
        balls[i].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

var balls = [];
var evilCircle;
var ballCount = 0;
var lastBallCount = 0;
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, .3)';
  ctx.fillRect(0, 0, width, height);

  if (typeof evilCircle === 'undefined') {
    evilCircle = new EvilCircle(width/2, height/2, 'white', 10, true);
    evilCircle.setControls();
  }

  while(balls.length < 40) {
    var size = random(5,10);
    var ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-70,70),
      random(-70,70),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size,
      true
    );
    balls.push(ball);
    ballCount++;
  }

  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();
  }

  if (ballCount != lastBallCount) {
    score.textContent = 'Ball count: ' + ballCount;
  }
  lastBallCount = ballCount;

  requestAnimationFrame(loop);
}

var score = document.querySelector('p');

loop();
