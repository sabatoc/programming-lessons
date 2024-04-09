const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer'); // Ensure you have this ID in your game container div
let score = 0;

document.addEventListener('mousemove', function(e) {
    // Move the player to follow the mouse cursor
    player.style.left = e.pageX + 'px';
    player.style.top = e.pageY + 'px';
});

function spawnTarget() {
    // Create a new target element
    const newTarget = document.createElement('div');
    newTarget.className = 'gameSprite'; // Assuming 'gameSprite' has your styling for targets
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
