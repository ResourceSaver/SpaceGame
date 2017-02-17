class MoveStrategy {

    private changeDirectionCount = 0;
    private changeDirection = 50;
    private targetAngle = 0;
    private targetAngleCount = 0;
    private obstacle: Obstacle;
    private speed: number;

    constructor(obstacle: Obstacle, speed: number) {

        this.obstacle = obstacle;

        this.speed = speed;

        this.obstacle.vector.angle = Math.round(Math.random() * 360);

        this.obstacle.vector.ConstantSpeed(this.speed);

    }

    public SetChangeDirection(value: number) {

        this.changeDirection = value;

    }

    public Act() {

        if (Math.abs(this.targetAngle) != this.targetAngleCount) {

            if (this.obstacle.IsNot(ObjectState.EXPLODING)) {
                if (this.targetAngle < 0) { this.obstacle.vector.Rotate(-1); }
                else { this.obstacle.vector.Rotate(1); }

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

    private shotCount = 0;
    private shot = 0;
    private obstacle: Obstacle;
    private shotOffset: number;

    constructor(shotSpeed: number, obstacle: Obstacle, shotOffset:number) {

        this.shot = shotSpeed;

        this.obstacle = obstacle;

        this.shotOffset = shotOffset;

    }

    public Act() {
        this.shotCount++;

        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {

            this.shotOffset = this.shotOffset * -1;

            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.obstacle.vector, this.shotOffset);
            this.shotCount = 0;
        }

    }

}

class ShootThreeSixtyStrategy {

    private shotCount = 0;
    private shotSpeed = 0;
    private obstacle: Obstacle;
    private vector: Vector;

    constructor(shotSpeed: number, obstacle: Obstacle) {

        this.vector = new Vector(0, 0, 0);

        this.shotSpeed = shotSpeed;

        this.obstacle = obstacle;

    }

    public Act() {
        this.shotCount++;

        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shotSpeed) {

            for (let i = 0; i < 360; i = i + 30) {
                this.vector.SetValues(0, 0, i);
                this.vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector, 0);
            }

            this.shotCount = 0;
        }

    }

}

class TwirvlShootStrategy {

    private shotCount = 0;
    private shotSpeed = 0;
    private obstacle: Obstacle;
    private angle: number = 0;
    private vector: Vector;

    constructor(obstacle: Obstacle) {

        this.vector = new Vector(0, 0, 0);

        this.shotSpeed = 1;

        this.obstacle = obstacle;

    }

    public Act() {
        this.shotCount++;

        if (this.obstacle.Is(ObjectState.ALIVE) ) {

            if (this.shotCount > this.shotSpeed) {

                this.vector.SetValues(0, 0, this.angle);
                this.vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector, 0);
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

    private shotCount = 0;
    private shot = 0;
    private obstacle: Obstacle;
    private vector: Vector;

    constructor(shotSpeed: number, obstacle: Obstacle) {

        this.vector = new Vector(0, 0, 0);

        this.shot = shotSpeed;

        this.obstacle = obstacle;

    }

    public Act() {
        this.shotCount++;

        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            this.vector.SetValues(0, 0, Math.random() * 360);
            this.vector.ConstantSpeed(1);
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector, 0);
            this.shotCount = 0;
        }

    }

}

class ChargeStrategy {

    private obstacle: Slicer;

    private angleDestination: number;

    public constructor(obstacle: Slicer) {

        this.obstacle = obstacle;
        this.SetDestination();
        
    }

    public Act() {

        if (this.obstacle.Is(ObjectState.EXPLODING)) return;

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
                //this.obstacle.ThrustOnOff(true);
            }
            else if (this.stepCounter > this.steps) {
                this.SetDestination();
                //this.obstacle.ThrustOnOff(false);

            }

            this.stepCounter++;

        }

    }

    private steps:number = 100;
    private stepCounter = 1;

    private SetDestination() {
        this.obstacle.vector.ConstantSpeed(0);

        this.stepCounter = 0;

        this.angleDestination = rand(180, -180, 1);


    }

}