class BulletPoolObstacle {

    private ship1: Ship;

    private ship2: Ship;

    private bullets: Array<Bullet>

    private maxBullets: number;

    constructor(ship1: Ship, ship2:Ship) {

        this.ship1 = ship1;

        this.ship2 = ship2;

        this.maxBullets = 50;

        this.bullets = new Array<Bullet>();

        this.LoadBulletsOfColor();

    }

    private LoadBulletsOfColor() {

        for (let i = 0; i < this.maxBullets; i++) {

            this.bullets.push(new Bullet("green"));

        }
    }

    public Spawn(obstacle:Obstacle, vector:Vector) {

        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {
            
            this.bullets[this.maxBullets - 1].Spawn(obstacle, BulletTypes.LAZER, vector, 0);

            this.bullets.unshift(this.bullets.pop());

        }

    }

    public Act() {

        for (let i = 0; i < this.maxBullets; i++) {

            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return;
            }

            if (this.bullets[i].Act()) {

                this.KillBullet(i);

            }

            if (!this.CheckShipBulletCollision(this.ship1, i))
            {
                this.CheckShipBulletCollision(this.ship2, i);

            }

            //if (this.ship1.Is(ObjectState.ALIVE) && this.bullets[i].CollisionCheck(this.ship1)) {

            //    if (!this.ship1.IsShilding()) {

            //        this.ship1.HitByBullet();

            //        if (this.ship1.energy == 0) {
            //            this.ship1.Explode();

            //        }

            //    }


            //    this.KillBullet(i);
                
            //}
            //else if (this.ship2.Is(ObjectState.ALIVE) && this.bullets[i].CollisionCheck(this.ship2)) {

            //    this.ship2.HitByBullet();

            //    if (this.ship2.energy == 0) {
            //        this.ship2.Explode();
            //    }


            //    this.KillBullet(i);
                
            //}

        }

    }

    private CheckShipBulletCollision(ship:Ship, index:number) {

        if (ship.Is(ObjectState.ALIVE) && this.bullets[index].CollisionCheck(ship)) {

            if (!ship.IsShilding()) {

                ship.HitByBullet(0);

                if (ship.energy == 0) {
                    ship.Explode();

                }

            }

            this.KillBullet(index);

            return true;
        }

        return false;

    }

    private KillBullet(i: number) {

        this.bullets[i].SetState(ObjectState.DEAD);

        this.bullets.push(this.bullets.splice(i, 1)[0]);

    }

}