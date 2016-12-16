class BulletPool {
    constructor(ship, color) {
        this.ship = ship;
        this.maxBullets = 5;
        this.bullets = new Array();
        this.LoadBulletsOfColor(color);
    }
    LoadBulletsOfColor(color) {
        for (let i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet(color));
        }
    }
    SpawnMisile() {
        if (this.ship.Is(ObjectState.DEAD) || this.ship.Is(ObjectState.EXPLODING)) {
            return;
        }
        else if (this.ship.numberOfMisiles == 0) {
            AudioLibrary.Play(5);
            return;
        }
        ;
        this.ship.numberOfMisiles--;
        if (this.Spawn(BulletTypes.MISILE)) {
            this.ship.vector.Accelerate(-3);
            AudioLibrary.Play(3);
        }
    }
    SpawnLaser() {
        if (this.Spawn(BulletTypes.LAZER)) {
            AudioLibrary.Play(1);
        }
    }
    Spawn(type) {
        if (this.ship.IsNot(ObjectState.ALIVE) && this.ship.IsNot(ObjectState.IMMORTAL)) {
            return false;
        }
        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {
            this.bullets[this.maxBullets - 1].Spawn(this.ship, type, this.ship.vector);
            this.bullets.unshift(this.bullets.pop());
            return true;
        }
        return false;
    }
    Act() {
        for (let i = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return;
            }
            if (this.bullets[i].Act()) {
                this.KillBullet(i);
            }
        }
    }
    KillBullet(i) {
        this.bullets[i].SetState(ObjectState.DEAD);
        this.bullets.push(this.bullets.splice(i, 1)[0]);
        return true;
    }
    Collide(object) {
        for (let i = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return 0;
            }
            if (object.CollisionCheck(this.bullets[i])) {
                let attack = this.bullets[i].attack;
                this.KillBullet(i);
                return attack;
            }
        }
        return 0;
    }
}
