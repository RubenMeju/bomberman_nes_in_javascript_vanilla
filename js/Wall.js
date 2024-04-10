class Wall {
  constructor(x, y, typeWall) {
    this.x = x;
    this.y = y;
    this.typeWall = typeWall;
    this.frameX = 0;
    this.size = cellSize;
    //animacion drawFireWall
    this.frameXfire = 16;
    this.frameYfire = 16;
    // Frames de animación
    this.animationFrames = [
      { x: 16 * 5, y: 16 * 3 },
      { x: 16 * 6, y: 16 * 3 },
      { x: 16 * 7, y: 16 * 3 },
      { x: 16 * 8, y: 16 * 3 },
      { x: 16 * 9, y: 16 * 3 },
      { x: 16 * 10, y: 16 * 3 },
    ];
    // Índice de frame actual en la animación
    this.currentFrameIndex = 0;
    // Contador de frames para la animación
    this.frameCount = 0;
    // Velocidad de la animación
    this.animationSpeed = 10;
  }

  draw() {
    if (this.typeWall === 1) {
      // pared
      this.frameX = 16 * 3;
    } else if (this.typeWall === 2) {
      //muro
      this.frameX = 16 * 4;
    }
    ctx.drawImage(
      imgSprites, // Imagen a dibujar
      this.frameX, // Posición X del sprite en la imagen (posXSprite), multiplicado por 16 ya que cada sprite tiene un ancho de 16 píxeles
      16 * 3, // Posición Y del sprite en la imagen (posYSprite), multiplicado por 16 ya que cada sprite tiene una altura de 16 píxeles
      16, // Tamaño del sprite en el eje X (tamañoX del sprite)
      16, // Tamaño del sprite en el eje Y (tamañoY del sprite)
      this.x, // Posición X en el lienzo donde se dibujará el sprite (posX en el canvas)
      this.y, // Posición Y en el lienzo donde se dibujará el sprite (posY en el canvas)
      cellSize, // Tamaño del sprite en el eje X en el lienzo
      cellSize // Tamaño del sprite en el eje Y en el lienzo
    );
  }

  drawFireWall() {
    ctx.drawImage(
      imgSprites,
      this.frameXfire,
      this.frameYfire,
      16,
      16,
      64, //this.x,
      192, //this.y,
      cellSize,
      cellSize
    );
    // Actualizar el frame de animación
    this.frameCount++;

    if (this.frameCount >= this.animationSpeed) {
      this.frameCount = 0;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % 6; // 3 es el número de frames de animación para cada dirección
    }

    // Seleccionar el frame actual basado en la dirección
    this.frameXfire = this.animationFrames[this.currentFrameIndex].x;
    this.frameYfire = this.animationFrames[this.currentFrameIndex].y;
    // console.log(this.frameX, this.frameY);
  }

  destroyWall(x, y) {
    // x, y son las coordenadas de la bomba
    // Buscar y eliminar la pared a la derecha de la bomba
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].x === x + cellSize && walls[i].y === y) {
        if (walls[i].typeWall === 2) {
          walls.splice(i, 1); // Eliminar la pared del arreglo
          break; // Salir del bucle después de eliminar la pared
        }
      }
    }

    // Buscar y eliminar la pared a la izquierda de la bomba
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].x === x - cellSize && walls[i].y === y) {
        if (walls[i].typeWall === 2) {
          walls.splice(i, 1); // Eliminar la pared del arreglo
          break; // Salir del bucle después de eliminar la pared
        }
      }
    }

    // Buscar y eliminar la pared arriba de la bomba
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].x === x && walls[i].y === y - cellSize) {
        if (walls[i].typeWall === 2) {
          walls.splice(i, 1); // Eliminar la pared del arreglo
          break; // Salir del bucle después de eliminar la pared
        }
      }
    }

    // Buscar y eliminar la pared abajo de la bomba
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].x === x && walls[i].y === y + cellSize) {
        if (walls[i].typeWall === 2) {
          walls.splice(i, 1); // Eliminar la pared del arreglo
          break; // Salir del bucle después de eliminar la pared
        }
      }
    }
  }
}
