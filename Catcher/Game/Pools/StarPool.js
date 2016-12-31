class StarPool {
    constructor(ship) {
        this.count = 0;
        this.shootingStar = 25000;
        this.stars = new Array();
        this.ship = ship;
        this.CreateStars(100);
    }
    CreateStars(number) {
        let x, y, ran, size, speed;
        for (let i = 0; i < number; i++) {
            x = Math.round(Math.random() * System.resolutionX);
            y = Math.round(Math.random() * System.resolutionY);
            ran = Math.random();
            size = ran;
            speed = ran;
            if (size < 0.07) {
                size = 0.07;
            }
            this.stars.push(new Star(size, size, x, y, System.canvas, speed, this.ship));
        }
    }
    Act() {
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
