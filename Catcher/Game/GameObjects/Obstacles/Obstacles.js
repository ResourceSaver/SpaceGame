class Asteroid extends Obstacle {
    constructor(size, energy) {
        super(size, size, size, 0, 0, System.canvas, energy);
        this.type = ObstacleType.ASTEROID;
        this.drawableCollection = DrawableLibrary.GetAsteroid(() => this.state = ObjectState.DEAD);
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
        super(AsteroidSize.MEDIUM, 1);
        this.drawableCollection.SetCurrentDrawable("asteroid");
        this.AdjustBoundingbox(-45, -45);
    }
}
class AsteroidSmall extends Asteroid {
    constructor() {
        super(AsteroidSize.SMALL, 1);
        this.AdjustBoundingbox(-40, -40);
        this.drawableCollection.SetCurrentDrawable("asteroid3");
    }
}
class AsteroidSmaller extends Asteroid {
    constructor() {
        super(AsteroidSize.SMALLER, 1);
        this.AdjustBoundingbox(-35, -35);
        this.drawableCollection.SetCurrentDrawable("asteroid4");
    }
}
class Blades extends Obstacle {
    constructor() {
        super(AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 10);
        this.AdjustBoundingbox(-70, -70);
        this.drawableCollection = DrawableLibrary.GetBlades(() => this.state = ObjectState.DEAD);
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
        this.drawableCollection = DrawableLibrary.GetSpikey(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-120, -120);
    }
    Draw() {
        this.canvas.DrawObjectRotate(this);
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
        this.drawableCollection = DrawableLibrary.GetBugEye(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-150, -80);
    }
    Draw() {
        this.canvas.DrawObjectRotate(this);
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
        this.shooterStrategy = new ShootThreeSixtyStrategy(150, this);
        this.drawableCollection = DrawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-100, -100);
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
        this.shooterStrategy = new ShootRandomStrategy(80, this);
        this.drawableCollection = DrawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-60, -60);
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
        this.drawableCollection = DrawableLibrary.GetFighter(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-90, -90);
    }
    Draw() {
        this.canvas.DrawObjectRotate(this);
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
        this.drawableCollection = DrawableLibrary.GetScythe(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-100, -120);
    }
    Draw() {
        this.canvas.DrawObjectRotate(this);
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
        this.shootingStrategy = new ShootStrategy(20, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = DrawableLibrary.GetSlicer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-130, -80);
    }
    Draw() {
        this.canvas.DrawObjectRotate(this);
    }
    Act() {
        super.Act();
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
