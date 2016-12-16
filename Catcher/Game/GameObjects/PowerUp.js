class PowerUp extends GameObject {
    constructor() {
        super(56, 56, 0, 0, System.canvas);
        this.stayAliveFor = 500;
        this.drawableCollection = DrawableLibrary.GetPowerUps();
    }
    Spawn() {
        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? System.resolutionX : -this.width;
            this.y = Math.random() * System.resolutionY;
        }
        else {
            this.x = Math.random() * System.resolutionX;
            this.y = Math.random() > 0.5 ? System.resolutionY : -this.height;
        }
        this.vector.angle = Math.random() * 360;
        this.vector.ConstantSpeed(1);
        this.stayAliveCounter = 0;
        this.isAlive = true;
    }
    Act() {
        super.Act();
        this.vector.angle += 5;
        this.stayAliveCounter++;
        this.Draw();
        this.isAlive = this.stayAliveCounter < this.stayAliveFor;
    }
    Draw() {
        this.canvas.DrawObjectRotate(this);
        this.canvas.DrawCircle(this.x + 30, this.y + 30, 90, this.color, 0.2, 20);
    }
    Collide() {
        this.stayAliveCounter = this.stayAliveFor + 1;
        this.isAlive = false;
    }
    GetType() {
        return this.type;
    }
}
class PowerUpMisile extends PowerUp {
    constructor() {
        super();
        this.color = "#FF6868";
        this.type = PowerUpType.MISSILE;
        this.drawableCollection.SetCurrentDrawable("missile");
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpMisile();
        }
        return this.instance;
    }
}
class PowerUpLife extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("life");
        this.type = PowerUpType.LIFE;
        this.color = "#BFFF00";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpLife();
        }
        return this.instance;
    }
}
class PowerUpShield extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("shield");
        this.type = PowerUpType.SHIELD;
        this.color = "#72BBFF";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpShield();
        }
        return this.instance;
    }
}
class PowerUpBlitz extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("blitz");
        this.type = PowerUpType.BLITZ;
        this.color = "#FFD447";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpBlitz();
        }
        return this.instance;
    }
}
class PowerUpEnergy extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("energy");
        this.type = PowerUpType.ENERGY;
        this.color = "#FF16E0";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpEnergy();
        }
        return this.instance;
    }
}
