class ObstaclePool {
    constructor(ship1, ship2, bulletPool1, bulletPool2) {
        this.ship1 = ship1;
        this.ship2 = ship2;
        this.bulletPool1 = bulletPool1;
        this.bulletPool2 = bulletPool2;
        this.obstacles = new Array(0);
    }
    Act() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].Is(ObjectState.DEAD)) {
                this.obstacles.splice(i, 1);
                i--;
                continue;
            }
            this.obstacles[i].Act();
            if (this.obstacles[i].IsNot(ObjectState.ALIVE)) {
                continue;
            }
            if (this.CollisionCheckObstacleShip(this.ship1, i)) {
                continue;
            }
            else if (this.CollisionCheckObstacleShip(this.ship2, i)) {
                continue;
            }
            this.CollisionCheckObstacleBullet(this.obstacles[i], this.bulletPool1, this.ship1);
            this.CollisionCheckObstacleBullet(this.obstacles[i], this.bulletPool2, this.ship2);
        }
        return this.obstacles.length == 0;
    }
    CollisionCheckObstacleShip(ship, i) {
        if (!this.obstacles[i].CollisionCheck(ship)) {
            return false;
        }
        if (ship.IsShilding()) {
            this.obstacles[i].Explode();
            return true;
        }
        else if (ship.Is(ObjectState.ALIVE)) {
            ship.Explode();
            this.obstacles[i].Explode();
            return true;
        }
        return false;
    }
    CollisionCheckObstacleBullet(obstacle, bulletPool, ship) {
        this.attack = bulletPool.Collide(obstacle);
        if (this.attack > 0) {
            obstacle.HitByBullet(this.attack);
            this.exploding = obstacle.GetEnergy() <= 0;
            if (this.exploding) {
                obstacle.Explode();
                ship.UpdateScore(1);
            }
            if (obstacle.IsType(ObstacleType.ASTEROID) && this.exploding && obstacle.GetSize() != AsteroidSize.SMALLEST) {
                this.size = obstacle.GetSize() == AsteroidSize.SMALL ? AsteroidSize.SMALLER : AsteroidSize.SMALLEST;
                this.amount = obstacle.GetSize() == AsteroidSize.SMALL ? 4 : 10;
                for (let x = 0; x < this.amount; x++) {
                    this.obstacles.push(this.GetAsteroidFromSize(this.size, obstacle.x, obstacle.y));
                }
            }
        }
    }
    GetAsteroidFromSize(size, x, y) {
        let obstacle;
        if (size == AsteroidSize.SMALLER) {
            obstacle = new AsteroidSmall();
        }
        else if (size == AsteroidSize.SMALLEST) {
            obstacle = new AsteroidSmaller();
        }
        obstacle.SetCoordinates(x, y);
        return obstacle;
    }
    SetObstacles(obstacles) {
        this.obstacles = obstacles;
    }
    Nuclear() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].Explode();
        }
    }
}
