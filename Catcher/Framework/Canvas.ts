class Canvas {

    private context: CanvasRenderingContext2D;

    private x: number;

    private y: number;

    constructor(canvasName: string) {

        let canvas = <HTMLCanvasElement>document.getElementById(canvasName);

        canvas.height = System.resolutionY;

        canvas.width = System.resolutionX;

        this.context = canvas.getContext("2d");

        this.context.lineWidth = 2;

        //this.DisableSmoothing(this.context);

        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "100px Verdana";
        this.context.strokeStyle = 'skyblue';
        this.context.fillStyle = 'lightblue';
                
    }
    
    //public DisableSmoothing(context) {

    //    if (context.imageSmoothingEnabled) { context.imageSmoothingEnabled = false; }
    //    else if (context.mozImageSmoothingEnabled) { context.mozImageSmoothingEnabled = false; }
    //    else if (context.msImageSmoothingEnabled) { context.msImageSmoothingEnabled = false; }
    //    else if (context.webkitImageSmoothingEnabled) { context.webkitImageSmoothingEnabled = false; }

    //}

    public Clear() { this.context.clearRect(0, 0, System.resolutionX, System.resolutionY); }

    private width: number;

    public DrawObject(gameObject: GameObject) {

        if (System.DebugMode) {

            this.context.strokeRect(gameObject.GetBoundingX(), gameObject.GetBoundingY(), gameObject.boundingBoxWidth, gameObject.boundingBoxHeight);

        }

        this.DrawDrawable(gameObject.GetDrawableCollection().GetCurrentDrawable(), gameObject.x, gameObject.y, gameObject.width, gameObject.height);

    }

    public DrawHitCircle(gameObject:GameObject) {


        this.width = gameObject.boundingBoxHeight > gameObject.boundingBoxWidth ? gameObject.boundingBoxHeight : gameObject.boundingBoxWidth;

        this.DrawCircle(gameObject.GetCenterX(), gameObject.GetCenterY(), this.width, gameObject.hitColor, gameObject.hitCounter, this.width * 0.75);

    }

    public DrawObjectRotate(gameObject: GameObject) {

        this.x = gameObject.x + gameObject.widthHalf;
        this.y = gameObject.y + gameObject.heightHalf;

        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y);
        this.DrawObject(gameObject);
        this.context.restore();

    }
    
    public DrawObjectRotateAround(gameObject:GameObject) {

        this.x = gameObject.GetCenterX();

        this.y = gameObject.GetCenterY();

        this.context.save();
        this.context.translate(this.x, this.y - gameObject.boundingBoxHeight + 20);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y + gameObject.boundingBoxHeight - 20);
        this.DrawObject(gameObject);
        this.context.restore();

    }

    public DrawDrawable(drawable: Drawable, x: number, y: number, width: number, height: number) {

        this.context.drawImage(drawable.GetImage(),
            drawable.GetOffsetX(),
            drawable.GetOffSetY(),
            drawable.GetWidth(),
            drawable.GetHeight(),
            x,
            y,
            width,
            height);

    }

    public DrawImage(image: HTMLImageElement, x: number, y: number, w: number, h: number, alpha:number = 1) {

        this.context.save();

        this.context.globalAlpha = alpha;

        this.context.drawImage(image, 0, 0, image.width, image.height, x, y, w, h); 

        this.context.restore();

    }
        
    public DrawStar(x:number, y:number, radius:number, alpha:number):void {

        this.context.save();

        this.context.strokeStyle = 'white';

        this.context.fillStyle = 'lightblue';

        this.context.globalAlpha = alpha;

        this.context.beginPath();

        this.context.arc(x, y, radius / 2, 0, 2 * Math.PI, false);

        this.context.closePath();

        this.context.stroke();

        this.context.fill();

        this.context.restore();

    }
    
    public DrawCircle(x: number, y: number, radius: number, color: string, alpha:number, lineWidth:number) {

        this.context.save();

        this.context.globalAlpha = alpha;

        this.context.strokeStyle = color;

        this.context.fillStyle = "transparent";

        this.context.beginPath();

        this.context.arc(x, y, radius / 2, 0, 2 * Math.PI, false);

        this.context.lineWidth = lineWidth;

        this.context.closePath();

        this.context.stroke();

        this.context.fill();

        this.context.restore();


    }

    public DrawRectangle(x: number, y: number, h: number, w: number, color: string = "lightblue") {

        this.context.save();

        this.context.fillStyle = color;

        this.context.fillRect(x, y, w, h);

        this.context.restore();

    }

    public DrawParticle(x, y, r, hue) {

        this.context.save();

        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.fillStyle = "hsla(" + hue + ",100%,50%,1)";
        this.context.fill();

        this.context.restore();

    }

    public DrawLevelText(text: string, fontSize:number, alpha:number) {
        
        this.context.save();
        this.context.globalAlpha = alpha;

        this.context.fillStyle = '#916DFF';
        this.context.font = fontSize + "px Impact";
        this.context.fillText(text, System.resolutionX / 2, System.resolutionY / 2);

        this.context.restore();
    }

    public DrawText(x: number, y: number, string: string, font: string, alpha:number = 1) {

        this.context.save();

        this.context.globalAlpha = alpha;

        this.context.font = font;

        this.context.textAlign = "left";

        this.context.fillText(string, x, y);

        this.context.textAlign = "center";

        this.context.restore();
        
    }

}