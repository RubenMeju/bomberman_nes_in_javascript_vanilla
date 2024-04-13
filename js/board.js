// Variable para rastrear si ya se ha asignado la puerta secreta
let secretDoorAssigned = false;

// Array para almacenar los índices de los muros con valor 2
const secretDoorIndices = [];

// Añadir cada wall a wallets
for (let i = 0; i < level.length; i++) {
  for (let j = 0; j < level[i].length; j++) {
    const posX = j * cellSize;
    const posY = i * cellSize;

    if (level[i][j] === 1) {
      walls.push(new Wall(posX, posY, 1));
    } else if (level[i][j] === 2) {
      const wall = new Wall(posX, posY, 2);
      walls.push(wall);
      secretDoorIndices.push(walls.length - 1); // Almacenar el índice del muro con valor 2
    }
  }
}

// Verificar si hay muros con valor 2 para asignar aleatoriamente la puerta secreta
if (secretDoorIndices.length > 0) {
  // Obtener un índice aleatorio dentro del rango de secretDoorIndices
  const randomIndex = Math.floor(Math.random() * secretDoorIndices.length);

  // Obtener el índice del muro con valor 2 seleccionado aleatoriamente
  const selectedIndex = secretDoorIndices[randomIndex];
  console.log("celda con la puerta secreta: ", selectedIndex);
  cellDoorSecret = selectedIndex;
  // Asignar la propiedad isDoorSecret al muro seleccionado
  walls[selectedIndex].isDoorSecret = true;
}

console.log(walls);

function drawLevel() {
  walls.forEach((wall) => {
    if (wall.isDoorSecret && wall.isDoorSecretActive) {
      drawMagicDoor(wall.x, wall.y);
    } else {
      wall.draw();
    }
  });
}

function getEmptyCellCoordinates() {
  const coordinates = [];
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      let cellX = j * cellSize;
      let cellY = i * cellSize;

      if (level[i][j] === 0) {
        coordinates.push({ x: cellX, y: cellY });
      }
    }
  }
  return coordinates;
}

function createEnemies() {
  // Crear los enemigos y añadirlos a enemies
  for (let i = 0; i < totalEnemies; i++) {
    // Obtener una coordenada vacía al azar
    const randomcoordinate =
      emptycoordinates[Math.floor(Math.random() * emptycoordinates.length)];

    // Crear un enemigo en la coordenada aleatoria
    const enemyX = randomcoordinate.x;
    const enemyY = randomcoordinate.y;

    enemies.push(new Enemy(enemyX, enemyY));
  }
}

// para desarrollo (muestra los px de cada celda)
function drawBorderCell() {
  // Coordenadas del cuadrado
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      const posX = j * cellSize;
      const posY = i * cellSize;
      // Dibujar el borde del cuadrado
      ctx.beginPath();
      ctx.moveTo(posX, posY);
      ctx.lineTo(posX + cellSize, posY);
      ctx.lineTo(posX + cellSize, posY + cellSize);
      ctx.lineTo(posX, posY + cellSize);
      ctx.closePath(); // Cerrar el camino
      ctx.stroke(); // Dibujar el borde

      // Mostrar coordenadas de la celda
      ctx.fillText(`(${cellSize * j}, ${cellSize * i})`, posX + 5, posY + 15); // Ajusta la posición del texto según tu preferencia
    }
  }
}

/*
function findSecretDoor(walls) {
  for (let i = 0; i < walls.length; i++) {
    if (walls[i].isDoorSecret) {
      return i; // Retorna el índice del muro con isDoorSecret en true
    }
  }
  return -1; // Retorna -1 si no encuentra ningún muro con isDoorSecret en true
}

const secretDoorIndex = findSecretDoor(walls);
if (secretDoorIndex !== -1) {
  console.log("Se encontró la puerta secreta en la posición:", secretDoorIndex);
} else {
  console.log("No se encontró ninguna puerta secreta.");
}
*/
