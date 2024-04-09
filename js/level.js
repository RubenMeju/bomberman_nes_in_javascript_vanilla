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
    const posX = j * cellSize;
    const posY = i * cellSize;

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
