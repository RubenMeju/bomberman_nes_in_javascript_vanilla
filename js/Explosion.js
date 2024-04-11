class Explosion {
  constructor(x, y) {
    this.x = x; //192;
    this.y = y; //320;
    this.frameXcenter = 0;
    this.frameYcenter = 16 * 3;
    this.frameXright = 0;
    this.frameYright = 16 * 3;

    // Frames de animación para cada dirección
    this.animationFramesCenter = [
      { x: 16 * 2, y: 16 * 6 },
      { x: 16 * 7, y: 16 * 6 },
      { x: 16 * 2, y: 16 * 11 },
      { x: 16 * 7, y: 16 * 11 },
    ];
    this.animationFramesLeft = [
      { x: 16 * 3, y: 16 * 6 },
      { x: 16 * 8, y: 16 * 6 },
      { x: 16 * 3, y: 16 * 11 },
      { x: 16 * 8, y: 16 * 11 },
    ];
    this.animationFramesRight = [
      { x: 16 * 3, y: 16 * 6 },
      { x: 16 * 8, y: 16 * 6 },
      { x: 16 * 3, y: 16 * 11 },
      { x: 16 * 8, y: 16 * 11 },
    ];

    this.animationFramesUp = [
      { x: 16 * 2, y: 16 * 5 },
      { x: 16 * 7, y: 16 * 5 },
      { x: 16 * 2, y: 16 * 10 },
      { x: 16 * 7, y: 16 * 10 },
    ];
    this.animationFramesDown = [
      { x: 16 * 2, y: 16 * 7 },
      { x: 16 * 7, y: 16 * 7 },
      { x: 16 * 2, y: 16 * 12 },
      { x: 16 * 7, y: 16 * 12 },
    ];

    // Índice de frame actual en la animación
    this.currentFrameIndex = 0;
    // Contador de frames para la animación
    this.frameCount = 0;
    // Velocidad de la animación
    this.animationSpeed = 14; // Ajusta esto según la velocidad deseada
  }

  draw() {
    this.isCollisionsEnemiesWithExplosion();

    this.isCollisions();
    //central
    ctx.drawImage(
      imgSprites,
      this.frameXcenter,
      this.frameYcenter,
      16,
      16,
      this.x,
      this.y,
      cellSize,
      cellSize
    );

    // Left
    ctx.drawImage(
      imgSprites,
      this.frameXleft,
      this.frameYleft,
      16,
      16,
      this.x - cellSize,
      this.y,
      cellSize,
      cellSize
    );

    // Right
    ctx.drawImage(
      imgSprites,
      this.frameXright,
      this.frameYright,
      16,
      16,
      this.x + cellSize,
      this.y,
      cellSize,
      cellSize
    );

    // Up
    ctx.drawImage(
      imgSprites,
      this.frameXup,
      this.frameYup,
      16,
      16,
      this.x,
      this.y - cellSize,
      cellSize,
      cellSize
    );

    // Down
    ctx.drawImage(
      imgSprites,
      this.frameXdown,
      this.frameYdown,
      16,
      16,
      this.x,
      this.y + cellSize,
      cellSize,
      cellSize
    );

    this.animate();
  }

  animate() {
    // Actualizar el frame de animación
    this.frameCount++;
    if (this.frameCount >= this.animationSpeed) {
      this.frameCount = 0;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % 4; // 3 es el número de frames de animación para cada dirección
    }

    // Seleccionar el frame actual central
    this.frameXcenter = this.animationFramesCenter[this.currentFrameIndex].x;
    this.frameYcenter = this.animationFramesCenter[this.currentFrameIndex].y;

    // Seleccionar el frame actleft
    this.frameXleft = this.animationFramesLeft[this.currentFrameIndex].x;
    this.frameYleft = this.animationFramesLeft[this.currentFrameIndex].y;

    // Seleccionar el frame actual right
    this.frameXright = this.animationFramesRight[this.currentFrameIndex].x;
    this.frameYright = this.animationFramesRight[this.currentFrameIndex].y;

    // Seleccionar el frame actual up
    this.frameXup = this.animationFramesUp[this.currentFrameIndex].x;
    this.frameYup = this.animationFramesUp[this.currentFrameIndex].y;

    // Seleccionar el frame actual down
    this.frameXdown = this.animationFramesDown[this.currentFrameIndex].x;
    this.frameYdown = this.animationFramesDown[this.currentFrameIndex].y;
  }

  isCollisions() {
    // Calcular los límites del área del jugador en la nueva posición
    const playerLeft = player.x;
    const playerRight = player.x + player.size;
    const playerTop = player.y;
    const playerBottom = player.y + player.size;

    // Verificar colisión con cada explosión
    for (const explosion of player.explosions) {
      // Calcular los límites del área de la explosión
      const explosionLeft = explosion.x;
      const explosionRight = explosion.x + cellSize;
      const explosionTop = explosion.y;
      const explosionBottom = explosion.y + cellSize;

      // Verificar si hay intersección entre el área del jugador y el área de la explosión
      if (
        playerRight > explosionLeft &&
        playerLeft < explosionRight &&
        playerBottom > explosionTop &&
        playerTop < explosionBottom
      ) {
        player.deathPlayer();
        return true;
      }

      // Verificar colisión con las celdas adyacentes a la explosión
      const adjacentCells = [
        { x: explosion.x - cellSize, y: explosion.y }, // izquierda
        { x: explosion.x + cellSize, y: explosion.y }, // derecha
        { x: explosion.x, y: explosion.y - cellSize }, // arriba
        { x: explosion.x, y: explosion.y + cellSize }, // abajo
      ];

      for (const cell of adjacentCells) {
        if (
          playerRight > cell.x &&
          playerLeft < cell.x + cellSize &&
          playerBottom > cell.y &&
          playerTop < cell.y + cellSize
        ) {
          player.deathPlayer();
          return true;
        }
      }
    }

    return false;
  }

  isCollisionsEnemiesWithExplosion() {
    // console.log("colision con la explosion");
    for (let j = 0; j < enemies.length; j++) {
      // Calcular los límites del área del enemy en la nueva posición
      let enemyLeft = enemies[j].x;
      let enemyRight = enemies[j].x + enemies[j].size;
      let enemyTop = enemies[j].y;
      let enemyBottom = enemies[j].y + enemies[j].size;
      console.log("paso por la explision");
      // Verificar colisión con cada explosion
      for (let i = 0; i < player.explosions.length; i++) {
        // Calcular los límites del área de la explosion
        let explosionLeft = player.explosions[i].x;
        let explosionRight = player.explosions[i].x + cellSize;
        let explosionTop = player.explosions[i].y;
        let explosionBottom = player.explosions[i].y + cellSize;
        // Verificar si hay intersección entre el área del enemy y el área de la explosion
        if (
          (enemyRight > explosionLeft &&
            enemyLeft < explosionRight &&
            enemyBottom > explosionTop &&
            enemyTop < explosionBottom) ||
          (enemyRight > explosionLeft - cellSize &&
            enemyLeft < explosionRight + cellSize &&
            enemyBottom > explosionTop - cellSize &&
            enemyTop < explosionBottom + cellSize)
        ) {
          console.log("muerte del enemigo");
          enemies[j].destroy(enemies[j]);
          return true;
        }
      }
    }
    return false;
  }
}
