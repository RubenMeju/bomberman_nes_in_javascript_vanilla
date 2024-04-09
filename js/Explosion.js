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
    // console.log("colision con la explosion");
    // Calcular los límites del área del player en la nueva posición
    let playerLeft = player.x;
    let playerRight = player.x + player.size;
    let playerTop = player.y;
    let playerBottom = player.y + player.size;
    console.log(playerTop);
    // Verificar colisión con cada explosion
    for (let i = 0; i < player.explosions.length; i++) {
      // Calcular los límites del área de la explosion
      let explosionLeft = player.explosions[i].x;
      let explosionRight = player.explosions[i].x + cellSize;
      let explosionTop = player.explosions[i].y;
      let explosionBottom = player.explosions[i].y + cellSize;
      // Verificar si hay intersección entre el área del player y el área de la explosion
      if (
        (playerRight > explosionLeft &&
          playerLeft < explosionRight &&
          playerBottom > explosionTop &&
          playerTop < explosionBottom) ||
        (playerRight > explosionLeft - cellSize &&
          playerLeft < explosionRight + cellSize &&
          playerBottom > explosionTop - cellSize &&
          playerTop < explosionBottom + cellSize)
      ) {
        player.deathPlayer();
        return true;
      }
    }

    return false;
  }
}
