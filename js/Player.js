class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // posiciones para seleccionar los frames del sprite
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 2;
    //movement
    this.leftPress = false;
    this.rightPress = false;
    this.upPress = false;
    this.downPress = false;
    this.direction = "right";

    this.bombs = [];
    this.explosions = [];

    // Frames de animación para cada dirección
    this.animationFrames = {
      right: [
        { x: 0, y: 16 },
        { x: 16, y: 16 },
        { x: 16 * 2, y: 16 },
      ],
      left: [
        { x: 0, y: 0 },
        { x: 16, y: 0 },
        { x: 16 * 2, y: 0 },
      ],
      up: [
        { x: 16 * 3, y: 16 },
        { x: 16 * 4, y: 16 },
        { x: 16 * 5, y: 16 },
      ],
      down: [
        { x: 16 * 3, y: 0 },
        { x: 16 * 4, y: 0 },
        { x: 16 * 5, y: 0 },
      ],
    };
    // Índice de frame actual en la animación
    this.currentFrameIndex = 0;
    // Contador de frames para la animación
    this.frameCount = 0;
    // Velocidad de la animación
    this.animationSpeed = 5; // Ajusta esto según la velocidad deseada
  }

  update() {
    this.movement();
    this.draw();
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

    drawBorderCell();
  }

  movement() {
    if (
      this.rightPress &&
      this.direction === "right" &&
      this.x < canvas.width - cellSize &&
      !this.isCollision()
    ) {
      this.animate("right");
      this.x += this.speed;
    } else if (
      this.leftPress &&
      this.direction === "left" &&
      this.x > cellSize &&
      !this.isCollision()
    ) {
      this.animate("left");
      this.x -= this.speed;
    } else if (
      this.upPress &&
      this.direction === "up" &&
      this.y > cellSize &&
      !this.isCollision()
    ) {
      this.animate("up");
      this.y -= this.speed;
    } else if (
      this.downPress &&
      this.direction === "down" &&
      this.y < canvas.height - cellSize * 2 &&
      !this.isCollision()
    ) {
      this.animate("down");
      this.y += this.speed;
    }
  }

  isCollision() {
    let cellX = Math.floor(this.x / cellSize); // Calcular la celda actual en el eje X
    let cellY = Math.floor(this.y / cellSize); // Calcular la celda actual en el eje Y

    // Calcular las coordenadas de las celdas adyacentes en las cuatro direcciones
    let cellRightX = cellX + 1;
    let cellLeftX = cellX - 1;
    let cellUpY = cellY - 1;
    let cellDownY = cellY + 1;

    // Calcular la posición final del jugador en cada dirección
    let posFinalCellRight = this.x + cellSize;
    let posFinalCellLeft = this.x - this.speed; // Corregir el cálculo de la posición final en la dirección "left"
    let posFinalCellUp = this.y - this.speed; // Corregir el cálculo de la posición final en la dirección "up"
    let posFinalCellDown = this.y + cellSize;

    // Verificar colisión en la dirección derecha
    if (
      this.direction === "right" &&
      posFinalCellRight > (cellX + 1) * cellSize
    ) {
      if (level[cellY][cellRightX] === 1 || level[cellY][cellRightX] === 2) {
        return true;
      }
    }

    // Verificar colisión en la dirección izquierda
    if (this.direction === "left" && posFinalCellLeft < cellX * cellSize) {
      if (level[cellY][cellLeftX] === 1 || level[cellY][cellLeftX] === 2) {
        return true;
      }
    }

    // Verificar colisión en la dirección arriba
    if (this.direction === "up" && posFinalCellUp < cellY * cellSize) {
      if (level[cellUpY][cellX] === 1 || level[cellUpY][cellX] === 2) {
        return true;
      }
    }

    // Verificar colisión en la dirección abajo
    if (
      this.direction === "down" &&
      posFinalCellDown > (cellY + 1) * cellSize
    ) {
      if (level[cellDownY][cellX] === 1 || level[cellDownY][cellX] === 2) {
        return true;
      }
    }

    // Si no hay colisión en ninguna dirección, retornar false
    return false;
  }

  animate() {
    // Actualizar el frame de animación
    this.frameCount++;
    if (this.frameCount >= this.animationSpeed) {
      this.frameCount = 0;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % 3; // 3 es el número de frames de animación para cada dirección
    }

    // Seleccionar el frame actual basado en la dirección
    this.frameX =
      this.animationFrames[this.direction][this.currentFrameIndex].x;
    this.frameY =
      this.animationFrames[this.direction][this.currentFrameIndex].y;
  }

  placeBomb() {
    let cellX = Math.floor(this.x / cellSize); // Calcular la celda actual en el eje X
    let cellY = Math.floor(this.y / cellSize); // Calcular la celda actual en el eje Y
    console.log(cellX * cellSize, cellY * cellSize);

    const bomb = new Bomb(cellX * cellSize, cellY * cellSize);
    this.bombs.push(bomb);
    setTimeout(() => {
      this.destroyBomb(bomb); // Pasar la bomba como parámetro
      console.log("meju");
    }, 2000);
  }

  destroyBomb(bomb) {
    // Recibir la bomba como parámetro
    const bombIndex = this.bombs.indexOf(bomb); // Usar this.bombs para acceder al arreglo de bombas
    if (bombIndex !== -1) {
      this.bombs.splice(bombIndex, 1); // Usar this.bombs para modificar el arreglo de bombas
    }
    //creo la explosion
    const explosion = new Explosion(bomb.x, bomb.y);
    //añado la explosion al array
    this.explosions.push(explosion);
    //eliminar los muros colindantes
    destroyWall(bomb);
    setTimeout(() => {
      const explosionIndex = this.explosions.indexOf(explosion); // Usar this.explosions para acceder al arreglo de explosiones
      if (explosionIndex !== -1) {
        this.explosions.splice(explosionIndex, 1); // Usar this.explosions para modificar el arreglo de explosiones
      }
    }, 500);
  }
}
