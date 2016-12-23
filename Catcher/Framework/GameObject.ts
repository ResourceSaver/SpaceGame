class GameObject {

    public vector: Vector;

    protected state: ObjectState;

    protected drawableCollection: DrawableCollection;

    protected canvas: Canvas;

    public energy: number;

    public hitCounter;

    public x: number;

    public y: number;

    public width: number;

    public height: number;

    public widthHalf: number;

    public heightHalf: number;

    public boundingBoxWidth: number;

    public boundingBoxHeight: number;

    public boundingBoxWidthHalf: number;

    public boundingBoxHeightHalf: number;

    public hitColor: string;

    public drawRotate: boolean;

    private Dx: number;

    private Dy: number;

    constructor(width: number, height: number, x: number, y: number, canvas: Canvas) {

        this.drawRotate = false;

        this.vector = new Vector(0, 0, 0);

        this.drawableCollection = new DrawableCollection();

        this.state = ObjectState.ALIVE;

        this.canvas = canvas;

        this.x = x;

        this.y = y;

        this.height = height;

        this.width = width;

        this.hitCounter = 0;

        this.heightHalf = this.height / 2;

        this.widthHalf = this.width / 2;

        this.AdjustBoundingbox(0, 0);
    }

    protected AdjustBoundingbox(widthDiff: number, heightDiff: number) {

        this.boundingBoxHeight = this.height + heightDiff;

        this.boundingBoxWidth = this.width + widthDiff;

        this.boundingBoxHeightHalf = this.boundingBoxHeight / 2;

        this.boundingBoxWidthHalf = this.boundingBoxWidth / 2;

    }

    public GetDrawableCollection() { return this.drawableCollection; }

    public Act() {

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

    public HitByBullet(attack:number):void {

        this.hitCounter = 0.2;

        AudioLibrary.Play(11);

    }

    public Draw() { // use strategi pattern

        if (this.drawRotate) {
            this.DrawObjectRotate();
        }
        else {
            this.DrawNonRotate();
        }
       
    }

    private DrawNonRotate() {

        this.canvas.DrawObject(this);

        this.DrawHitCircle();

    }

    private DrawObjectRotate() {

        this.canvas.DrawObjectRotate(this);

        this.DrawHitCircle();

    }

    private DrawHitCircle() {

        if (this.hitCounter > 0 && this.Is(ObjectState.ALIVE)) {

            this.hitCounter -= 0.007;

            if (this.hitCounter < 0) {
                this.hitCounter = 0;
            }

            this.canvas.DrawHitCircle(this);

        }
    }
    
    public CollisionCheck(gameObject: GameObject) { 

        this.Dx = Math.abs(this.GetCenterX() - gameObject.GetCenterX());

        this.Dy = Math.abs(this.GetCenterY() - gameObject.GetCenterY());

        return (this.Dx < (this.boundingBoxWidthHalf + gameObject.boundingBoxWidthHalf) && this.Dy < (this.boundingBoxHeightHalf + gameObject.boundingBoxHeightHalf));

    }

    public GetCenterX() {
        return this.x + this.widthHalf;
    }

    public GetCenterY() {
        return this.y + this.heightHalf;
    }

    public GetBoundingX() {

        return this.x + this.widthHalf - this.boundingBoxWidthHalf;

    }

    public GetBoundingY() {

        return this.y + this.heightHalf - this.boundingBoxHeightHalf;

    }

    public SetState(objectState: ObjectState) { this.state = objectState; }

    public Is(objectState: ObjectState) { return this.state == objectState; }

    public IsNot(objectState: ObjectState) { return this.state != objectState; }

}

