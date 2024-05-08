function startGame() {
    let countdown = 15;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = countdown;
    
    const interval = setInterval(function() {
        countdown -= 1;
        timerElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(interval);
            timerElement.style.display = 'none';  // Hide timer
        }
    }, 1000);
    
    setTimeout(() => {
        const button = document.createElement('button');
        button.textContent = 'Click when you think 15 seconds are up!';
        button.onclick = function() {
            if (countdown <= 0) {
                alert('Congratulations, you timed it perfectly!');
            } else {
                alert('Too soon! Try again!');
            }
        };
        document.getElementById('gameContainer').appendChild(button);
    }, 15000);  // Show the button after 15 seconds
}

document.getElementById('topBar').getElementsByTagName('button')[0].disabled = false;