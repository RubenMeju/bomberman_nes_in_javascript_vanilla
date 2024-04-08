const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = new Player(cellSize, cellSize);

// Crear los enemigos y añadirlos a enemies
for (let i = 0; i < totalEnemies; i++) {
  enemies.push(new Enemy(cellSize, cellSize * i));
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  //limpiar canvas
  clearCanvas();
  //dibujar las explosiones
  if (player.explosions.length > 0) {
    player.explosions.forEach((explosion) => {
      explosion.draw(explosion.x, explosion.y);
    });
  }

  //dibujar nivel
  drawLevel();

  //dibujar las coordenadas (para desarrollo)
  drawBorderCell();

  //dibujar las bombas
  if (player.bombs.length > 0) {
    player.bombs.forEach((bomb) => {
      bomb.draw(bomb.x, bomb.y);
    });
  }

  //actualizar jugador
  player.update();

  // Enemigos
  //enemy.update();

  if (totalEnemies > 0) {
    enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  window.requestAnimationFrame(loop);
}

init();
loop();
