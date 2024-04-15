// Dibuja la puntuación y la vida en la parte superior del lienzo
function drawHUD() {
  console.log("Drawing HUD...");
  canvasHub.style.backgroundColor = "gray";

  ctxHub.font = "20px Arial";
  ctxHub.fillStyle = "white";

  // Dibujar el tiempo
  ctxHub.fillText("TIME: " + gameTime, 30, canvasHub.height / 2);

  // Dibujar la puntuación
  ctxHub.fillText(playerScore, canvasHub.width / 2, canvasHub.height / 2);

  // Dibujar la vida del jugador
  ctxHub.fillText(
    "LEFT: " + playerLives,
    canvasHub.width - 100,
    canvasHub.height / 2
  );
}
