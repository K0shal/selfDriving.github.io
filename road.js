class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    this.left = this.x - this.width / 2 + 10;
    this.right = this.x + this.width / 2 - 10;
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;
    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomRight = { x: this.right, y: this.bottom };
    const bottomLeft = { x: this.left, y: this.bottom };
    this.borders = [[topLeft, bottomLeft],[topRight, bottomRight]];
  }
  laneStart(index) {
    const r = this.width / this.laneCount;
    return this.left + Math.min(index, this.laneCount) * r;
  }
  carPosition(i) {
    const lastS = this.laneStart(i-1);
    return lastS + (this.width / this.laneCount)/2;
  }
  draw(ctx) {+
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 7;
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(this.left, this.bottom);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.right, this.top);
    ctx.lineTo(this.right, this.bottom);
    ctx.stroke();
    for (let i = 1; i < this.laneCount; i++) {
      
      ctx.beginPath();
      ctx.lineWidth = 7;
      const x = this.laneStart(i);
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.setLineDash([80,20]);
      ctx.stroke();

    }
    ctx.setLineDash([]);
  }

}