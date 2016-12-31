class Level {
    constructor(levelName) {
        this.levelName = levelName;
        this.obstacles = new Array();
    }
    GetObstacles() {
        return this.obstacles;
    }
    AddObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }
    GetLevelName() {
        return this.levelName;
    }
}
