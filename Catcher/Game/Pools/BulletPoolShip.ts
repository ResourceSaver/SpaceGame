class BulletPoolShip {

    private ship: Ship;

    private bullets: Array<Bullet>

    private maxBullets: number;

    constructor(ship: Ship, color:string) {

        this.ship = ship;

        this.maxBullets = 8;

        this.bullets = new Array<Bullet>();

        this.LoadBulletsOfColor(color);

    }

    private LoadBulletsOfColor(color: string) {

        for (let i = 0; i < this.maxBullets; i++) {

            this.bullets.push(new Bullet(color));

        }
    }

    public SpawnMisile() {

        if (this.ship.Is(ObjectState.DEAD) || this.ship.Is(ObjectState.EXPLODING)) {
            return;
        }
        else if (this.ship.numberOfMisiles == 0) {
            System.audioLibrary.Play(5);
            return;
        };

        this.ship.numberOfMisiles--;

        if (this.Spawn(BulletTypes.MISILE)) {

            this.ship.vector.Accelerate(-3);

            System.audioLibrary.Play(3);
        }

    }

    public SpawnLaser() {

        if (this.Spawn(BulletTypes.LAZER)) {
            System.audioLibrary.Play(1);

        }

    }

    private offSet: number = 33;

    private Spawn(type:BulletTypes) {

        if (this.ship.IsNot(ObjectState.ALIVE) && this.ship.IsNot(ObjectState.IMMORTAL)) { return false; }

        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {

            if (type == BulletTypes.LAZER) {
                this.offSet = this.offSet == 33 ? -33 : 33;
            }
            else {
                this.offSet = 0;
            }

            this.bullets[this.maxBullets - 1].Spawn(this.ship, type, this.ship.vector, this.offSet);

            this.bullets.unshift(this.bullets.pop());

            return true;

        }

        return false;

    }

    public Act() {

        for (let i = 0; i < this.maxBullets; i++) {

            if (this.bullets[i].Is(ObjectState.DEAD))
            {
                return;
            }

            if (this.bullets[i].Act()) {

                this.KillBullet(i);

            }

        }

    }

    private KillBullet(i: number) {

        this.bullets[i].SetState(ObjectState.DEAD);

        this.bullets.push(this.bullets.splice(i, 1)[0]);

        return true;

    }

    private attack:number;

    public Collide(object: GameObject): number {

        for (let i = 0; i < this.maxBullets; i++) {

            if (this.bullets[i].Is(ObjectState.DEAD)) {

                return 0;

            }

            if (object.CollisionCheck(this.bullets[i])) {

                this.attack = this.bullets[i].attack;

                this.KillBullet(i);

                return this.attack;

            }

        }

        return 0;

    }

}