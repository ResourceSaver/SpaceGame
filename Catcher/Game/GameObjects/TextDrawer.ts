class TextDrawer extends GameObject{

    private text: string;
    private fontSize: number;
    private maxVal = 2;
    private count = 0;
    private alpha: number = 0;
    private startValue = 75;

    constructor() {
        super(0, 0, 0, 0, System.canvas);

        this.fontSize = this.startValue;
    }

    public SetText(value: string) {

        this.fontSize = this.startValue;

        this.count = 0;

        this.text = value;

    }

    public Act() {

        if (this.count > this.maxVal) return false;

        this.alpha = -1 * Math.pow(this.count, 2) + 2 * this.count;

        this.count += 0.03;

        this.fontSize += 3;

        this.canvas.DrawLevelText(this.text, this.fontSize, this.alpha);

        return (this.count > this.maxVal);

    }

}