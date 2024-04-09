let player = new Player(cellSize, cellSize);

function getEmptyCellCoordinates() {
  const coordinates = [];
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      let cellX = j * cellSize;
      let cellY = i * cellSize;

      if (level[i][j] === 0) {
        coordinates.push({ x: cellX, y: cellY });
      }
    }
  }
  return coordinates;
}

function createEnemies() {
  // Crear los enemigos y añadirlos a enemies
  for (let i = 0; i < totalEnemies; i++) {
    // Obtener una coordenada vacía al azar
    const randomcoordinate =
      emptycoordinates[Math.floor(Math.random() * emptycoordinates.length)];

    // Crear un enemigo en la coordenada aleatoria
    const enemyX = randomcoordinate.x;
    const enemyY = randomcoordinate.y;

    enemies.push(new Enemy(enemyX, enemyY));
  }
}

function startGame() {
  isPlaying = true;
  console.log("player", player);

  // Obtener las coordinates de las celdas vacías
}

function restartGame() {
  isPlaying = false;
  player = new Player(cellSize, cellSize);

  enemies = [];
  totalEnemies = 6;
  emptycoordinates = getEmptyCellCoordinates();
  createEnemies();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  //limpiar canvas
  clearCanvas();
  if (!isPlaying) {
    menu();
    console.log("menu");
  } else {
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
