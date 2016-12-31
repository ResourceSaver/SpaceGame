class Canvas {
    constructor(canvasName) {
        this.xx = 1.0;
        this.dd = 0;
        this.x0 = 0;
        this.x1 = 0;
        this.y0 = 0;
        this.y1 = 0;
        let canvas = document.getElementById(canvasName);
        canvas.height = System.resolutionY;
        canvas.width = System.resolutionX;
        this.context = canvas.getContext("2d");
        this.context.lineWidth = 2;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "100px Verdana";
        this.context.strokeStyle = 'skyblue';
        this.context.fillStyle = 'lightblue';
    }
    Clear() { this.context.clearRect(0, 0, System.resolutionX, System.resolutionY); }
    DrawObject(gameObject) {
        if (System.DebugMode) {
            this.context.strokeRect(gameObject.GetBoundingX(), gameObject.GetBoundingY(), gameObject.boundingBoxWidth, gameObject.boundingBoxHeight);
        }
        this.DrawDrawable(gameObject.GetDrawableCollection().GetCurrentDrawable(), gameObject.x, gameObject.y, gameObject.width, gameObject.height);
    }
    DrawHitCircle(gameObject) {
        this.width = gameObject.boundingBoxHeight > gameObject.boundingBoxWidth ? gameObject.boundingBoxHeight : gameObject.boundingBoxWidth;
        this.DrawCircle(gameObject.GetCenterX(), gameObject.GetCenterY(), this.width, gameObject.hitColor, gameObject.hitCounter, this.width * 0.75);
    }
    DrawObjectRotate(gameObject) {
        this.x = gameObject.x + gameObject.widthHalf;
        this.y = gameObject.y + gameObject.heightHalf;
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y);
        this.DrawObject(gameObject);
        this.context.restore();
    }
    DrawObjectRotateAround(gameObject) {
        this.x = gameObject.GetCenterX();
        this.y = gameObject.GetCenterY();
        this.context.save();
        this.context.translate(this.x, this.y - gameObject.boundingBoxHeight + 20);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y + gameObject.boundingBoxHeight - 20);
        this.DrawObject(gameObject);
        this.context.restore();
    }
    DrawDrawable(drawable, x, y, width, height) {
        this.context.drawImage(drawable.GetImage(), drawable.GetOffsetX(), drawable.GetOffSetY(), drawable.GetWidth(), drawable.GetHeight(), x, y, width, height);
    }
    DrawImage(image, x, y, w, h, alpha = 1) {
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.drawImage(image, 0, 0, image.width, image.height, x, y, w, h);
        this.context.restore();
    }
    DrawStar(x, y, radius, alpha) {
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
    DrawCircle(x, y, radius, color, alpha, lineWidth) {
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
    DrawRectangle(x, y, h, w, color = "lightblue") {
        this.context.save();
        this.context.fillStyle = color;
        this.context.fillRect(x, y, w, h);
        this.context.restore();
    }
    DrawParticle(x, y, r, hue) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.fillStyle = "hsla(" + hue + ",100%,50%,1)";
        this.context.fill();
        this.context.restore();
    }
    DrawLevelText(text, fontSize, alpha) {
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.fillStyle = 'white';
        this.context.font = fontSize + "px Impact";
        this.context.fillText(text, System.resolutionX / 2, System.resolutionY / 2);
        this.context.restore();
    }
    DrawText(x, y, string, font, alpha = 1) {
        this.context.save();
        this.context.fillStyle = 'white';
        this.context.globalAlpha = alpha;
        this.context.font = font;
        this.context.textAlign = "left";
        this.context.fillText(string, x, y);
        this.context.textAlign = "center";
        this.context.restore();
    }
    Blitz() {
        this.xx = 1;
        System.audioLibrary.Play(14);
        this.x0 = System.resolutionX * Math.random();
        this.y0 = System.resolutionY * Math.random();
        this.x1 = System.resolutionX * Math.random();
        this.y1 = System.resolutionY * Math.random();
    }
    DrawLight() {
        if (this.xx > 0) {
            this.xx = this.xx - 0.1;
        }
        else {
            return;
        }
        this.context.save();
        this.context.globalCompositeOperation = 'lighter';
        this.dd = (1 + Math.sin(this.xx)) / 2;
        var radialGradient = this.context.createLinearGradient(this.x0, this.y0, this.x1, this.y1);
        radialGradient.addColorStop(0.0 * this.dd, '#320D42');
        radialGradient.addColorStop(0.25 * this.dd, '#5D1A7F');
        radialGradient.addColorStop(0.5 * this.dd, '#A032C1');
        radialGradient.addColorStop(0.75, '#FAA8FF');
        radialGradient.addColorStop(1.0, '#FFF2FB');
        this.context.fillStyle = radialGradient;
        this.context.globalAlpha = this.xx;
        this.context.fillRect(0, 0, System.resolutionX, System.resolutionY);
        this.context.globalAlpha = 1;
        this.context.restore();
    }
}
