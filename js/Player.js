class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 52; // tamaño del jugador en el canvas
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

  movement() {
    //console.log("Dirección actual:", this.direction);

    let newPos = { x: this.x, y: this.y }; // Nueva posición del jugador
    let isMoving = false; // Variable para rastrear si el jugador se está moviendo

    if (this.rightPress && this.direction === "right") {
      newPos.x += this.speed;
      isMoving = true;
    } else if (this.leftPress && this.direction === "left") {
      newPos.x -= this.speed;
      isMoving = true;
    } else if (this.upPress && this.direction === "up") {
      newPos.y -= this.speed;
      isMoving = true;
    } else if (this.downPress && this.direction === "down") {
      newPos.y += this.speed;
      isMoving = true;
    }

    if (!this.isCollision(newPos.x, newPos.y)) {
      // console.log("No hay colisión en la nueva posición. Moviendo...");
      this.x = newPos.x;
      this.y = newPos.y;
      if (isMoving) {
        this.animate(this.direction); // Animar solo si el jugador se está moviendo
      }
    } else {
      // console.log("¡Colisión detectada!");
    }
  }

  isCollision(posX, posY) {
    // Calcular los límites del área del jugador en la nueva posición
    let jugadorLeft = posX;
    let jugadorRight = posX + this.size;
    let jugadorTop = posY;
    let jugadorBottom = posY + this.size;

    // Verificar colisión con cada pared
    for (let i = 0; i < walls.length; i++) {
      // Calcular los límites del área de la pared
      let paredLeft = walls[i].x;
      let paredRight = walls[i].x + cellSize;
      let paredTop = walls[i].y;
      let paredBottom = walls[i].y + cellSize;

      // Verificar si hay intersección entre el área del jugador y el área de la pared
      if (
        jugadorRight > paredLeft &&
        jugadorLeft < paredRight &&
        jugadorBottom > paredTop &&
        jugadorTop < paredBottom
      ) {
        console.log("Colisión detectada");
        return true;
      }
    }

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
    //console.log(cellX * cellSize, cellY * cellSize);

    const bomb = new Bomb(cellX * cellSize, cellY * cellSize);
    this.bombs.push(bomb);
    setTimeout(() => {
      this.destroyBomb(bomb); // Pasar la bomba como parámetro
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
    const wall = new Wall();
    wall.destroyWall(bomb.x, bomb.y);

    setTimeout(() => {
      const explosionIndex = this.explosions.indexOf(explosion); // Usar this.explosions para acceder al arreglo de explosiones
      if (explosionIndex !== -1) {
        this.explosions.splice(explosionIndex, 1); // Usar this.explosions para modificar el arreglo de explosiones
      }
    }, 500);
  }
}
