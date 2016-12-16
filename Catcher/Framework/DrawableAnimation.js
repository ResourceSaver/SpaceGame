class DrawableAnimation extends Drawable {
    constructor(image, length, offsetX, offsetY, width, height, speed, name, finishedEventHandler = null) {
        super(name, image, offsetX, offsetY, width, height);
        this.numberOfFrames = length;
        this.currentFrame = 0;
        this.animationSpeed = speed;
        this.animationSpeedCounter = speed;
        this.animationFinishedEvent = finishedEventHandler;
    }
    GetOffsetX() {
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
