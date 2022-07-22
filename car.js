class Car {
    constructor(x, y, width, height, type, color, maxspeed = 0) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.speed = maxspeed;
        this.acceleration = .1;
        this.maxSpeed = 9;
        this.angle = 0;
        this.friction = 0.05;

        if (type == "AI") {
            this.useBrain = true;
        } else {
            this.useBrain = false;
        }
        this.polygon = undefined;
        this.damaged = false;
        this.color = color


        if (type != "TRAFFIC") {
            this.ray = new Ray(this);
            if (type == "MAIN" || type == "AI")
                this.controls = new Controls();
            this.brain = new NeuralNetwork(
                [this.ray.rayCounts, 9, 4]
            );
        }
    }
    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.polygon = this.createPolygon();
            if (this.controls) {

                this.damaged = this.assessDamage(roadBorders, traffic);
                this.move()
            }
            this.y -= Math.cos(this.angle) * this.speed;
            this.x -= Math.sin(this.angle) * this.speed;
        }
        if (this.ray) {
            this.ray.update(roadBorders, traffic);

            const offsets = this.ray.reading.map(el => el == null ? 0 : 1 - el.offset);
            const out = NeuralNetwork.feedForward(offsets, this.brain);
            if (this.useBrain) {
                this.controls.forwd = out[0];
                this.controls.left = out[1];
                this.controls.right= out[2];
                this.controls.backwd = out[3];
            }
        }
    }

    move() {
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
        if (this.speed >= 0) {
            flip = 1;
        } else {
            flip = -1;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (this.controls.left) {
            this.angle += .03 * flip;
        }
        if (this.controls.right)
            this.angle -= .03 * flip;


        if (Math.abs(this.speed) < this.friction) this.speed = 0;
    }
    assessDamage(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polysIntersection(this.polygon, roadBorders[i])) return true;
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polysIntersection(this.polygon, traffic[i].polygon)) return true;
        }
        return false;

    }
    createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width / 2, this.height / 2);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        })
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        })
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        })
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        })


        return points
    }
    draw(ctx, drawSensor = false) {
        
        ctx.beginPath()
        if (this.damaged) {
            ctx.fillStyle = "gray"
        } else {
            ctx.fillStyle = this.color;
        }
      
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();
        if (this.ray && drawSensor)
            this.ray.draw(ctx);
           
            
    }
}