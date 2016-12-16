class StarPool {
    constructor() {
        this.stars = new Array();
        this.CreateStars(50);
    }
    CreateStars(number) {
        for (let i = 0; i < number; i++) {
            let x = Math.round(Math.random() * System.resolutionX);
            let y = Math.round(Math.random() * System.resolutionY);
            let size = Math.random() * 1.3 + 0.8;
            this.stars.push(new Star(size, size, x, y, System.canvas));
        }
    }
    Act() {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].Act();
        }
    }
}
