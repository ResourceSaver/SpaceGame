class PowerUpPool {
    constructor(player1, player2, poolObstacle) {
        this.poolObstacle = poolObstacle;
        this.player1 = player1;
        this.player2 = player2;
        this.spawnPowerUp = 1000;
        this.spawnPowerUpCounter = 0;
        this.powerUps = new Array();
    }
    Act() {
        this.spawnPowerUpCounter++;
        if (this.spawnPowerUpCounter > this.spawnPowerUp) {
            this.spawnPowerUpCounter = 0;
            this.spawnPowerUp = Math.random() * 1000;
            this.SpawnPowerUp();
        }
        this.CheckPowerUpCollision();
    }
    SpawnPowerUp() {
        this.randomPowerUpType = Math.random();
        if (this.randomPowerUpType < 0.2) {
            this.powerUp = PowerUpMisile.GetInstance();
        }
        else if (this.randomPowerUpType < 0.4) {
            this.powerUp = PowerUpLife.GetInstance();
        }
        else if (this.randomPowerUpType < 0.6) {
            this.powerUp = PowerUpShield.GetInstance();
        }
        else if (this.randomPowerUpType < 0.8) {
            this.powerUp = PowerUpBlitz.GetInstance();
        }
        else if (this.randomPowerUpType <= 1.0) {
            this.powerUp = PowerUpEnergy.GetInstance();
        }
        if (this.powerUp.isAlive) {
            return;
        }
        this.powerUp.Spawn();
        this.powerUps.push(this.powerUp);
    }
    CheckPowerUpCollision() {
        for (let i = 0; i < this.powerUps.length; i++) {
            if (!this.powerUps[i].isAlive) {
                this.powerUps.splice(i, 1);
                i--;
                continue;
            }
            this.powerUps[i].Act();
            if (this.player1.Is(ObjectState.ALIVE) && this.player1.CollisionCheck(this.powerUps[i])) {
                this.PowerUpAction(this.powerUps[i], this.player1);
            }
            else if (this.player2.Is(ObjectState.ALIVE) && this.player2.CollisionCheck(this.powerUps[i])) {
                this.PowerUpAction(this.powerUps[i], this.player2);
            }
        }
    }
    PowerUpAction(powerUp, ship) {
        powerUp.Collide();
        System.audioLibrary.Play(4);
        switch (powerUp.GetType()) {
            case PowerUpType.LIFE:
                ship.numberOfLives++;
                break;
            case PowerUpType.MISSILE:
                ship.numberOfMisiles += 3;
                break;
            case PowerUpType.SHIELD:
                ship.ChargeShield();
                break;
            case PowerUpType.BLITZ:
                System.canvas.Blitz();
                this.poolObstacle.Nuclear();
                break;
            case PowerUpType.ENERGY:
                ship.energy = 5;
                break;
        }
    }
}
