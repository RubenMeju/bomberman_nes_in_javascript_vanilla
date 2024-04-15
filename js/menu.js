function menu() {
  // Dibujar la imagen del sprite en el canvas
  ctx.drawImage(
    menuSprites, // Imagen de sprites que se utilizará para dibujar
    0, // Coordenada X del primer píxel del frame en la imagen de sprites
    0, // Coordenada Y del primer píxel del frame en la imagen de sprites
    256, // Ancho del frame en la imagen de sprites
    224, // Alto del frame en la imagen de sprites
    boardWidth / 4, // Posición X donde se dibujará el frame en el canvas
    0, // Posición Y donde se dibujará el frame en el canvas
    650, // Ancho del frame en el canvas (tamaño de la celda)
    569 // Alto del frame en el canvas (tamaño de la celda)
  );
}

function stage() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";

  // Dibujar el tiempo
  ctx.fillText("Stage: ", 1);
}
