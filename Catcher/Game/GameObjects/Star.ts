class Star extends GameObject {

    private blinkSpeed: number;
    private blinkCounter: number;
    private starLight: number;
    private ship: Ship;
    private speed;
    private alpha: number;
    private shootingStar: boolean = false;
    private steps: number = 100;
    private destX: number;
    private destY: number;
    private deltaX: number;
    private deltaY: number;
    private speedX: number;
    private speedY: number;
    private stepsTaken: number;
    private slowDownFactor = 0.95;

    constructor(width:number, height:number, x:number, y:number, canvas:Canvas, speed: number, ship:Ship) {
        super(width, height, x, y, canvas);

        this.vector = new Vector(speed, speed, 0);

        this.speed = speed;

        this.starLight = (speed * 5 + 5) / 10;

        this.blinkSpeed = 1000;

        this.blinkCounter = 1000 * Math.random();

        this.ship = ship;
    }

    public ShootingStart() {
        this.shootingStar = true;
        this.destX = Math.random() * System.resolutionX;
        this.destY = Math.random() + System.resolutionY;

        this.deltaX = this.destX - this.x;
        this.deltaY = this.destY - this.y;

        this.speedX = this.deltaX / this.steps;
        this.speedY = this.deltaY / this.steps;

        this.stepsTaken = 0;
    }

    public Act() {

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

        this.blinkCounter += 0.03;

        if (this.blinkCounter > this.blinkSpeed) {

            this.blinkCounter = 0;

        }

        this.alpha = this.starLight * (Math.abs(Math.sin(this.blinkCounter)) + 0.2);

        this.canvas.DrawStar(this.x, this.y, this.width, this.alpha);

    }

}