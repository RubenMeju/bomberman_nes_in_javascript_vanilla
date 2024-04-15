let player = new Player(cellSize, cellSize);

function startGame() {
  emptycoordinates = getEmptyCellCoordinates();
  createEnemies();
  canvas.style.backgroundColor = "#2e8b00";

  isPlaying = true;
}

function restartGame() {
  /*
  player = new Player(cellSize, cellSize);
  enemies = [];
  canvas.style.backgroundColor = "black";
  */
}

function clearCanvas() {
  ctxHub.clearRect(0, 0, canvasHub.width, canvasHub.height);
  ctx.clearRect(0, 0, boardWidth, boardHeight);
}

function loop() {
  //limpiar canvas
  clearCanvas();
  if (!isPlaying) {
    menu();
  } else {
    drawHUD();
    //dibujar las explosiones
    if (player.explosions.length > 0) {
      player.explosions.forEach((explosion) => {
        explosion.draw(explosion.x, explosion.y);
      });
    }

    //dibujar nivel
    drawLevel();

    //dibujar las coordinates (para desarrollo)
    drawBorderCell();

    //dibujar las bombas
    if (player.bombs.length > 0) {
      player.bombs.forEach((bomb) => {
        bomb.draw(bomb.x, bomb.y);
      });
    }

    // Enemigos
    if (totalEnemies > 0) {
      enemies.forEach((enemy) => {
        enemy.update();
      });
    }

    //actualizar jugador
    player.update();
  }
  window.requestAnimationFrame(loop);
}

init();
loop();

function drawMagicDoor(x, y) {
  ctx.drawImage(imgSprites, 16 * 11, 16 * 3, 16, 16, x, y, cellSize, cellSize);
}
