const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer'); // Ensure you have this ID in your game container div

const targetWidth = 128; // Width of the target (same as font-size for #target in CSS)
const targetHeight = 128; // Height of the target (same as font-size for #target in CSS)
const playerWidth = 190; // Width of the target (same as font-size for #player in CSS)
const playerHeight = 190; // Height of the target (same as font-size for #player in CSS)

let score = 0;

document.addEventListener('mousemove', function(e) {
    // Move the player to follow the mouse cursor, centered
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
    newTarget.className = 'gameSprite'; // Assuming 'gameSprite' has your styling for targets
    newTarget.id = 'target';
    newTarget.textContent = '🍎'; // Your target emoji or image

    let x = Math.random() * (window.innerWidth - 64);
    let y = Math.random() * (window.innerHeight - 64);
    newTarget.style.left = x + 'px';
    newTarget.style.top = y + 'px';
    newTarget.style.position = 'absolute'; // Ensure this is set if not already in your CSS

    const targetCounter = document.createElement('div');
    targetCounter.className = 'targetCounter';
    targetCounter.textContent = '6';
    const targetCounterX = targetWidth/3;
    const targetCounterY = -targetHeight;
    targetCounter.style.left = targetCounterX + 'px';
    targetCounter.style.top = targetCounterY + 'px';
    targetCounter.style.position = 'relative'; // Ensure this is set if not already in your CSS

    newTarget.appendChild(targetCounter);

    // Add click event to new target
    newTarget.addEventListener('click', function() {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
        gameContainer.removeChild(newTarget); // Remove the clicked target

        if (score == 10) {
            clearInterval(spawnTargetInterval);
            clearInterval(decreaseCountersInterval);
            gameContainer.innerHTML = '';
            // Delay the alert by 10 milliseconds to make sure the updated Score is shown before this alert
            setTimeout(function() {
                alert('Hai vinto!');
            }, 10);
        }
    });

    gameContainer.appendChild(newTarget);
}

function spawnTargetCounter(target, targetX, targetY) {
    const targetCounter = document.createElement('div');
    targetCounter.className = 'targetCounter';
    targetCounter.textContent = '6';
    targetCounter.style.left = (targetX + targetWidth/3) + 'px';
    targetCounter.style.top = (targetY + targetHeight/3) + 'px';
    targetCounter.style.position = 'absolute'; // Ensure this is set if not already in your CSS

    target.appendChild(targetCounter);
    gameContainer.appendChild(target);
}

function decreaseCounters() {
    // Get all counters from the gameContainer element
    const counters = document.getElementsByClassName('targetCounter');

    for (i = 0; i < counters.length; i++) {
        counters[i].textContent -= 1;

        if (counters[i].textContent == -1) {
            alert('Hai perso, riprova!');
            location.reload();
            clearInterval(spawnTargetInterval);
            clearInterval(decreaseCountersInterval);
        }
    }
}

/*document.getElementById('startGame').addEventListener('click', function() {
    console.log("Button pressed...");
    
    //spawnSpeed = document.getElementById('speed').value || 1000;
    //clearInterval(gameInterval); // Clear existing game interval if any
    //gameInterval = setInterval(spawnTarget, spawnSpeed);

    // Call spawnTarget and decreaseCounters every second
    spawnTargetInterval = setInterval(spawnTarget, 1000);
    decreaseCountersInterval = setInterval(decreaseCounters, 1000);
});*/

spawnTargetInterval = setInterval(spawnTarget, 1000);
decreaseCountersInterval = setInterval(decreaseCounters, 1000);