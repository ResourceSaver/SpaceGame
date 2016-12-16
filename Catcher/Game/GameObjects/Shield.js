class Shield extends GameObject {
    constructor() {
        super(156, 156, 0, 0, System.canvas);
        this.drawableCollection = DrawableLibrary.GetShield();
    }
    ShadowDraw(x, y, angle) {
        this.x = x - this.widthHalf;
        this.y = y - this.heightHalf;
        this.vector.angle = angle;
        this.canvas.DrawObjectRotate(this);
    }
}
