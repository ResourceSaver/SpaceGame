class ObstacleBulletPool {
    constructor(ship1, ship2) {
        this.ship1 = ship1;
        this.ship2 = ship2;
        this.maxBullets = 20;
        this.bullets = new Array();
        this.LoadBulletsOfColor();
    }
    LoadBulletsOfColor() {
        for (let i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet("green"));
        }
    }
    Spawn(obstacle, vector) {
        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {
            this.bullets[this.maxBullets - 1].Spawn(obstacle, BulletTypes.LAZER, vector);
            this.bullets.unshift(this.bullets.pop());
        }
    }
    Act() {
        for (let i = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return;
            }
            if (this.bullets[i].Act()) {
                this.KillBullet(i);
            }
            if (!this.CheckShipBulletCollision(this.ship1, i)) {
                this.CheckShipBulletCollision(this.ship2, i);
            }
        }
    }
    CheckShipBulletCollision(ship, index) {
        if (ship.Is(ObjectState.ALIVE) && this.bullets[index].CollisionCheck(ship)) {
            if (!ship.IsShilding()) {
                ship.HitByBullet();
                if (ship.energy == 0) {
                    ship.Explode();
                }
            }
            this.KillBullet(index);
            return true;
        }
        return false;
    }
    KillBullet(i) {
        this.bullets[i].SetState(ObjectState.DEAD);
        this.bullets.push(this.bullets.splice(i, 1)[0]);
    }
}
