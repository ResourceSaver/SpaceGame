class LevelManager {

    private levels: Array<Level>;

    constructor() {
        this.levels = new Array<Level>();

        this.levels.push(new Level0());

        this.levels.push(new Level1());
        this.levels.push(new Level2());
        this.levels.push(new Level3());
        this.levels.push(new Level4());
        this.levels.push(new Level5());
        this.levels.push(new Level6());
        this.levels.push(new Level7());
        this.levels.push(new Level8());
        this.levels.push(new Level9());
        this.levels.push(new Level10());
        this.levels.push(new Level11());

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
        super('0');
    }

}

class Level1 extends Level {

    constructor() {
        super('Level 1');

        //this.AddObstacle(new Fighter());

        this.AddObstacle(new AsteroidMedium());
        this.AddObstacle(new AsteroidSmall());
        this.AddObstacle(new AsteroidSmaller());


        //this.AddObstacle(new Slicer());

        //this.AddObstacle(new BugEye());
        //this.AddObstacle(new Scythe()); 
        //this.AddObstacle(new Blades()); // catch player
       // this.AddObstacle(new Spikey());
        //this.AddObstacle(new Saucer());

    }

}

class Level2 extends Level {

    constructor() {
        super('Level 2');

        this.AddObstacle(new AsteroidSmall());
        this.AddObstacle(new Fighter());

    }

}

class Level3 extends Level {

    constructor() {
        super('Level 3');

        this.AddObstacle(new AsteroidMedium());

    }

}

class Level4 extends Level {

    constructor() {
        super('Level 4');

        this.AddObstacle(new Slicer());

    }

}

class Level5 extends Level {

    constructor() {
        super('Level 5');

        this.AddObstacle(new Fighter());
        
    }

}

class Level6 extends Level {

    constructor() {
        super('Level 6');

        this.AddObstacle(new BugEye());
 
    }

}

class Level7 extends Level {

    constructor() {
        super('Level 7');

        this.AddObstacle(new Scythe());

    }

}

class Level8 extends Level {

    constructor() {
        super('Level 8');

        this.AddObstacle(new Blades());

    }

}

class Level9 extends Level {

    constructor() {
        super('Level 9');

        this.AddObstacle(new Spikey());

    }

}

class Level10 extends Level {

    constructor() {
        super('Level 10');

        this.AddObstacle(new Saucer());

    }

}

class Level11 extends Level {

    constructor() {
        super('Final boss');

        this.AddObstacle(new SaucerBig());

    }

}