function animate() {
  if (this.direction === "death") {
    this.framesNumber = 7;
    this.animationSpeed = 12;
  } else {
    this.framesNumber = 3;
    this.animationSpeed = 5;
  }
  this.frameCount++;
  if (this.frameCount >= this.animationSpeed) {
    this.frameCount = 0;
    this.currentFrameIndex = (this.currentFrameIndex + 1) % this.framesNumber;
  }

  this.frameX = this.animationFrames[this.direction][this.currentFrameIndex].x;
  this.frameY = this.animationFrames[this.direction][this.currentFrameIndex].y;
}

function checkCollision(objectA, objectB) {
  // Obtener los límites de los objetos
  let objectALeft = objectA.x;
  let objectARight = objectA.x + objectA.size;
  let objectATop = objectA.y;
  let objectABottom = objectA.y + objectA.size;

  let objectBLeft = objectB.x;
  let objectBRight = objectB.x + objectB.size;
  let objectBTop = objectB.y;
  let objectBBottom = objectB.y + objectB.size;

  // Verificar si hay colisión
  if (
    objectARight > objectBLeft &&
    objectALeft < objectBRight &&
    objectABottom > objectBTop &&
    objectATop < objectBBottom
  ) {
    return true; // Hay colisión
  }

  return false; // No hay colisión
}
