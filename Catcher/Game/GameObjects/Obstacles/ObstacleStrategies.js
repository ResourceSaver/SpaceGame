class MoveStrategy {
    constructor(obstacle, speed) {
        this.changeDirectionCount = 0;
        this.changeDirection = 50;
        this.targetAngle = 0;
        this.targetAngleCount = 0;
        this.obstacle = obstacle;
        this.speed = speed;
        this.obstacle.vector.angle = Math.round(Math.random() * 360);
        this.obstacle.vector.ConstantSpeed(this.speed);
    }
    SetChangeDirection(value) {
        this.changeDirection = value;
    }
    Act() {
        if (Math.abs(this.targetAngle) != this.targetAngleCount) {
            if (this.targetAngle < 0) {
                this.obstacle.vector.Rotate(-1);
            }
            else {
                this.obstacle.vector.Rotate(1);
            }
            this.targetAngleCount++;
            this.obstacle.vector.ConstantSpeed(this.speed);
        }
        else {
            this.changeDirectionCount++;
            if (this.changeDirectionCount > this.changeDirection) {
                this.changeDirectionCount = 0;
                this.targetAngle = Math.round(Math.random() * -360 + 180);
                this.targetAngleCount = 0;
            }
        }
    }
}
class GetJewelStrategy {
    constructor(obstacle) {
        this.obstacle = obstacle;
    }
    SetDirection(obstacleX, obstacleY) {
        let diffX = SpaceGame.jewel.x - obstacleX;
        let diffY = SpaceGame.jewel.y - obstacleY;
        this.angleToTurn = Math.asin(diffY / Math.sqrt((Math.pow(diffX, 2) + Math.pow(diffY, 2)))) * 180 / Math.PI;
    }
    Act() {
        if (this.angleToTurn > 0) {
            this.angleToTurn--;
            this.obstacle.vector.Rotate(1);
        }
        else if (this.angleToTurn < 0) {
            this.angleToTurn++;
            this.obstacle.vector.Rotate(-1);
        }
    }
}
class ShootStrategy {
    constructor(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shot = 0;
        this.shot = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.obstacle.vector);
            this.shotCount = 0;
        }
    }
}
class ShootThreeSixtyStrategy {
    constructor(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shotSpeed = 0;
        this.shotSpeed = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shotSpeed) {
            for (let i = 0; i < 360; i = i + 30) {
                let vector = new Vector(0, 0, i);
                vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, vector);
            }
            this.shotCount = 0;
        }
    }
}
class ShootRandomStrategy {
    constructor(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shot = 0;
        this.shot = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            let vector = new Vector(0, 0, Math.random() * 360);
            vector.ConstantSpeed(1);
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, vector);
            this.shotCount = 0;
        }
    }
}
