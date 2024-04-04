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

function drawLevel() {
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      const posX = j * cellSize;
      const posY = i * cellSize;

      if (level[i][j] === 1) {
        ctx.drawImage(
          imgSprites, // Imagen a dibujar
          16 * 3, // Posición X del sprite en la imagen (posXSprite), multiplicado por 16 ya que cada sprite tiene un ancho de 16 píxeles
          16 * 3, // Posición Y del sprite en la imagen (posYSprite), multiplicado por 16 ya que cada sprite tiene una altura de 16 píxeles
          16, // Tamaño del sprite en el eje X (tamañoX del sprite)
          16, // Tamaño del sprite en el eje Y (tamañoY del sprite)
          posX, // Posición X en el lienzo donde se dibujará el sprite (posX en el canvas)
          posY, // Posición Y en el lienzo donde se dibujará el sprite (posY en el canvas)
          cellSize, // Tamaño del sprite en el eje X en el lienzo
          cellSize // Tamaño del sprite en el eje Y en el lienzo
        );
      } else if (level[i][j] === 2) {
        ctx.drawImage(
          imgSprites,
          16 * 4, // posXSpray
          16 * 3, // posYSpray
          16, // tamañoX del sprite
          16, // tamañoY del sprite
          posX, // posX en el canvas
          posY, // posY en el canvas
          cellSize,
          cellSize
        );
      }
    }
  }
}

function destroyWall(explosion) {
  let cellX = Math.floor(explosion.x / cellSize); //posicion X de la bomba
  let cellY = Math.floor(explosion.y / cellSize); // posicion Y de la bomba
  //console.log(cellY, cellX);

  // Verificar celdas adyacentes
  // Se asume que level es una matriz definida previamente que contiene el mapa del juego
  // Donde 2 representa una pared
  // Se asume que cellSize es el tamaño de una celda en el mapa

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
