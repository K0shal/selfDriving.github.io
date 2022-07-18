class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.speed = 0;
        this.acceleration = .2;
        this.maxSpeed = 3;
        this.angle = 0;
        this.friction = 0.05;
        this.controls = new Controls();
    }
    update() {
        if (this.controls.forwd) {
            this.speed += this.acceleration;
        }
        if (this.controls.backwd) {
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        let flip = 0;
        if (this.speed > 0) {
            flip = 1;
        } else {
            flip=-1;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (this.controls.left) {
            this.angle -= .03*flip;
        }
        if (this.controls.right)
            this.angle += .03*flip;


        if (Math.abs(this.speed) < this.friction) this.speed = 0;
        this.y -= Math.cos(this.angle) * this.speed;
        this.x += Math.sin(this.angle) * this.speed;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.fillStyle = "red"
        ctx.rect(- this.width / 2, - this.height / 2, this.width, this.height);
        ctx.fill();
        ctx.restore();
    }
}