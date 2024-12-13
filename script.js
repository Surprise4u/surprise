// const sheetWebAppURL = 'https://script.google.com/macros/s/AKfycby_mEtzoK3razMaaWJWNQ64E5M0M6bHiCsIpHHyJENUsnXJXSPtYDEchcbVknkg0xk/exec';  // Replace with your deployed URL

// // Function to log interaction
// function logInteraction(eventType, details) {
//     console.log('Interaction to log:', eventType, details);  // Add this

//     fetch(sheetWebAppURL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ event: eventType, details: details }),
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => console.log('Logged successfully:', data))
//     .catch(error => console.error('Error logging interaction:', error));
//   }
  
// countdowntimer

const countdown = () => {
  const targetDate = new Date("2025-01-06T00:00:00").getTime(); // Set your date here
  const timer = document.getElementById("timer");
 
  const questionPage = document.getElementById("questionPage");

  const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24)); // Calculate days
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          const milliseconds = difference % 1000;

          timer.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
          
      } else {
          timer.innerHTML = "The site is now live!";
          questionPage.style.display = 'flex';
          Countdowntimer.style.display='none';
          clearInterval(interval);
      }
  };

  const interval = setInterval(updateTimer, 50); // Update every 50 milliseconds
  updateTimer(); // Initial call
};

countdown();

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
    const starss = document.querySelectorAll('.starss');
    const starSize = 10;  // Size of the star in pixels (can adjust based on your actual size)

    stars.forEach(star => {
        // Randomize the 'top' and 'left' positions for each star
        const randomTop = getRandomPosition(100, starSize);  // Random percentage for top, minus the size
        const randomLeft = getRandomPosition(100, starSize); // Random percentage for left, minus the size
        
        star.style.top = randomTop;
        star.style.left = randomLeft;
    });

    starss.forEach(starrs => {
      // Randomize the 'top' and 'left' positions for each star
      const randomTop = getRandomPosition(100, starSize);  // Random percentage for top, minus the size
      const randomLeft = getRandomPosition(100, starSize); // Random percentage for left, minus the size
      
      starrs.style.top = randomTop;
      starrs.style.left = randomLeft;
  });
}

const starClickSound = new Audio('twinkle.mp3');  // Adjust the path as needed
function playStarSound() {
  starClickSound.currentTime = 0;  // Reset the sound to the beginning
  starClickSound.play();
}

const moonClickSound = new Audio('Confetti.mp3');  // Adjust the path as needed
function playConfettiSound() {
  moonClickSound.currentTime = 0;  // Reset the sound to the beginning
  moonClickSound.play();
}


// Call the function to randomize the positions when the page loads
// window.onload = function() {
//     randomizeStarPositions();  // Existing code
//     logInteraction('site_opened', { userAgent: navigator.userAgent });
//   };
// Function to show the message box with different messages based on the clicked star
function showMessage(starNumber) {
  playStarSound();
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const clickHint = document.getElementById('clickHint');

    // Hide the hint after the first click
    clickHint.style.display = 'none';

    // Set different messages for each star
    let message;
    switch (starNumber) {
        case 1:
            message = "Wishing you a day filled with love🩵, laughter🤣, and all the happiness😇 you deserve.";
            break;
        case 2:
            message = "Wishing you a lifetime of happiness and joy. Enjoy every moment!";
            break;
        case 3:
            message = "Cheers to the most amazing person I know! Have a fantastic day!";
            break;
        default:
            message = "May your birthday be as sweet and amazing as you are! (Hit the Moon🌕 after all stars)";
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


// // Function to check the answer and show the main content if correct
// function checkAnswer() {
//     const correctAnswer = "2024-11-01";  // Replace with your desired correct answer
//     const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
//     const errorMessage = document.getElementById('errorMessage');

//     if (userAnswer === correctAnswer) {
//         // Hide the question page and show the main content
//         document.getElementById('questionPage').style.display = 'none';
//         document.getElementById('mainContent').style.display = 'block';
//     } else {
//         // Show an error message
//         errorMessage.style.display = 'block';
//     }
// }


let attemptCount = 0; // Track the number of attempts

function checkAnswer() {
    const correctAnswer = "2024-11-01"; // Replace with your desired correct answer
    const userAnswer = document.getElementById('answerInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const errorGif = document.getElementById('errorGif');
    const successMessage = document.getElementById('successmsg');
    const successGif = document.getElementById('successGif');
    const countDown = document.getElementById('countDown');
    const countDownGif = document.getElementById('countdownGif');   // Reference to the GIF element


    attemptCount++;

    if (userAnswer === correctAnswer) {
      successMessage.style.display = 'block';
      countDown.style.display='block';
      successGif.src = 'clapping.gif';
      errorMessage.style.display='none';
      countDownGif.src = 'countdown.gif'  // Replace with your GIF file path or URL

        // Correct answer logic
        setTimeout(() => {
          document.getElementById('questionPage').style.display = 'none';
          document.getElementById('mainContent').style.display = 'block';
      }, 5000);
      
    } else {
        // Update the error message based on the attempt number
        if (attemptCount === 1) {
            errorMessage.style.display='block';
            errorGif.src = 'incorrect.gif';
        } else if (attemptCount === 2) {
            errorGif.src = 'last.gif';
        } else {
            // Forcibly correct the input on the third attempt
            errorGif.src = 'rehnedo.gif';
            countDown.style.display='block';
            countDownGif.src = 'countdown.gif' 
            // document.getElementById('answerInput').value = correctAnswer;
            
            // Proceed as if the correct answer was entered
           
            setTimeout(() => {
              document.getElementById('questionPage').style.display = 'none';
              document.getElementById('mainContent').style.display = 'block';
          }, 5000);
        }
        
        errorMessage.style.display = 'block';
    }
}


function showSecretMessage() {
    // Display the secret message
    playConfettiSound();
    const secretMessage = document.createElement('div');
    secretMessage.classList.add('secret-message');
    secretMessage.innerHTML = '🌟 The best birthday gift is the love of Family and friends. Today, may you be surrounded by both, <br> 🌟 feeling cherished and celebrated!';
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
      document.getElementById('hidden').style.display = 'block'; // Show button 2      
  }, 8000); // 5000 milliseconds = 5 seconds
    
      
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
  



  


 
