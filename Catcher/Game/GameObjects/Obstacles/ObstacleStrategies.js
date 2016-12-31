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
            if (this.obstacle.IsNot(ObjectState.EXPLODING)) {
                if (this.targetAngle < 0) {
                    this.obstacle.vector.Rotate(-1);
                }
                else {
                    this.obstacle.vector.Rotate(1);
                }
                this.targetAngleCount++;
                this.obstacle.vector.ConstantSpeed(this.speed);
            }
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
        this.vector = new Vector(0, 0, 0);
        this.shotSpeed = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shotSpeed) {
            for (let i = 0; i < 360; i = i + 30) {
                this.vector.SetValues(0, 0, i);
                this.vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
            }
            this.shotCount = 0;
        }
    }
}
class TwirvlShootStrategy {
    constructor(obstacle) {
        this.shotCount = 0;
        this.shotSpeed = 0;
        this.angle = 0;
        this.vector = new Vector(0, 0, 0);
        this.shotSpeed = 1;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE)) {
            if (this.shotCount > this.shotSpeed) {
                this.vector.SetValues(0, 0, this.angle);
                this.vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
                this.shotCount = 0;
                this.angle += 30;
                if (this.angle > 360) {
                    this.angle = 0;
                }
            }
        }
    }
}
class ShootRandomStrategy {
    constructor(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shot = 0;
        this.vector = new Vector(0, 0, 0);
        this.shot = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            this.vector.SetValues(0, 0, Math.random() * 360);
            this.vector.ConstantSpeed(1);
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
            this.shotCount = 0;
        }
    }
}
class ChargeStrategy {
    constructor(obstacle) {
        this.steps = 100;
        this.stepCounter = 1;
        this.obstacle = obstacle;
        this.SetDestination();
    }
    Act() {
        if (this.obstacle.Is(ObjectState.EXPLODING))
            return;
        if (this.obstacle.vector.angle != this.angleDestination) {
            if (this.obstacle.vector.angle - this.angleDestination > 0) {
                this.obstacle.vector.Rotate(-0.5);
            }
            else {
                this.obstacle.vector.Rotate(0.5);
            }
        }
        else {
            if (this.stepCounter == 1) {
                this.obstacle.vector.ConstantSpeed(20);
            }
            else if (this.stepCounter > this.steps) {
                this.SetDestination();
            }
            this.stepCounter++;
        }
    }
    SetDestination() {
        this.obstacle.vector.ConstantSpeed(0);
        this.stepCounter = 0;
        this.angleDestination = rand(180, -180, 1);
    }
}
