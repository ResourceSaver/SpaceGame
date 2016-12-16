class GameObject {
    constructor(width, height, x, y, canvas) {
        this.vector = new Vector(0, 0, 0);
        this.drawableCollection = new DrawableCollection();
        this.state = ObjectState.ALIVE;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.heightHalf = this.height / 2;
        this.widthHalf = this.width / 2;
        this.AdjustBoundingbox(0, 0);
    }
    AdjustBoundingbox(widthDiff, heightDiff) {
        this.boundingBoxHeight = this.height + heightDiff;
        this.boundingBoxWidth = this.width + widthDiff;
        this.boundingBoxHeightHalf = this.boundingBoxHeight / 2;
        this.boundingBoxWidthHalf = this.boundingBoxWidth / 2;
    }
    GetDrawableCollection() { return this.drawableCollection; }
    Act() {
        this.x += this.vector.x;
        this.y -= this.vector.y;
        if (this.x > System.resolutionX) {
            this.x = 0 - this.width;
        }
        else if (this.x + this.width < 0) {
            this.x = System.resolutionX;
        }
        if (this.y > System.resolutionY) {
            this.y = 0 - this.height;
        }
        else if (this.y + this.height < 0) {
            this.y = System.resolutionY;
        }
    }
    Draw() {
        this.canvas.DrawObject(this);
    }
    CollisionCheck(gameObject) {
        this.Dx = Math.abs(this.GetCenterX() - gameObject.GetCenterX());
        this.Dy = Math.abs(this.GetCenterY() - gameObject.GetCenterY());
        return (this.Dx < (this.boundingBoxWidthHalf + gameObject.boundingBoxWidthHalf) && this.Dy < (this.boundingBoxHeightHalf + gameObject.boundingBoxHeightHalf));
    }
    GetCenterX() {
        return this.x + this.widthHalf;
    }
    GetCenterY() {
        return this.y + this.heightHalf;
    }
    GetBoundingX() {
        return this.x + this.widthHalf - this.boundingBoxWidthHalf;
    }
    GetBoundingY() {
        return this.y + this.heightHalf - this.boundingBoxHeightHalf;
    }
    SetState(objectState) { this.state = objectState; }
    Is(objectState) { return this.state == objectState; }
    IsNot(objectState) { return this.state != objectState; }
    Hit() {
        this.hitCounter = 0.5;
        AudioLibrary.Play(11);
    }
}
