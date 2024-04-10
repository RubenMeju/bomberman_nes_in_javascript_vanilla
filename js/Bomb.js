class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frameX = 0;
    this.frameY = 16 * 3;
    this.size = cellSize;
    // Frames de animación para cada dirección
    this.animationFrames = [
      { x: 32, y: 48 },
      { x: 16, y: 48 },
      { x: 0, y: 48 },
    ];
    // Índice de frame actual en la animación
    this.currentFrameIndex = 0;
    // Contador de frames para la animación
    this.frameCount = 0;
    // Velocidad de la animación
    this.animationSpeed = 14; // Ajusta esto según la velocidad deseada
  }

  draw() {
    ctx.drawImage(
      imgSprites,
      this.frameX,
      this.frameY,
      16,
      16,
      this.x,
      this.y,
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
      this.currentFrameIndex = (this.currentFrameIndex + 1) % 3; // 3 es el número de frames de animación para cada dirección
    }

    // Seleccionar el frame actual
    this.frameX = this.animationFrames[this.currentFrameIndex].x;
    this.frameY = this.animationFrames[this.currentFrameIndex].y;
  }
}
