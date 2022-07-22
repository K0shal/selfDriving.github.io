class Ray {
    constructor(car) {
        this.rayCounts = 4;
        this.rayLenght = 120;
        this.raySpread = Math.PI/4;
        if (this.rayCounts === 1) {
        } else {
            this.angleBetweenTwoRays = (this.raySpread) / (this.rayCounts - 1);
        }

        this.rays = [];
        this.car = car;
        this.reading = [];

    }
    getReading(ray, roadBorders, traffic) {

        let touches = [];
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]
            )

            if (touch) {
                touches.push(touch);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const pol = traffic[i].polygon;
            for (let j = 0; j < pol.length; j++) {
                const touch = getIntersection(
                    ray[0], ray[1], pol[j], pol[(j + 1) % pol.length]
                )

                if (touch) {
                    touches.push(touch);
                }
            }
        }

            if (touches.length == 0) {
                return null;
            } else {
                const offsets = touches.map((e) => e.offset);
                const minOffset = Math.min(...offsets);
                const touch = touches.find(e =>
                    e.offset == minOffset);

                return touch;
            }
        }
        update(roadBorders, traffic) {
            this.rays = [];
            this.reading = [];
            for (let i = 0; i < this.rayCounts; i++) {
                let rayAngle = (this.raySpread / 2) - this.angleBetweenTwoRays * i;
                if (this.rayCounts == 1) rayAngle = 0;
                rayAngle += this.car.angle;

                const start = { x: this.car.x, y: this.car.y };
                const end = { x: this.car.x - Math.sin(rayAngle) * this.rayLenght, y: this.car.y - Math.cos(rayAngle) * this.rayLenght };
                this.rays.push([start, end]);

            }

            for (let i = 0; i < this.rays.length; i++) {

                this.reading.push(this.getReading(this.rays[i], roadBorders, traffic));
            }



        }
        draw(ctx) {


            for (let i = 0; i < this.rays.length; i++) {
                let end = this.rays[i][1];
                if (this.reading[i]) {
                    end = this.reading[i];

                }

                ctx.beginPath();
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 3;
                ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
                ctx.lineTo(end.x, end.y);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 3;
                ctx.moveTo(end.x, end.y);
                ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
                ctx.stroke();
            }
        }
    }
