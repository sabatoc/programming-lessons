document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('gameContainer');
    const player = document.getElementById('player');
    let playerY = gameContainer.clientHeight / 2;
    const playerSpeed = 20;
    let score = 0;
  
    window.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowUp') {
        playerY = Math.max(0, playerY - playerSpeed);
      } else if (e.key === 'ArrowDown') {
        playerY = Math.min(gameContainer.clientHeight - player.offsetHeight, playerY + playerSpeed);
      }
      player.style.top = playerY + 'px';
    });
  
    function spawnHen() {
      const hen = document.createElement('div');
      hen.classList.add('hen');
      hen.textContent = '🐓';
      hen.style.top = Math.random() * (gameContainer.clientHeight - 30) + 'px';
      hen.style.left = gameContainer.clientWidth + 'px';
      gameContainer.appendChild(hen);
      moveHen(hen);
    }
  
    function moveHen(hen) {
      let henX = parseInt(hen.style.left, 10);
      const interval = setInterval(function() {
        henX -= 5;
        if (henX < -30) {
          clearInterval(interval);
          gameContainer.removeChild(hen);
          score++;
          document.getElementById('score').textContent = 'Punteggio: ' + score;
          
          // CHANGE SCORE HERE
          if (score == 15) {
            clearInterval(spawnHenInterval);
            gameContainer.innerHTML = '';
            // Delay the alert by 10 milliseconds to make sure the updated Score is shown before this alert
            setTimeout(function() {
                alert('Hai vinto!');
                clearInterval(interval);
                window.location.reload();
            }, 10);
          }
        } else if (isCollision(hen)) {
          alert('Hai perso, riprova!');
          clearInterval(interval);
          window.location.reload();
        } else {
          hen.style.left = henX + 'px';
        }
      }, 20);
    }
  
    function isCollision(hen) {
      const henRect = hen.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();
      return (
        henRect.x < playerRect.x + playerRect.width && // Check if the left side of the hen (henRect.x) is to the left of the right side of the player
        henRect.y < playerRect.y + playerRect.height && // Check if the top side of the hen (henRect.y) is above the bottom side of the player
        henRect.height + henRect.y > playerRect.y // Check if the bottom of the hen (henRect.height + henRect.y) is below the top of the player
      );
    }
  
    spawnHenInterval = setInterval(spawnHen, 1000);
  });  