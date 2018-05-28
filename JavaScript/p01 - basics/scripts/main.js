/* replace h1 text */
/* The Document method querySelector() returns the first Element within
the document that matches the specified selector, or group of selectors.*/
var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello World!';

/* change image by click */
var myImage = document.querySelector('img');
myImage.onclick = function() {
  var firefoxIconPath = 'images/firefox-icon.png';
  var cityImgPath = 'images/city.jpg';
  var imgSrc = myImage.getAttribute('src');
  if (imgSrc === firefoxIconPath) {
    myImage.setAttribute('src', cityImgPath);
  } else {
    myImage.setAttribute('src', firefoxIconPath);
  }
}
