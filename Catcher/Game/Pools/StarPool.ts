class StarPool {

    private stars: Array<Star>;

    private ship: Ship;

    constructor(ship:Ship) {

        this.stars = new Array<Star>();

        this.ship = ship;

        this.CreateStars(120);
    }

    private CreateStars(number: number) {

        let x, y, ran, size, speed;

        for (let i = 0; i < number; i++) {

            x = Math.round(Math.random() * System.resolutionX);

            y = Math.round(Math.random() * System.resolutionY);

            ran = Math.random();

            size = ran * 1.3;

            speed = ran;

            if (size < 0.07) {
                size = 0.07;
            }

            this.stars.push(new Star(size, size, x, y, System.canvas, speed, this.ship));

        }

    }

    private count = 0;

    private shootingStar = 25000;

    public Act() {

        for (let i = 0; i < this.stars.length; i++) {

            this.count++;

            this.stars[i].Act();

            if (this.count == this.shootingStar) {
                this.stars[i].ShootingStart();
                this.count = 0;
            }

        }

    }

}