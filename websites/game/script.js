const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer'); // Ensure you have this ID in your game container div
let score = 0;

document.addEventListener('mousemove', function(e) {
    // Move the player to follow the mouse cursor, centered
    const playerWidth = 190; // Width of the player element
    const playerHeight = 190; // Height of the player element

    // Calculate the centered position
    const centeredLeft = e.pageX - playerWidth / 2;
    const centeredTop = e.pageY - playerHeight / 2;

    // Apply the centered position
    player.style.left = centeredLeft + 'px';
    player.style.top = centeredTop + 'px';
});

function spawnTarget() {
    // Create a new target element
    const newTarget = document.createElement('div');
    console.log(newTarget);
    newTarget.className = 'gameSprite'; // Assuming 'gameSprite' has your styling for targets
    newTarget.id = 'target';
    newTarget.textContent = '🍎'; // Your target emoji or image
    const x = Math.random() * (window.innerWidth - 64);
    const y = Math.random() * (window.innerHeight - 64);
    newTarget.style.left = x + 'px';
    newTarget.style.top = y + 'px';
    newTarget.style.position = 'absolute'; // Ensure this is set if not already in your CSS
    
    // Add click event to new target
    newTarget.addEventListener('click', function() {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
        gameContainer.removeChild(newTarget); // Remove the clicked target
    });

    // Append the new target to the game container
    gameContainer.appendChild(newTarget);
}

// Call spawnTarget every second
setInterval(spawnTarget, 1000);
