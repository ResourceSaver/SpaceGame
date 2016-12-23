class PowerUp extends GameObject {

    protected color: string;
    protected type: PowerUpType;
    private stayAliveCounter: number;
    private stayAliveFor: number = 500;
    public isAlive: boolean;
    private circleSize = AsteroidSize.POWERUP / 2;
    private count = 0;
    private radius: number = 50;

    public constructor() {
        super(AsteroidSize.POWERUP, AsteroidSize.POWERUP, 0, 0, System.canvas);

        this.drawableCollection = DrawableLibrary.GetPowerUps();

    }

    public Spawn() {

        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? System.resolutionX : - this.width;
            this.y = Math.random() * System.resolutionY;
        }
        else {
            this.x = Math.random() * System.resolutionX;
            this.y = Math.random() > 0.5 ? System.resolutionY : - this.height;
        }

        this.vector.angle = Math.random() * 360;

        this.vector.ConstantSpeed(1);

        this.stayAliveCounter = 0;

        this.isAlive = true;

    }
    
    public Act() {
        super.Act();

        this.count = (this.count + 0.03) % 300;

        this.vector.angle += 5;

        this.stayAliveCounter++;

        this.Draw();

        this.isAlive = this.stayAliveCounter < this.stayAliveFor;

    }

    public Draw() {

        this.canvas.DrawCircle(this.x + this.circleSize, this.y + this.circleSize, this.radius * ((5 + Math.abs(Math.sin(this.count))) / 6), this.color, 0.2, 12);

        this.canvas.DrawObjectRotate(this);

    }

    public Collide() {

        this.stayAliveCounter = this.stayAliveFor + 1;

        this.isAlive = false;

    }

    public GetType(){

        return this.type;

    }
}

class PowerUpMisile extends PowerUp {

    private static instance: PowerUpMisile;

    constructor() {
        super();

        this.color = "#FF6868";

        this.type = PowerUpType.MISSILE;

        this.drawableCollection.SetCurrentDrawable("missile");

    }

    public static GetInstance(): PowerUpMisile {

        if (this.instance == null) {

            this.instance = new PowerUpMisile();

        }

        return this.instance;

    }

}

class PowerUpLife extends PowerUp {

    private static instance: PowerUpLife;

    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("life");
        this.type = PowerUpType.LIFE;
        this.color = "#BFFF00";
    }

    public static GetInstance(): PowerUpLife {

        if (this.instance == null) {

            this.instance = new PowerUpLife();

        }

        return this.instance;

    }

}

class PowerUpShield extends PowerUp {

    private static instance: PowerUpShield;

    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("shield");
        this.type = PowerUpType.SHIELD ;
        this.color = "#72BBFF";
    }

    public static GetInstance(): PowerUpShield {

        if (this.instance == null) {

            this.instance = new PowerUpShield();

        }

        return this.instance;

    }

}

class PowerUpBlitz extends PowerUp {

    private static instance: PowerUpBlitz;

    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("blitz");
        this.type = PowerUpType.BLITZ;
        this.color = "#FFD447";
    }

    public static GetInstance(): PowerUpBlitz {

        if (this.instance == null) {

            this.instance = new PowerUpBlitz();

        }

        return this.instance;

    }

}

class PowerUpEnergy extends PowerUp {

    private static instance: PowerUpEnergy;

    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("energy");
        this.type = PowerUpType.ENERGY;
        this.color = "#FF16E0"; 
    }

    public static GetInstance(): PowerUpEnergy {

        if (this.instance == null) {

            this.instance = new PowerUpEnergy();

        }

        return this.instance;

    }

}
