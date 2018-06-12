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
}


/* Wiring up the Darken/Lighten button */
