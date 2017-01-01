class PowerUpPool {

    private player1: Ship;
    private player2: Ship;

    private poolObstacle: ObstaclePool; // denne klasses act metode skal returnerer en værdi så SpaceGame kan kalde Blitz på obstaclePool og så skal denne reference fjernes.

    private powerUps: Array<PowerUp>; 
    private powerUp: PowerUp; 
    private randomPowerUpType: number;
    private spawnPowerUpCounter: number;
    private spawnPowerUp: number;

    public constructor(player1: Ship, player2: Ship, poolObstacle:ObstaclePool) {

        this.poolObstacle = poolObstacle;

        this.player1 = player1;

        this.player2 = player2;

        this.spawnPowerUp = 1000;

        this.spawnPowerUpCounter = 0;

        this.powerUps = new Array<PowerUp>();

    }

    public Act() {
        this.spawnPowerUpCounter++;

        if (this.spawnPowerUpCounter > this.spawnPowerUp) {

            this.spawnPowerUpCounter = 0;

            this.spawnPowerUp = Math.random() * 1000;

            this.Spawn();

        }

        this.CheckPowerUpCollision();

    }

    private Spawn() {

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

    public CheckPowerUpCollision() {

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

    private PowerUpAction(powerUp: PowerUp, ship: Ship) {
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
                SpaceGame.lightening.Blitz();
                this.poolObstacle.Nuclear();
                break;
            case PowerUpType.ENERGY:
                ship.energy = 5;
                break;
        }

    }

}