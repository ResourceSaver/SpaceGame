class Star extends GameObject {
    constructor(width, height, x, y, canvas) {
        super(width, height, x, y, canvas);
        this.blink = false;
        this.starLight = (Math.random() * 5 + 5) / 10;
        this.starFaded = (Math.random() * 2 + 2) / 10;
        this.blinkSpeed = Math.round(Math.random() * 15 + 25);
        this.blinkCounter = 0;
    }
    Act() {
        super.Act();
        this.blinkCounter++;
        if (this.blinkCounter > this.blinkSpeed) {
            this.blink = !this.blink;
            this.blinkCounter = 0;
        }
        this.alpha = this.blink ? this.starFaded : this.starLight;
        this.canvas.DrawStar(this.x, this.y, this.width, this.alpha);
    }
}
