class Vector {

    public x: number;

    public y: number;

    public angle: number;
    
    private radian: number;

    constructor(x:number, y:number, angle:number) {

        this.x = x;

        this.y = y;

        this.angle = angle;

    }

    public Rotate(amount: number) {

        this.angle = (this.angle + amount) % 360;

    }
    
    public Accelerate(amount: number) {

        this.radian = this.angle * Math.PI / 180;

        this.y += Math.cos(this.radian) * amount;

        this.x += Math.sin(this.radian) * amount;

    }

    public ConstantSpeed(amount: number) {

        this.radian = (this.angle * Math.PI) / 180;

        this.y = Math.cos(this.radian) * amount;

        this.x = Math.sin(this.radian) * amount;

    }

    public Copy(vector: Vector) {

        this.x = vector.x;

        this.y = vector.y;

        this.angle = vector.angle;

    }

    public Reset() {

        this.x = 0;
        
        this.y = 0;

        this.angle = 0;

    }

    public SetValues(x: number, y: number, angle: number) {

        this.x = x;

        this.y = y;

        this.angle = angle;

    }

}