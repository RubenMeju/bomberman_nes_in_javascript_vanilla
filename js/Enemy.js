class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = cellSize;
    this.speed = 1;
    this.direction = "right";
    this.isAlive = true;
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
      death: [
        { x: 16 * 6, y: 16 * 15 },
        { x: 16 * 7, y: 16 * 15 },
        { x: 16 * 8, y: 16 * 15 },
        { x: 16 * 9, y: 16 * 15 },
        { x: 16 * 10, y: 16 * 15 },
      ],
    };
    // Índice de frame actual en la animación
    this.currentFrameIndex = 0;
    // Contador de frames para la animación
    this.frameCount = 0;
    // Velocidad de la animación
    this.animationSpeed = 12; // Ajusta esto según la velocidad deseada
    this.framesNumber = 3;
  }

  update() {
    this.move();
    this.draw();
    if (this.direction === "death") {
      this.animate();
    }
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

  move() {
    let newX = this.x;
    let newY = this.y;
    this.animate();

    // Mover al enemigo según la dirección actual
    switch (this.direction) {
      case "left":
        newX -= this.speed;
        break;
      case "right":
        newX += this.speed;
        break;
      case "up":
        newY -= this.speed;
        break;
      case "down":
        newY += this.speed;
        break;
    }

    // Verificar si el nuevo movimiento está dentro de los límites del tablero
    if (
      newX >= 0 &&
      newX + this.size <= boardWidth &&
      newY >= 0 &&
      newY + this.size <= boardHeight &&
      !this.isCollisionWalls(newX, this.y) &&
      !this.isCollisionWalls(this.x, newY)
    ) {
      this.x = newX;
      this.y = newY;
    } else {
      // Si hay colisión o el movimiento excede los límites del tablero, cambiar la dirección aleatoriamente
      this.changeDirectionRandomly();
    }

    // Verificar colisión con las bombas
    if (this.isCollisionEnemyWithbombs()) {
      // Cambiar la dirección del enemigo
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

  isCollisionWalls() {
    let enemyLeft = this.x;
    let enemyRight = this.x + this.size;
    let enemyTop = this.y;
    let enemyBottom = this.y + this.size;

    for (let i = 0; i < walls.length; i++) {
      let wallLeft = walls[i].x;
      let wallRight = walls[i].x + cellSize;
      let wallTop = walls[i].y;
      let wallBottom = walls[i].y + cellSize;

      // Verificar si hay colisión en la dirección específica
      switch (this.direction) {
        case "left":
          if (
            enemyLeft - this.speed < wallRight &&
            this.x > wallLeft &&
            enemyBottom > wallTop &&
            enemyTop < wallBottom
          ) {
            return true;
          }
          break;
        case "right":
          if (
            enemyRight + this.speed > wallLeft &&
            this.x < wallRight &&
            enemyBottom > wallTop &&
            enemyTop < wallBottom
          ) {
            return true;
          }
          break;
        case "up":
          if (
            enemyTop - this.speed < wallBottom &&
            this.y > wallTop &&
            enemyRight > wallLeft &&
            enemyLeft < wallRight
          ) {
            return true;
          }
          break;
        case "down":
          if (
            enemyBottom + this.speed > wallTop &&
            this.y < wallBottom &&
            enemyRight > wallLeft &&
            enemyLeft < wallRight
          ) {
            return true;
          }
          break;
      }
    }

    return false;
  }

  isCollisionEnemyWithbombs() {
    for (let i = 0; i < enemies.length; i++) {
      //console.log("enemigo" + i + ":" + enemies[i]);
      for (let j = 0; j < player.bombs.length; j++) {
        //console.log("entramos en check colision");
        let bomb = player.bombs[j];
        // console.log("bombaaaaa: ", bomb);
        if (checkCollision(enemies[i], bomb)) {
          return true;
        }
      }
    }
    return false;
  }

  destroy(enemy) {
    //  console.log("destroy: ");
    this.isAlive = false;
    this.direction = "death";
    this.framesNumber = 5;
    this.animationSpeed = 18;
    setTimeout(() => {
      //eliminar el enemigo
      // Encontrar el índice de la explosión dentro del array de explosiones del jugador
      let explosionIndex = enemies.indexOf(enemy);
      if (explosionIndex !== -1) {
        playerScore += 100;
        // Si se encontró la explosión dentro del array, eliminarla
        enemies.splice(explosionIndex, 1);
      }
    }, 300);
  }

  animate() {
    animate.call(this); // Llama a la función de animación común
  }
}
