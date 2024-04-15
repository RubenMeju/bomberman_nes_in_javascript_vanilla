// Definir los estados del juego
const GAME_STATES = {
  MENU: 0,
  LEVEL_START: 1,
  GAMEPLAY: 2,
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
  console.log("direccion: " + player.direction);
  switch (gameState) {
    case GAME_STATES.MENU:
      // Lógica del menú de inicio
      console.log("Pantalla Menu");
      if (!isPlaying) {
        menu();
      }
      break;

    case GAME_STATES.LEVEL_START:
      // Lógica de inicio del nivel (por ejemplo, mostrar texto de nivel)
      // Transición automática al estado de juego después de un breve período
      console.log("Pantalla stage");

      if (!soundPlayed) {
        reproducirSonido("stage");
        soundPlayed = true; // Establecer la bandera en true para indicar que el sonido ha sido reproducido
      }

      drawScreenStage();
      player.x = cellSize;
      player.y = cellSize;
      setTimeout(() => {
        canvas.style.backgroundColor = "#2e8b00"; // cambiar color del canvas a verde
        gameState = GAME_STATES.GAMEPLAY;
      }, 3000); // Transición después de 3 segundos (ejemplo)
      break;
    case GAME_STATES.GAMEPLAY:
      // Lógica del juego principal
      drawHUD();
      updateExplosions();
      drawLevel();
      updateBombs();
      updateEnemies();
      player.update();
      break;
  }
  window.requestAnimationFrame(loop);
}

init();
loop();

function drawMagicDoor(x, y) {
  ctx.drawImage(imgSprites, 16 * 11, 16 * 3, 16, 16, x, y, cellSize, cellSize);
}

// Pantalla para mostrar el nivel del juego
function drawScreenStage() {
  //canvasHub.style.backgroundColor = "gray";

  ctx.font = "32px Arial";
  ctx.fillStyle = "white";

  ctx.fillText("Stage: 1", boardWidth / 2, boardHeight / 3);
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
