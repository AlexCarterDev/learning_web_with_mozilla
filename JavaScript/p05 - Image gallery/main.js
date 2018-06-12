var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (var i = 0; i < 5; i++) {
  var imgPath = 'images/pic' + (i + 1) + '.jpg';
  var newImage = document.createElement('img');
  newImage.setAttribute('src', imgPath);
  thumbBar.appendChild(newImage);

  newImage.onclick = function(e) {
    var src = e.target.getAttribute('src');
    updateDisplayedImg(src);
  };
}

function updateDisplayedImg(src) {
  displayedImage.src = src;
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function() {
  if (btn.getAttribute('class') === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
}
