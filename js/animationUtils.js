function animate() {
  this.frameCount++;
  if (this.frameCount >= this.animationSpeed) {
    this.frameCount = 0;
    this.currentFrameIndex = (this.currentFrameIndex + 1) % this.framesNumber;
  }

  this.frameX = this.animationFrames[this.direction][this.currentFrameIndex].x;
  this.frameY = this.animationFrames[this.direction][this.currentFrameIndex].y;
}
