class DrawableAnimation extends Drawable {

    private numberOfFrames: number;
    private currentFrame: number;
    private animationSpeed: number;
    private animationSpeedCounter: number;
    private animationFinishedEvent: Function;

    constructor(image: HTMLImageElement, length: number, offsetX: number, offsetY: number, width: number, height: number, speed: number, name: string, finishedEventHandler: Function = null) {
        super(name, image, offsetX, offsetY, width, height);

        this.numberOfFrames = length;

        this.currentFrame = 0;

        this.animationSpeed = speed;

        this.animationSpeedCounter = speed;

        this.animationFinishedEvent = finishedEventHandler;

    }

    public ChangeAnimationSpeed(speed: number) {

        this.animationSpeed = speed;
        this.animationSpeedCounter = 0;

    }
    
    public GetOffsetX(): number {

        if (this.animationSpeedCounter <= 0) {

            this.animationSpeedCounter = this.animationSpeed;

            this.currentFrame++;

            if (this.currentFrame == this.numberOfFrames - 1 && this.animationFinishedEvent != null) {

                this.animationFinishedEvent();

            }

            else if (this.currentFrame >= this.numberOfFrames) {

                this.currentFrame = 0;

            }

        }

        this.animationSpeedCounter -= 1;

        return super.GetOffsetX() + (this.GetWidth() * this.currentFrame);

    }

}