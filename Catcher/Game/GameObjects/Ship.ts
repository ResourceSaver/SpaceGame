﻿class Ship extends GameObject {

    private rightAction: UserAction;
    private leftAction: UserAction;
    private accelerateAction: UserAction;
    private rotateSpeed: number = 2;
    private accelerationSpeed: number = 0.1;
    private shieldAmount: number = 200;
    private isShielding: boolean = false;
    private shieldObject: Shield;
    public numberOfLives: number = 3;
    public numberOfMisiles: number = 3;
    private thrust: Thrust;
    private numberOfKills: number = 0;
    public score: string;

    public useGamePad: boolean = false;

    private respawnCounter: number = 0;
    private respawnValue: number = 100;
    
    private orginalX: number;
    private orginalY: number;

    private thrustSoundNumber: number;
    private shieldSoundNumber: number;

    constructor(leftAction: UserAction, rightAction: UserAction, accelerateAction: UserAction, x: number, y: number, thrustSoundNumber:number, shieldSoundNumber:number) {
        super(AsteroidSize.BIG, AsteroidSize.BIG, x, y, System.canvas);

        this.hitColor = "#FF6549";

        this.energy = 5;

        this.AdjustBoundingbox(-80, -50);

        this.thrust = new Thrust(this);

        this.thrustSoundNumber = thrustSoundNumber;

        this.shieldSoundNumber = shieldSoundNumber;

        this.drawableCollection = System.drawableLibrary.GetShip(() => this.state = ObjectState.DEAD );

        this.rightAction = rightAction;

        this.leftAction = leftAction;

        this.accelerateAction = accelerateAction;

        this.orginalX = x;

        this.orginalY = y;

        this.shieldObject = new Shield();

        this.Spawn();

        this.UpdateScore(0);

        this.SetDrawRotateFunction();

    }

    public Spawn() {

        this.energy = 5;
        this.respawnCounter = 0;
        this.drawableCollection.SetCurrentDrawable("idle");
        this.state = ObjectState.IMMORTAL;
        this.x = this.orginalX;
        this.y = this.orginalY;
        this.vector.ConstantSpeed(0);
        this.vector.angle = 0;
        this.thrust.Spawn();

    }

    public Draw() {

        super.Draw();
        
        if (this.isShielding || this.state == ObjectState.IMMORTAL) {
            this.shieldObject.ShadowDraw(this.x + this.widthHalf, this.y + this.heightHalf, this.vector.angle);

        }

    }

    public Explode() {

        SpaceGame.poolParticle.Build(this.x + this.widthHalf, this.y + this.heightHalf);

        this.state = ObjectState.EXPLODING;

        this.ShieldOff();

        this.drawableCollection.SetCurrentDrawable("explosion");

        this.numberOfLives--;

        this.vector.Reset();

        System.audioLibrary.Play(0);

        System.audioLibrary.PauseLoop(this.thrustSoundNumber);

    }

    public HitByBullet(attack:number) {

        super.HitByBullet(attack);

        this.energy--;

    }

    public Act() {

        if (this.state == ObjectState.DEAD ) {

            if (this.numberOfLives == 0) return;

            this.respawnCounter++;

            if (this.respawnCounter > this.respawnValue) {

                this.Spawn();

            }

        }

        super.Act();

        this.thrust.Act();

        if (this.state == ObjectState.IMMORTAL) {

            this.respawnCounter++;

            if (this.respawnCounter > this.respawnValue) {

                this.respawnCounter = 0;

                this.state = ObjectState.ALIVE;

            }

        }

        if (this.isShielding && this.shieldAmount == 0) {

            this.isShielding = false;

            System.audioLibrary.PauseLoop(this.shieldSoundNumber);

        }

        else if (this.isShielding && this.shieldAmount >= 0) {

            this.shieldAmount--;

        }

        if (this.state == ObjectState.DEAD) {

            return;
        }

        if (this.state == ObjectState.ALIVE || this.state == ObjectState.IMMORTAL) {

            if (this.useGamePad) {
                if (System.gamePad.IsKeyDown(this.leftAction)) { this.vector.Rotate(-this.rotateSpeed); }

                if (System.gamePad.IsKeyDown(this.rightAction)) { this.vector.Rotate(this.rotateSpeed); }

                if (System.gamePad.IsKeyDown(this.accelerateAction)) { this.vector.Accelerate(this.accelerationSpeed); }

            }
            else {
                if (System.keyboard.IsKeyDown(this.leftAction)) { this.vector.Rotate(-this.rotateSpeed); }

                if (System.keyboard.IsKeyDown(this.rightAction)) { this.vector.Rotate(this.rotateSpeed); }

                if (System.keyboard.IsKeyDown(this.accelerateAction)) { this.vector.Accelerate(this.accelerationSpeed); }

            }

        }
        
        this.Draw();

    }

    public ShieldOn() {

        if (this.state != ObjectState.ALIVE || this.shieldAmount <= 0)
        {
            return;
        }

        System.audioLibrary.Play(this.shieldSoundNumber);

        this.isShielding = true;

    }

    public ShieldOff() {

        this.isShielding = false;

        System.audioLibrary.PauseLoop(this.shieldSoundNumber);
    }

    public SetMoveAnimation() {

        if (this.IsNot(ObjectState.ALIVE) && this.IsNot(ObjectState.IMMORTAL)) { return; }

        this.thrust.SetThrusting(true);

        System.audioLibrary.Play(this.thrustSoundNumber);

    }

    public SetIdleAnimation() {

        if (this.IsNot(ObjectState.ALIVE) && this.IsNot(ObjectState.IMMORTAL)) { return; }

        this.thrust.SetThrusting(false);

        System.audioLibrary.PauseLoop(this.thrustSoundNumber);
        
    }

    public GetShield() {
        return this.shieldAmount;
    }

    public IsShilding(): boolean {

        return this.isShielding;

    }

    public ChargeShield() {

        this.shieldAmount = 200;

    }

    public UpdateScore(value: number) {

        this.numberOfKills += value;
        this.score = "0000" + this.numberOfKills;
        this.score = this.score.substr(this.score.length - 4);

    }

}