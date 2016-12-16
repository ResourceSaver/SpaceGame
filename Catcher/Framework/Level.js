class Level {
    constructor(levelNumber) {
        this.levelNumber = levelNumber;
        this.obstacles = new Array();
    }
    GetObstacles() {
        return this.obstacles;
    }
    AddObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }
    GetLevelNumber() {
        return this.levelNumber;
    }
}
