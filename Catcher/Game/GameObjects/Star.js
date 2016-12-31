class Star extends GameObject {
    constructor(width, height, x, y, canvas, speed, ship) {
        super(width, height, x, y, canvas);
        this.shootingStar = false;
        this.steps = 100;
        this.slowDownFactor = 0.95;
        this.vector = new Vector(speed, speed, 0);
        this.speed = speed;
        this.blinkCounter = 1000;
        this.blinkSpeed = (0.05 * Math.random()) + 0.03;
        this.ship = ship;
    }
    ShootingStart() {
        this.shootingStar = true;
        this.speedX = ((Math.random() * System.resolutionX) - this.x) / this.steps;
        this.speedY = ((Math.random() + System.resolutionY) - this.y) / this.steps;
        this.stepsTaken = 0;
    }
    Act() {
        super.Act();
        if (this.shootingStar) {
            this.vector.x = this.speedX;
            this.vector.y = this.speedY;
            this.stepsTaken++;
            if (this.stepsTaken >= this.steps) {
                this.shootingStar = false;
                this.vector.x = 0;
                this.vector.y = 0;
                this.x = Math.random() * System.resolutionX;
                this.y = Math.random() * System.resolutionY;
            }
        }
        else {
            if (this.ship.vector.x != 0) {
                this.vector.x = -1 * (this.ship.vector.x / 2) * this.speed;
            }
            else {
                this.vector.x = this.vector.x * this.slowDownFactor;
            }
            if (this.ship.vector.y != 0) {
                this.vector.y = -1 * (this.ship.vector.y / 2) * this.speed;
            }
            else {
                this.vector.y = this.vector.y * this.slowDownFactor;
            }
        }
        this.blinkCounter += this.blinkSpeed;
        if (this.blinkCounter % 100 == 0) {
            this.blinkCounter = 0;
        }
        this.alpha = this.speed * Math.abs(Math.sin(this.blinkCounter)) + 0.1;
        this.canvas.DrawStar(this.x, this.y, this.width, this.alpha);
    }
}
