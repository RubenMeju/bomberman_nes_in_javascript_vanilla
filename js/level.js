let level = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 2, 1],
  [1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 2],
  [1, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1],
  [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0, 1],
  [1, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
  [1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1],
  [1, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2],
  [1, 2, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1],
  [1, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

for (let i = 0; i < level.length; i++) {
  for (let j = 0; j < level[i].length; j++) {
    const posX = j * 64;
    const posY = i * 64;

    // 1 pared
    if (level[i][j] === 1) {
      walls.push(new Wall(posX, posY, 1));
    } else if (level[i][j] === 2) {
      walls.push(new Wall(posX, posY, 2));
    }
  }
}

function drawLevel() {
  walls.forEach((wall) => {
    wall.draw();
    //console.log(wall);
  });
}
/*
function destroyWall(explosion) {
  let cellX = Math.floor(explosion.x / cellSize); //posicion X de la bomba
  let cellY = Math.floor(explosion.y / cellSize); // posicion Y de la bomba

  // Verificar la celda arriba
  if (cellY > 0 && level[cellY - 1][cellX] === 2) {
    console.log("La celda arriba es una pared.");
    level[cellY - 1][cellX] = 0;
  }

  // Verificar la celda abajo
  if (cellY < level.length - 1 && level[cellY + 1][cellX] === 2) {
    console.log("La celda abajo es una pared.");
    level[cellY + 1][cellX] = 0;
  }

  // Verificar la celda a la izquierda
  if (cellX > 0 && level[cellY][cellX - 1] === 2) {
    console.log("La celda a la izquierda es una pared.");
    level[cellY][cellX - 1] = 0;
  }

  // Verificar la celda a la derecha
  if (cellX < level[cellY].length - 1 && level[cellY][cellX + 1] === 2) {
    console.log("La celda a la derecha es una pared.");
    level[cellY][cellX + 1] = 0;
  }
}
*/
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
