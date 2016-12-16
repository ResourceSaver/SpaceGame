﻿class Asteroid extends Obstacle{

    constructor(size: AsteroidSize, energy:number) {
        super(size, size, size, 0, 0, System.canvas, energy);

        this.type = ObstacleType.ASTEROID;

        this.drawableCollection = DrawableLibrary.GetAsteroid(() => this.state = ObjectState.DEAD);

    }

    public HitByBullet(): boolean {



        this.energy -= 1;

        if (this.energy <= 0) {

            this.Explode();

            return true;
        }

        return false;

    }

    public Act() {

        super.Act();

        super.Draw();

    }

}

class AsteroidMedium extends Asteroid {

    constructor() {

        super(AsteroidSize.SMALL, 1);
        this.drawableCollection.SetCurrentDrawable("asteroid");
        this.AdjustBoundingbox(-20, -20);

    }

}

class AsteroidSmall extends Asteroid {

    constructor() {

        super(AsteroidSize.SMALLER, 1);
        this.AdjustBoundingbox(-30, -30);
        this.drawableCollection.SetCurrentDrawable("asteroid3");

    }

}

class AsteroidSmaller extends Asteroid {

    constructor() {

        super(AsteroidSize.SMALLEST, 1);
        this.AdjustBoundingbox(-25, -25);
        this.drawableCollection.SetCurrentDrawable("asteroid4");

    }

}

class Blades extends Obstacle {
    private shooterStrategy: ShootThreeSixtyStrategy;

    constructor() {
        super(AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 10);

        this.shooterStrategy = new ShootThreeSixtyStrategy(150, this);

        this.AdjustBoundingbox(-50, -50);

        this.drawableCollection = DrawableLibrary.GetBlades(() => this.state = ObjectState.DEAD);

    }

    public Act() {

        super.Act();

        this.shooterStrategy.Act();

        super.Draw();

    }

}

class Spikey extends Obstacle {

    private moveStrategy: MoveStrategy;

    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);

        this.moveStrategy = new MoveStrategy(this, 15);

        this.drawableCollection = DrawableLibrary.GetSpikey(() => this.state = ObjectState.DEAD);

        this.AdjustBoundingbox(-80, -80);

    }

    public Draw() {

        this.canvas.DrawObjectRotate(this);

    }
    
    public Act() {
        super.Act();

        this.moveStrategy.Act();

        this.Draw();

    }
}

class BugEye extends Obstacle {

    private moveStrategy: MoveStrategy;

    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);

        this.moveStrategy = new MoveStrategy(this, 1);

        this.drawableCollection = DrawableLibrary.GetBugEye(() => this.state = ObjectState.DEAD);

        this.AdjustBoundingbox(-90, -55);

    }

    public Draw() {

        this.canvas.DrawObjectRotate(this);

    }

    public Act() {
        super.Act();

        this.moveStrategy.Act();

        this.Draw();

    }

}

class SaucerBig extends Obstacle {

    private shooterStrategy: TwirvlShootStrategy;

    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 5);

        this.shooterStrategy = new TwirvlShootStrategy( this);

        this.drawableCollection = DrawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);

        this.AdjustBoundingbox(-60, -60);
    }

    public Act() {
        super.Act();

        this.shooterStrategy.Act();

        super.Draw();

    }

}

class Saucer extends Obstacle {

    private shooterStrategy: ShootRandomStrategy; fnix

    constructor() {
        super(AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 5);

        this.shooterStrategy = new ShootRandomStrategy(80, this);

        this.drawableCollection = DrawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);

        this.AdjustBoundingbox(-45, -45);
    }

    public Act() {
        super.Act();

        this.shooterStrategy.Act();

        super.Draw();

    }

}

class Fighter extends Obstacle {

    private shootingStrategy: ShootStrategy;

    private moveStrategy: MoveStrategy;

    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 15);

        this.shootingStrategy = new ShootStrategy(100, this);

        this.moveStrategy = new MoveStrategy(this, 1);
        this.moveStrategy.SetChangeDirection(Math.random() * 200 + 100);

        this.drawableCollection = DrawableLibrary.GetFighter(() => this.state = ObjectState.DEAD);

        this.AdjustBoundingbox(-50, -60);

    }

    public Draw() {

        this.canvas.DrawObjectRotate(this);

    }

    public Act() {
        super.Act();

        this.shootingStrategy.Act();

        this.moveStrategy.Act();

        this.Draw();

    }

}

class Scythe extends Obstacle {

    private shootingStrategy: ShootStrategy;

    private moveStrategy: MoveStrategy;

    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);

        this.shootingStrategy = new ShootStrategy(20, this);

        this.moveStrategy = new MoveStrategy(this, 1);

        this.drawableCollection = DrawableLibrary.GetScythe(() => this.state = ObjectState.DEAD);

        this.AdjustBoundingbox(-60, -70);

    }

    public Draw() {

        this.canvas.DrawObjectRotate(this);

    }

    public Act() {
        super.Act();

        this.shootingStrategy.Act();

        this.moveStrategy.Act();

        this.Draw();

    }

}

class Slicer extends Obstacle {

    private shootingStrategy: ShootStrategy;
    private moveStrategy: MoveStrategy;

    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);

        this.shootingStrategy = new ShootStrategy(20, this);

        this.moveStrategy = new MoveStrategy(this, 1);

        this.drawableCollection = DrawableLibrary.GetSlicer(() => this.state = ObjectState.DEAD);

        this.AdjustBoundingbox(-90, -40);

    }
    
    public Draw() {

        this.canvas.DrawObjectRotate(this);

    }


    public Act() {

        super.Act();

        this.shootingStrategy.Act();

        this.moveStrategy.Act();

        this.Draw();

    }

}



//class Slicer extends Obstacle {

//    private shootingStrategy: ShootStrategy;
//    private moveStrategy: MoveStrategy;

//    private getJewelStrategy: GetJewelStrategy;

//    constructor() {
//        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);

//        this.shootingStrategy = new ShootStrategy(20, this);

//        this.moveStrategy = new MoveStrategy(this, 1);

//        this.drawableCollection = DrawableLibrary.GetSlicer(() => this.state = ObjectState.DEAD);

//        this.AdjustBoundingbox(-130, -80);



//        this.getJewelStrategy = new GetJewelStrategy(this);
//        this.vector.angle = 100;
//        this.x = System.resolutionX / 2 + 400;
//        this.y = System.resolutionY / 2 - 400;


//    }

//    public Draw() {

//        this.canvas.DrawObjectRotate(this);

//    }

//    private setDirection: boolean = false;

//    public Act() {

//        if (!this.setDirection) {
//            this.getJewelStrategy.SetDirection(this.x, this.y);
//            this.setDirection = true;
//        }

//        this.getJewelStrategy.Act();


//        //super.Act();

//        //this.shootingStrategy.Act();

//        //this.moveStrategy.Act();

//        this.Draw();

//    }

//}