class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = cellSize - 10; // tamaño del jugador en el canvas
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
    this.isAlive = true;
    this.lives = 3;

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
      death: [
        { x: 0, y: 32 },
        { x: 16, y: 32 },
        { x: 16 * 2, y: 32 },
        { x: 16 * 3, y: 32 },
        { x: 16 * 4, y: 32 },
        { x: 16 * 5, y: 32 },
        { x: 16 * 6, y: 32 },
      ],
    };
    // Índice de frame actual en la animación
    this.currentFrameIndex = 0;
    // Contador de frames para la animación
    this.frameCount = 0;
    // Velocidad de la animación
    this.animationSpeed = 5; // Ajusta esto según la velocidad deseada
    // Número de frames para la animación
    this.framesNumber = 3;
  }

  update() {
    this.draw();
    this.movement();
    this.isCollisionPlayerWithEnemies();

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

  movement() {
    if (this.direction !== "death") {
      let newPos = { x: this.x, y: this.y }; // Nueva posición del jugador

      if (this.rightPress && this.direction === "right") {
        newPos.x += this.speed;
        this.animate();
      } else if (this.leftPress && this.direction === "left") {
        newPos.x -= this.speed;
        this.animate();
      } else if (this.upPress && this.direction === "up") {
        newPos.y -= this.speed;
        this.animate();
      } else if (this.downPress && this.direction === "down") {
        newPos.y += this.speed;
        this.animate();
      }

      if (!this.isCollisionWalls(newPos.x, newPos.y)) {
        // console.log("No hay colisión en la nueva posición. Moviendo...");
        this.x = newPos.x;
        this.y = newPos.y;
      }
    }
  }

  isCollisionWalls(posX, posY) {
    // Crear objeto que representa al jugador en la nueva posición
    const jugador = {
      x: posX,
      y: posY,
      size: this.size,
    };

    // Verificar colisión con cada pared
    for (let i = 0; i < walls.length; i++) {
      // Crear objeto que representa a la pared
      const pared = {
        x: walls[i].x,
        y: walls[i].y,
        size: cellSize,
      };

      // Si la puerta no está activa, verificar colisión
      if (!walls[i].isDoorSecretActive && checkCollision(jugador, pared)) {
        // console.log("Colisión detectada");
        return true;
      }
    }

    return false;
  }

  placeBomb() {
    // Calcular la celda actual del jugador
    let cellX = Math.floor(this.x / cellSize);
    let cellY = Math.floor(this.y / cellSize);

    // Calcular el offset del jugador dentro de la celda actual
    let offsetX = this.x % cellSize;
    let offsetY = this.y % cellSize;

    // Ajustar la posición de la bomba según el offset del jugador
    if (offsetX > cellSize / 2) {
      cellX++;
    }
    if (offsetY > cellSize / 2) {
      cellY++;
    }

    // Calcular las coordenadas reales de la celda para colocar la bomba
    const bombX = cellX * cellSize;
    const bombY = cellY * cellSize;

    // Crear la bomba y agregarla al array de bombas del jugador
    const bomb = new Bomb(bombX, bombY);
    this.bombs.push(bomb);
    reproducirSonido("plantBomb");
    // Establecer un temporizador para destruir la bomba después de 2 segundos
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
    reproducirSonido("explosion");

    setTimeout(() => {
      const explosionIndex = this.explosions.indexOf(explosion); // Usar this.explosions para acceder al arreglo de explosiones
      if (explosionIndex !== -1) {
        this.explosions.splice(explosionIndex, 1); // Usar this.explosions para modificar el arreglo de explosiones
      }
    }, 500);
  }

  isCollisionPlayerWithEnemies() {
    if (!this.isAlive) return;
    // Verificar colisión con cada enemy
    for (let i = 0; i < enemies.length; i++) {
      //console.log(enemies[i]);
      if (checkCollision(player, enemies[i])) {
        if (this.isAlive) {
          this.deathPlayer();
        }
      }
    }
  }

  deathPlayer() {
    console.log("deathPlayer: ");
    this.isAlive = false;
    this.direction = "death";
    this.framesNumber = 7;
    this.animationSpeed = 12;
    reproducirSonido("deathPlayer");
    this.lives -= 1;

    setTimeout(() => {
      //isPlaying = false;
      // player = [];
      this.direction = "right";

      this.framesNumber = 3;
      this.animationSpeed = 5;
      this.isAlive = true;

      //restartGame();
    }, 900);
  }

  animate() {
    animate.call(this); // Llama a la función de animación común
  }
}
