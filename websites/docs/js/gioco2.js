let countdown = 15;
const timerElement = document.getElementById('timer');
timerElement.textContent = countdown;
    
const interval = setInterval(function() {
    countdown -= 1;
    timerElement.textContent = countdown;
    if (countdown < 13) {
        timerElement.style.display = 'none';  // Hide timer
    }
    if (countdown == -1) {
        timerElement.textContent = countdown + 1; // This way we show 0 at the end of the game
        timerElement.style.display = 'block';  // Show timer when 0 seconds are reached

        const endGameInterval = setInterval(function() {
            alert('Troppo tardi, prova di nuovo!');
            clearInterval(interval);
            clearInterval(endGameInterval)
            window.location.reload();
        }, 20);
    }
}, 1000);
    
const button = document.getElementById('guessButton');
button.onclick = function() {
    if (countdown == 0) {
        alert('Congratulazioni, hai un tempismo perfetto!');
        clearInterval(interval);
        window.location.reload();
    } else {
        alert('Troppo presto, prova di nuovo!');
        clearInterval(interval);
        window.location.reload();
    }
};