class Asteroid extends Obstacle {
    constructor(size, energy) {
        super(size, size, size, 0, 0, System.canvas, energy);
        this.type = ObstacleType.ASTEROID;
        this.drawableCollection = System.drawableLibrary.GetAsteroid(() => this.state = ObjectState.DEAD);
    }
    HitByBullet() {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.Explode();
            return true;
        }
        return false;
    }
    Act() {
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
    constructor() {
        super(AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 10);
        this.AdjustBoundingbox(-50, -50);
        this.drawableCollection = System.drawableLibrary.GetBlades(() => this.state = ObjectState.DEAD);
    }
    Act() {
        super.Act();
        super.Draw();
    }
}
class Spikey extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.moveStrategy = new MoveStrategy(this, 15);
        this.drawableCollection = System.drawableLibrary.GetSpikey(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-80, -80);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class BugEye extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = System.drawableLibrary.GetBugEye(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-90, -55);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class SaucerBig extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 5);
        this.shooterStrategy = new TwirvlShootStrategy(this);
        this.drawableCollection = System.drawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-60, -60);
    }
    Act() {
        super.Act();
        this.shooterStrategy.Act();
        super.Draw();
    }
}
class Saucer extends Obstacle {
    constructor() {
        super(AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 5);
        this.shooterStrategy = new ShootThreeSixtyStrategy(150, this);
        this.drawableCollection = System.drawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-45, -45);
    }
    Act() {
        super.Act();
        this.shooterStrategy.Act();
        super.Draw();
    }
}
class Fighter extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 15);
        this.shootingStrategy = new ShootStrategy(100, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.moveStrategy.SetChangeDirection(Math.random() * 200 + 100);
        this.drawableCollection = System.drawableLibrary.GetFighter(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-50, -60);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class Scythe extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.shootingStrategy = new ShootStrategy(20, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = System.drawableLibrary.GetScythe(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-60, -70);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class Slicer extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.attackStrategy = new ChargeStrategy(this);
        this.drawableCollection = System.drawableLibrary.GetSlicer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-90, -40);
        this.drawRotate = true;
    }
    Act() {
        this.attackStrategy.Act();
        super.Act();
        this.Draw();
    }
}
