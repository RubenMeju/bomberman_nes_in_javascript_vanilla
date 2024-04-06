class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = cellSize;
    this.speed = 2;
    this.direction = "down";

    // Frames de animación para cada dirección
    this.animationFrames = {
      right: [
        { x: 0, y: 16 * 15 },
        { x: 16, y: 16 * 15 },
        { x: 16 * 2, y: 16 * 15 },
      ],
      left: [
        { x: 16 * 3, y: 16 * 15 },
        { x: 16 * 4, y: 16 * 15 },
        { x: 16 * 5, y: 16 * 15 },
      ],
      up: [
        { x: 0, y: 16 * 15 },
        { x: 16, y: 16 * 15 },
        { x: 16 * 2, y: 16 * 15 },
      ],
      down: [
        { x: 16 * 3, y: 16 * 15 },
        { x: 16 * 4, y: 16 * 15 },
        { x: 16 * 5, y: 16 * 15 },
      ],
    };
    // Índice de frame actual en la animación
    this.currentFrameIndex = 0;
    // Contador de frames para la animación
    this.frameCount = 0;
    // Velocidad de la animación
    this.animationSpeed = 12; // Ajusta esto según la velocidad deseada
  }

  update() {
    this.move();
    this.draw();
    this.animate(this.direction);
    setInterval(() => {
      this.changeDirectionRandomly();
    }, 3000);
  }

  draw() {
    // Dibujar la imagen del sprite en el canvas
    ctx.drawImage(
      imgSprites, // Imagen de sprites que se utilizará para dibujar
      this.frameX, // Coordenada X del primer píxel del frame en la imagen de sprites
      this.frameY, // Coordenada Y del primer píxel del frame en la imagen de sprites
      16, // Ancho del frame en la imagen de sprites
      16, // Alto del frame en la imagen de sprites
      this.x, // Posición X donde se dibujará el frame en el canvas
      this.y, // Posición Y donde se dibujará el frame en el canvas
      this.size, // Ancho del frame en el canvas (tamaño de la celda)
      this.size // Alto del frame en el canvas (tamaño de la celda)
    );
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

  move() {
    let isMoving = false;
    let shouldChangeDirection = false;

    if (this.isOnCellCenter()) {
      // Si el enemigo está en el centro de una celda, verificamos si puede seguir en la dirección actual
      switch (this.direction) {
        case "right":
          if (!this.isCollisionRight()) {
            this.x += this.speed;
            isMoving = true;
          } else {
            shouldChangeDirection = true;
          }
          break;
        case "left":
          if (!this.isCollisionLeft()) {
            this.x -= this.speed;
            isMoving = true;
          } else {
            shouldChangeDirection = true;
          }
          break;
        case "up":
          if (!this.isCollisionUp()) {
            this.y -= this.speed;
            isMoving = true;
          } else {
            shouldChangeDirection = true;
          }
          break;
        case "down":
          if (!this.isCollisionDown()) {
            this.y += this.speed;
            isMoving = true;
          } else {
            shouldChangeDirection = true;
          }
          break;
      }
    } else {
      // Si el enemigo no está en el centro de una celda, sigue moviéndose en su dirección actual
      switch (this.direction) {
        case "right":
          this.x += this.speed;
          isMoving = true;
          break;
        case "left":
          this.x -= this.speed;
          isMoving = true;
          break;
        case "up":
          this.y -= this.speed;
          isMoving = true;
          break;
        case "down":
          this.y += this.speed;
          isMoving = true;
          break;
      }
    }

    // Si no puede moverse en la dirección actual, cambia de dirección
    if (!isMoving && shouldChangeDirection) {
      this.changeDirectionRandomly();
    }
  }

  isOnCellCenter() {
    // Verifica si el enemigo está en el centro de una celda
    return this.x % cellSize === 0 && this.y % cellSize === 0;
  }

  changeDirectionRandomly() {
    // Verifica si el enemigo está en el centro de una celda
    if (this.isOnCellCenter()) {
      const directions = ["up", "down", "left", "right"];
      const randomIndex = Math.floor(Math.random() * directions.length);
      this.direction = directions[randomIndex];
    }
  }

  isCollisionRight() {
    // Calcular los límites del área del enemigo en la nueva posición si se mueve hacia la derecha
    let enemyRight = this.x + this.size;
    let enemyTop = this.y;
    let enemyBottom = this.y + this.size;

    // Verificar colisión con cada pared
    for (let i = 0; i < walls.length; i++) {
      // Calcular los límites del área de la pared
      let wallLeft = walls[i].x;
      let wallRight = walls[i].x + cellSize;
      let wallTop = walls[i].y;
      let wallBottom = walls[i].y + cellSize;

      // Verificar si hay intersección entre el área del enemigo y el área de la pared
      if (
        enemyRight + this.speed > wallLeft &&
        this.x < wallRight &&
        enemyBottom > wallTop &&
        enemyTop < wallBottom
      ) {
        console.log("Enemy Colisión detectada hacia la derecha");
        return true; // Se detectó una colisión hacia la derecha
      }
    }

    return false; // No se detectaron colisiones hacia la derecha
  }

  isCollisionLeft() {
    // Calcular los límites del área del enemigo en la nueva posición si se mueve hacia la izquierda
    let enemyLeft = this.x;
    let enemyTop = this.y;
    let enemyBottom = this.y + this.size;

    // Verificar colisión con cada pared
    for (let i = 0; i < walls.length; i++) {
      // Calcular los límites del área de la pared
      let wallLeft = walls[i].x;
      let wallRight = walls[i].x + cellSize;
      let wallTop = walls[i].y;
      let wallBottom = walls[i].y + cellSize;

      // Verificar si hay intersección entre el área del enemigo y el área de la pared
      if (
        enemyLeft - this.speed < wallRight &&
        this.x > wallLeft &&
        enemyBottom > wallTop &&
        enemyTop < wallBottom
      ) {
        console.log("Enemy Colisión detectada hacia la izquierda");
        return true; // Se detectó una colisión hacia la izquierda
      }
    }

    return false; // No se detectaron colisiones hacia la izquierda
  }

  isCollisionUp() {
    // Calcular los límites del área del enemigo en la nueva posición si se mueve hacia arriba
    let enemyTop = this.y;
    let enemyLeft = this.x;
    let enemyRight = this.x + this.size;

    // Verificar colisión con cada pared
    for (let i = 0; i < walls.length; i++) {
      // Calcular los límites del área de la pared
      let wallLeft = walls[i].x;
      let wallRight = walls[i].x + cellSize;
      let wallTop = walls[i].y;
      let wallBottom = walls[i].y + cellSize;

      // Verificar si hay intersección entre el área del enemigo y el área de la pared
      if (
        enemyTop - this.speed < wallBottom &&
        this.y > wallTop &&
        enemyRight > wallLeft &&
        enemyLeft < wallRight
      ) {
        console.log("Enemy Colisión detectada hacia arriba");
        return true; // Se detectó una colisión hacia arriba
      }
    }

    return false; // No se detectaron colisiones hacia arriba
  }

  isCollisionDown() {
    // Calcular los límites del área del enemigo en la nueva posición si se mueve hacia abajo
    let enemyBottom = this.y + this.size;
    let enemyLeft = this.x;
    let enemyRight = this.x + this.size;

    // Verificar colisión con cada pared
    for (let i = 0; i < walls.length; i++) {
      // Calcular los límites del área de la pared
      let wallLeft = walls[i].x;
      let wallRight = walls[i].x + cellSize;
      let wallTop = walls[i].y;
      let wallBottom = walls[i].y + cellSize;

      // Verificar si hay intersección entre el área del enemigo y el área de la pared
      if (
        enemyBottom + this.speed > wallTop &&
        this.y < wallBottom &&
        enemyRight > wallLeft &&
        enemyLeft < wallRight
      ) {
        console.log("Enemy Colisión detectada hacia abajo");
        return true; // Se detectó una colisión hacia abajo
      }
    }

    return false; // No se detectaron colisiones hacia abajo
  }
}
