// Constantes significativas
const WALL_TYPE = {
  NORMAL: 1,
  SECRET_DOOR: 2,
  EMPTY: 0,
};

let secretDoorAssigned = false;
const secretDoorIndices = [];

function createWalls() {
  createNormalWalls();
  assignSecretDoor();
}

function createNormalWalls() {
  for (let i = 0; i < levels[currentLevel].length; i++) {
    for (let j = 0; j < levels[currentLevel][i].length; j++) {
      const posX = j * cellSize;
      const posY = i * cellSize;

      if (levels[currentLevel][i][j] === WALL_TYPE.NORMAL) {
        walls.push(new Wall(posX, posY, WALL_TYPE.NORMAL));
      } else if (levels[currentLevel][i][j] === WALL_TYPE.SECRET_DOOR) {
        const wall = new Wall(posX, posY, WALL_TYPE.SECRET_DOOR);
        walls.push(wall);
        secretDoorIndices.push(walls.length - 1);
      }
    }
  }
}

function assignSecretDoor() {
  if (secretDoorIndices.length > 0 && !secretDoorAssigned) {
    const randomIndex = Math.floor(Math.random() * secretDoorIndices.length);
    const selectedIndex = secretDoorIndices[randomIndex];
    cellDoorSecret = walls[selectedIndex];
    walls[selectedIndex].isDoorSecret = true;
    secretDoorAssigned = true;
  }
}

function getEmptyCellCoordinates() {
  const coordinates = [];
  for (let i = 0; i < levels[currentLevel].length; i++) {
    for (let j = 0; j < levels[currentLevel][i].length; j++) {
      let cellX = j * cellSize;
      let cellY = i * cellSize;

      if (levels[currentLevel][i][j] === WALL_TYPE.EMPTY) {
        coordinates.push({ x: cellX, y: cellY });
      }
    }
  }
  return coordinates;
}

function createEnemies() {
  for (let i = 0; i < totalEnemies; i++) {
    const randomcoordinate =
      emptycoordinates[Math.floor(Math.random() * emptycoordinates.length)];
    const enemyX = randomcoordinate.x;
    const enemyY = randomcoordinate.y;
    enemies.push(new Enemy(enemyX, enemyY));
  }
}

function drawLevel() {
  walls.forEach((wall) => {
    if (wall.isDoorSecret && wall.isDoorSecretActive) {
      drawMagicDoor(wall.x, wall.y);
    } else {
      wall.draw();
    }
  });
}

function drawBorderCell() {
  for (let i = 0; i < levels[currentLevel].length; i++) {
    for (let j = 0; j < levels[currentLevel][i].length; j++) {
      const posX = j * cellSize;
      const posY = i * cellSize;
      ctx.beginPath();
      ctx.moveTo(posX, posY);
      ctx.lineTo(posX + cellSize, posY);
      ctx.lineTo(posX + cellSize, posY + cellSize);
      ctx.lineTo(posX, posY + cellSize);
      ctx.closePath();
      ctx.stroke();
      ctx.fillText(`(${cellSize * j}, ${cellSize * i})`, posX + 5, posY + 15);
    }
  }
}
