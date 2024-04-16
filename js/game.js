// Definir los estados del juego
const GAME_STATES = {
  MENU: 0,
  LEVEL_START: 1,
  GAMEPLAY: 2,
  GAMEOVER: 3,
};

let gameState = GAME_STATES.MENU; // Estado inicial del juego
let soundPlayed = false;
let player = new Player(cellSize, cellSize);

function startGame() {
  emptycoordinates = getEmptyCellCoordinates();
  createEnemies();

  isPlaying = true;

  gameState = GAME_STATES.LEVEL_START;
}

function clearCanvas() {
  ctxHub.clearRect(0, 0, canvasHub.width, canvasHub.height);
  ctx.clearRect(0, 0, boardWidth, boardHeight);
}

function loop() {
  //limpiar canvas
  clearCanvas();
  switch (gameState) {
    case GAME_STATES.MENU:
      if (!isPlaying) {
        menu();
      }
      break;

    case GAME_STATES.LEVEL_START:
      if (!soundPlayed) {
        playSound("stage");
        soundPlayed = true; // Establecer la bandera en true para indicar que el sonido ha sido reproducido
      }

      drawScreenStage();
      player.x = cellSize;
      player.y = cellSize;
      setTimeout(() => {
        canvas.style.backgroundColor = "#2e8b00"; // cambiar color del canvas a verde
        player.isPlaying = false;
        gameState = GAME_STATES.GAMEPLAY;
      }, 3000);
      break;
    case GAME_STATES.GAMEPLAY:
      drawHUD();
      updateExplosions();
      drawLevel();
      updateBombs();
      updateEnemies();
      player.update();

      if (enemies.length === 0) {
        collisionInMagicDoor();
      }
      break;

    case GAME_STATES.GAMEOVER:
      drawScreenGameOver();
      setTimeout(() => {
        isPlaying = false;
        player.lives = 3;
        gameState = GAME_STATES.MENU;
      }, 3000);
  }
  window.requestAnimationFrame(loop);
}

init();
loop();

// Pantalla para mostrar el nivel del juego
function drawScreenStage() {
  ctx.font = "32px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Stage: 1", boardWidth / 2, boardHeight / 3);
}

// Pantalla para mostrar el game over
function drawScreenGameOver() {
  ctx.font = "32px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", boardWidth / 2, boardHeight / 3);
}

function updateExplosions() {
  if (player.explosions.length > 0) {
    player.explosions.forEach((explosion) => {
      explosion.draw(explosion.x, explosion.y);
    });
  }
}
function updateBombs() {
  if (player.bombs.length > 0) {
    player.bombs.forEach((bomb) => {
      bomb.draw(bomb.x, bomb.y);
    });
  }
}

function updateEnemies() {
  if (totalEnemies > 0) {
    enemies.forEach((enemy) => {
      enemy.update();
    });
  }
}

//dibujar la puerta magica
function drawMagicDoor(x, y) {
  ctx.drawImage(imgSprites, 16 * 11, 16 * 3, 16, 16, x, y, cellSize, cellSize);
}

function collisionInMagicDoor() {
  if (checkCollision(player, cellDoorSecret)) {
    console.log("Has pasado el nivel!!!");
    //  playSound("levelComplete");
    /*
    setTimeout(() => {
      gameState = GAME_STATES.LEVEL_START;
    }, 2000);
    */
  }
}
