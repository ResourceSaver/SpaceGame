class Level {

    protected levelNumber: number;

    protected obstacles: Array<Obstacle>;
    
    public constructor(levelNumber:number) {

        this.levelNumber = levelNumber;

        this.obstacles = new Array<Obstacle>();

    }

    public GetObstacles(): Array<Obstacle> {

        return this.obstacles;

    }

    public AddObstacle(obstacle: Obstacle) {

        this.obstacles.push(obstacle);

    }
    
    public GetLevelNumber(): number {

        return this.levelNumber;

    }

}