class Canvas {
    constructor(canvasName) {
        let canvas = document.getElementById(canvasName);
        canvas.height = System.resolutionY;
        canvas.width = System.resolutionX;
        this.context = canvas.getContext("2d");
        this.context.lineWidth = 2;
        this.DisableSmoothing(this.context);
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "100px Verdana";
        this.context.strokeStyle = 'skyblue';
        this.context.fillStyle = 'lightblue';
    }
    DisableSmoothing(context) {
        if (context.imageSmoothingEnabled) {
            context.imageSmoothingEnabled = false;
        }
        else if (context.mozImageSmoothingEnabled) {
            context.mozImageSmoothingEnabled = false;
        }
        else if (context.msImageSmoothingEnabled) {
            context.msImageSmoothingEnabled = false;
        }
        else if (context.webkitImageSmoothingEnabled) {
            context.webkitImageSmoothingEnabled = false;
        }
    }
    Clear() { this.context.clearRect(0, 0, System.resolutionX, System.resolutionY); }
    DrawObject(gameObject) {
        if (System.DebugMode) {
            this.context.strokeRect(gameObject.GetBoundingX(), gameObject.GetBoundingY(), gameObject.boundingBoxWidth, gameObject.boundingBoxHeight);
        }
        if (gameObject.hitCounter > 0) {
            gameObject.hitCounter -= 0.007;
            if (gameObject.hitCounter < 0) {
                gameObject.hitCounter = 0;
            }
            this.width = gameObject.boundingBoxHeight > gameObject.boundingBoxWidth ? gameObject.boundingBoxHeight : gameObject.boundingBoxWidth;
            this.DrawCircle(gameObject.GetCenterX(), gameObject.GetCenterY(), this.width, gameObject.hitColor, gameObject.hitCounter, this.width * 0.75);
        }
        this.DrawDrawable(gameObject.GetDrawableCollection().GetCurrentDrawable(), gameObject.x, gameObject.y, gameObject.width, gameObject.height);
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
    DrawImage(image, x, y, w, h) {
        this.context.drawImage(image, 0, 0, image.width, image.height, x, y, w, h);
    }
    DrawStar(x, y, radius, alpha) {
        this.context.save();
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
        this.context.fillStyle = color;
        this.context.fillRect(x, y, w, h);
    }
    DrawLevelText(text, fontSize, alpha) {
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.fillStyle = '#916DFF';
        this.context.font = fontSize + "px Impact";
        this.context.fillText(text, System.resolutionX / 2, System.resolutionY / 2);
        this.context.restore();
    }
    DrawText(x, y, string) {
        this.context.font = "30px Impact";
        this.context.textAlign = "left";
        this.context.fillText(string, x, y);
        this.context.textAlign = "center";
    }
}
