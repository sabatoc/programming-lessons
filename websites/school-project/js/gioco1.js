const player = document.getElementById('player');
const target = document.getElementById('target');
let score = 0;

// This function is called whenever the mouse moves
/*document.addEventListener('mousemove', function(e) {
    // Move the player to follow the mouse cursor
    player.style.left = e.pageX + 'px';
    player.style.top = e.pageY + 'px';
});*/

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
    // Randomly place the target within the game container
    // The number 64 is used to make sure the target doesn't appear too close to the edges of the window
    const x = Math.random() * (window.innerWidth - 64);
    const y = Math.random() * (window.innerHeight - 64);
    target.style.left = x + 'px';
    target.style.top = y + 'px';
}

target.addEventListener('click', function() {
    score++;
    document.getElementById('score').textContent = 'Score: ' + score;
    spawnTarget(); // Respawn the target at a new location
});

// Initial spawn of the target (this is where the game)
spawnTarget();
