const sheetWebAppURL = 'https://script.google.com/macros/s/AKfycbyGs-nM9C2ferlXsRDFObmhLafIAsdR6ufCRRJw3ZZ7tvMDaOGineqvdufAq3y-8sE/exec';  // Replace with your deployed URL

// Function to log interaction
function logInteraction(eventType, details) {
    console.log('Interaction to log:', eventType, details);  // Add this

    fetch(sheetWebAppURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventType, details: details }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('Logged successfully:', data))
    .catch(error => console.error('Error logging interaction:', error));
  }
  

// Example: Log when the site is opened
window.onload = function() {
    randomizeStarPositions();  // Randomize star positions
    logInteraction('site_opened', { userAgent: navigator.userAgent });  // Log when the site is opened
};


// Example: Log when a star is clicked
function showMessage(starNumber) {
  // Existing code to show message
  logInteraction('star_clicked', { starNumber: starNumber });
}

// Example: Log when the moon is clicked
function showSecretMessage() {
  // Existing code to show the secret message
  logInteraction('secret_message_shown', { element: 'moon' });
}




// Function to generate random number within a range
function getRandomPosition(max, size) {
    return Math.random() * (max - size) + '%';  // Generate a random percentage within 0 to (100 - star size)
}

// Function to randomize the star positions and ensure they fit within the screen
function randomizeStarPositions() {
    const stars = document.querySelectorAll('.star');
    const starSize = 10;  // Size of the star in pixels (can adjust based on your actual size)

    stars.forEach(star => {
        // Randomize the 'top' and 'left' positions for each star
        const randomTop = getRandomPosition(100, starSize);  // Random percentage for top, minus the size
        const randomLeft = getRandomPosition(100, starSize); // Random percentage for left, minus the size
        
        star.style.top = randomTop;
        star.style.left = randomLeft;
    });
}

// Call the function to randomize the positions when the page loads
// window.onload = function() {
//     randomizeStarPositions();  // Existing code
//     logInteraction('site_opened', { userAgent: navigator.userAgent });
//   };
// Function to show the message box with different messages based on the clicked star
function showMessage(starNumber) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const clickHint = document.getElementById('clickHint');

    // Hide the hint after the first click
    clickHint.style.display = 'none';

    // Set different messages for each star
    let message;
    switch (starNumber) {
        case 1:
            message = "Happy Birthday! Hope this year brings you all your heart's desires.";
            break;
        case 2:
            message = "Wishing you a lifetime of happiness and joy. Enjoy every moment!";
            break;
        case 3:
            message = "Cheers to the most amazing person I know! Have a fantastic day!";
            break;
        default:
            message = "You're a star!";
            break;
    }

    // Set the message text
    messageText.textContent = message;

    // Show the message box
    messageBox.style.display = 'block';
}

// Function to close the message box
function closeMessage() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'none';
}


// Function to check the answer and show the main content if correct
function checkAnswer() {
    const correctAnswer = "2024-11-01";  // Replace with your desired correct answer
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const errorMessage = document.getElementById('errorMessage');

    if (userAnswer === correctAnswer) {
        // Hide the question page and show the main content
        document.getElementById('questionPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        // Show an error message
        errorMessage.style.display = 'block';
    }
}


function showSecretMessage() {
    // Display the secret message
    const secretMessage = document.createElement('div');
    secretMessage.classList.add('secret-message');
    secretMessage.innerHTML = '🌟 You found the secret! 🌟 <br> Keep shining like the stars!';
    document.body.appendChild(secretMessage);
  
    // Show the message with a fade-in effect
    secretMessage.style.display = 'block';
    secretMessage.style.animation = 'fadeIn 1.5s';
  
    // Trigger confetti
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  
    // Remove the message after 5 seconds
    setTimeout(() => {
      secretMessage.style.display = 'none';
      document.body.removeChild(secretMessage);
    }, 5000);
  }
  
  // Optional: Add fade-in animation keyframes
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
  
