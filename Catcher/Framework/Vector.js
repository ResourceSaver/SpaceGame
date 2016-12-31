class Vector {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    Rotate(amount) {
        this.angle = (this.angle + amount) % 360;
    }
    Accelerate(amount) {
        this.radian = this.angle * Math.PI / 180;
        this.y += Math.cos(this.radian) * amount;
        this.x += Math.sin(this.radian) * amount;
    }
    ConstantSpeed(amount) {
        this.radian = (this.angle * Math.PI) / 180;
        this.y = Math.cos(this.radian) * amount;
        this.x = Math.sin(this.radian) * amount;
    }
    Copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.angle = vector.angle;
    }
    Reset() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    }
    SetValues(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}
