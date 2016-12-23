class Level {

    protected levelName: string;

    protected obstacles: Array<Obstacle>;
    
    public constructor(levelName:string) {

        this.levelName = levelName;

        this.obstacles = new Array<Obstacle>();

    }

    public GetObstacles(): Array<Obstacle> {

        return this.obstacles;

    }

    public AddObstacle(obstacle: Obstacle) {

        this.obstacles.push(obstacle);

    }
    
    public GetLevelName(): string {

        return this.levelName;

    }

}