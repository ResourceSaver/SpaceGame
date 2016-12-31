class TextDrawer extends GameObject {
    constructor() {
        super(0, 0, 0, 0, System.canvas);
        this.maxVal = 2;
        this.count = 0;
        this.alpha = 0;
        this.startValue = 75;
        this.fontSize = this.startValue;
    }
    SetText(value) {
        this.fontSize = this.startValue;
        this.count = 0;
        this.text = value;
    }
    Act() {
        if (this.count > this.maxVal)
            return false;
        this.alpha = -1 * Math.pow(this.count, 2) + 2 * this.count;
        this.count += 0.03;
        this.fontSize += 3;
        this.canvas.DrawLevelText(this.text, this.fontSize, this.alpha);
        return (this.count > this.maxVal);
    }
}
