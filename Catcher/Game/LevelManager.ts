class LevelManager {

    private levels: Array<Level>;

    constructor() {
        this.levels = new Array<Level>();

        this.levels.push(new Level0());

        this.levels.push(new Level1());
        //this.levels.push(new Level2());
        //this.levels.push(new Level3());
        //this.levels.push(new Level4());
        //this.levels.push(new Level5());
    }

    public GetNextLevel(): Level {

        return this.levels.shift();

    }

    public PeakAtNextLevel(): Level {

        return this.levels[0];

    }
}

class Level0 extends Level {

    constructor() {
        super(0);
    }

}

class Level1 extends Level {

    constructor() {
        super(1);

        this.AddObstacle(new Slicer());

       // this.AddObstacle(new AsteroidMedium());
        //this.AddObstacle(new AsteroidSmall());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
    }

}

class Level2 extends Level {

    constructor() {
        super(2);

        this.AddObstacle(new Slicer());
        this.AddObstacle(new Fighter());
        this.AddObstacle(new BugEye());
        this.AddObstacle(new Scythe());
        this.AddObstacle(new Blades());
        this.AddObstacle(new Spikey());
        this.AddObstacle(new Saucer());
        this.AddObstacle(new SaucerBig());

    }

}

class Level3 extends Level {

    constructor() {
        super(3);

        this.AddObstacle(new SaucerBig());
        this.AddObstacle(new Saucer());
        this.AddObstacle(new Blades());
        this.AddObstacle(new AsteroidMedium());
        this.AddObstacle(new AsteroidSmall());
    }

}

class Level4 extends Level {

    constructor() {
        super(4);

        this.AddObstacle(new Saucer());
        this.AddObstacle(new Blades());
        this.AddObstacle(new Fighter());
        this.AddObstacle(new AsteroidMedium());
        this.AddObstacle(new AsteroidSmall());
        this.AddObstacle(new AsteroidSmaller());
    }

}

class Level5 extends Level {

    constructor() {
        super(5);

        this.AddObstacle(new SaucerBig());
        this.AddObstacle(new Saucer());
        this.AddObstacle(new Blades());
        this.AddObstacle(new Fighter());
        this.AddObstacle(new Slicer());

        this.AddObstacle(new Spikey());
        this.AddObstacle(new BugEye());
        this.AddObstacle(new Scythe());

        this.AddObstacle(new AsteroidMedium());
        this.AddObstacle(new AsteroidSmall());
        this.AddObstacle(new AsteroidSmaller());
    }

}