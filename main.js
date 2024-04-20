// Get references to the displayed image, thumbnail bar, button, and overlay
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Array of image filenames and object of alternative texts for each image
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
const alts = {
  'pic1.jpg' : 'human eye',
  'pic2.jpg' : 'wavey object',
  'pic3.jpg' : 'Purple and white flowers',
  'pic4.jpg' : 'Aincient Pharaoh picture',
  'pic5.jpg' : 'moth on a leaf'
}

// Loop over each image
for (const image of images) {
  // Create a new image element and set its source, alternative text, and tabindex
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', alts[image]);
  newImage.setAttribute('tabindex', '0'); 

  // Append the new image to the thumbnail bar
  thumbBar.appendChild(newImage);

  // Add a click event listener to the new image
  newImage.addEventListener('click', e => {
    // When the image is clicked, update the displayed image's source and alternative text
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });

  // Add a keydown event listener to the new image
  newImage.addEventListener('keydown', function (e) {
    // When the Enter key is pressed, update the displayed image's source and alternative text
    if (e.key === 'Enter') {  
      displayedImage.src = e.target.src;
      displayedImage.alt = e.target.alt;
    }
  });
}

// Add a click event listener to the button
btn.addEventListener('click', () => {
  // Get the current class of the button
  const btnClass = btn.getAttribute('class');

  // If the button's class is 'dark'
  if (btnClass === 'dark') {
    // Change the button's class to 'light', its text to 'Lighten', and the overlay's background color to semi-transparent black
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    // Otherwise, change the button's class to 'dark', its text to 'Darken', and the overlay's background color to fully transparent
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
