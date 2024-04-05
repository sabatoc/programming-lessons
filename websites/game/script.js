const player = document.getElementById('player');
const hen = document.getElementById('hen');
let score = 0;

// This function is called whenever the mouse moves
document.addEventListener('mousemove', function(e) {
    // Move the player to follow the mouse cursor
    player.style.left = e.pageX + 'px';
    player.style.top = e.pageY + 'px';
});

function spawnHen() {
    // Randomly place the hen within the game container
    // The number 64 is used to make sure the hen doesn't appear too close to the edges of the window
    const x = Math.random() * (window.innerWidth - 64);
    const y = Math.random() * (window.innerHeight - 64);
    hen.style.left = x + 'px';
    hen.style.top = y + 'px';
}

hen.addEventListener('click', function() {
    score++;
    document.getElementById('score').textContent = 'Score: ' + score;
    spawnHen(); // Respawn the hen at a new location
});

// Initial spawn of the hen (this is where the game starts)
spawnHen();
