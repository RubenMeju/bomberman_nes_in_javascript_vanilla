function keyDownHandler(event) {
  const { key } = event;
  if (player.isAlive) {
    console.log("keyDownHandler", key);
    if (key === "right" || key === "ArrowRight") {
      player.rightPress = true;
      player.direction = "right";
    } else if (key === "left" || key === "ArrowLeft") {
      player.leftPress = true;
      player.direction = "left";
    } else if (key === "up" || key === "ArrowUp") {
      player.upPress = true;
      player.direction = "up";
    } else if (key === "down" || key === "ArrowDown") {
      player.downPress = true;
      player.direction = "down";
    } else if (key === " ") {
      player.placeBomb();
    }
  }

  if (key === "Enter") {
    startGame();
  }
}

function keyUpHandler(event) {
  const { key } = event;
  if (key === "right" || key === "ArrowRight") {
    player.rightPress = false;
  } else if (key === "left" || key === "ArrowLeft") {
    player.leftPress = false;
  } else if (key === "up" || key === "ArrowUp") {
    player.upPress = false;
  } else if (key === "down" || key === "ArrowDown") {
    player.downPress = false;
  }
}

function init() {
  document.addEventListener("keydown", (event) => keyDownHandler(event));
  document.addEventListener("keyup", (event) => keyUpHandler(event));
}
