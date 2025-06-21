//your code here
//your code here
document.addEventListener('DOMContentLoaded', function() {
  const imageContainer = document.getElementById('image-container');
  const resetBtn = document.getElementById('reset');
  const verifyBtn = document.getElementById('verify');
  const message = document.getElementById('h');
  const resultPara = document.getElementById('para');
  
  let selectedImages = [];
  let duplicateIndex = -1;
  let images = [];
  
  // Initialize the game
  function initGame() {
    selectedImages = [];
    resultPara.textContent = '';
    verifyBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    message.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
    
    // Create array of 5 unique images + 1 duplicate
    const uniqueImages = ['img1', 'img2', 'img3', 'img4', 'img5'];
    duplicateIndex = Math.floor(Math.random() * 5);
    images = [...uniqueImages, uniqueImages[duplicateIndex]];
    
    // Shuffle the images
    shuffleArray(images);
    
    // Render images
    renderImages();
  }
  
  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Render images to DOM
  function renderImages() {
    imageContainer.innerHTML = '';
    images.forEach((imgClass, index) => {
      const img = document.createElement('img');
      img.className = imgClass;
      img.dataset.index = index;
      img.addEventListener('click', handleImageClick);
      imageContainer.appendChild(img);
    });
  }
  
  // Handle image click
  function handleImageClick(e) {
    const clickedIndex = parseInt(e.target.dataset.index);
    
    // Don't allow selecting the same image twice
    if (selectedImages.includes(clickedIndex)) {
      return;
    }
    
    // Add to selected images
    selectedImages.push(clickedIndex);
    e.target.classList.add('selected');
    
    // Show reset button
    resetBtn.style.display = 'inline-block';
    
    // Show verify button if exactly 2 images selected
    if (selectedImages.length === 2) {
      verifyBtn.style.display = 'inline-block';
    } else if (selectedImages.length > 2) {
      verifyBtn.style.display = 'none';
    }
  }
  
  // Reset button handler
  resetBtn.addEventListener('click', function() {
    // Remove selected class from all images
    document.querySelectorAll('img').forEach(img => {
      img.classList.remove('selected');
    });
    initGame();
  });
  
  // Verify button handler
  verifyBtn.addEventListener('click', function() {
    verifyBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    
    // Check if selected images are the same
    const img1Class = images[selectedImages[0]].split(' ')[0];
    const img2Class = images[selectedImages[1]].split(' ')[0];
    
    if (img1Class === img2Class) {
      resultPara.textContent = 'You are a human. Congratulations!';
    } else {
      resultPara.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
  });
  
  // Initialize the game on page load
  initGame();
});