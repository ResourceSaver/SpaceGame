class SpaceGame {
    constructor() {
        this.gameState = GameState.RUNNING;
        SpaceGame.jewel = new Jewel();
        this.powerUps = new Array();
        this.levelManager = new LevelManager();
        this.ship1 = new Ship(UserAction.SHIP1_LEFT, UserAction.SHIP1_RIGHT, UserAction.SHIP1_ACCELERATE, System.resolutionX / 3, System.resolutionY / 2, () => this.OnShipIsOutOfLives(), 2, 12);
        this.ship1.useGamePad = true;
        this.ship2 = new Ship(UserAction.SHIP2_LEFT2, UserAction.SHIP2_RIGHT2, UserAction.SHIP2_ACCELERATE2, System.resolutionX / 3 * 2, System.resolutionY / 2, () => this.OnShipIsOutOfLives(), 6, 13);
        SpaceGame.poolObstacleBullet = new ObstacleBulletPool(this.ship1, this.ship2);
        this.poolBullet1 = new BulletPool(this.ship1, "red");
        this.poolBullet2 = new BulletPool(this.ship2, "blue");
        this.poolStar = new StarPool();
        this.poolObstacle = new ObstaclePool(this.ship1, this.ship2, this.poolBullet1, this.poolBullet2);
        this.shipInformationBar = new ShipInformationBar();
        this.textdrawer = new TextDrawer();
        this.textdrawer.SetText(this.levelManager.PeakAtNextLevel().GetLevelNumber().toString());
        this.NextLevel();
        if (!System.Muted)
            AudioLibrary.Play(7);
    }
    Act() {
        System.canvas.Clear();
        if (Math.random() < 0.001) {
            this.SpawnPowerUp();
        }
        if (Math.random() < 0.0001) {
            this.poolObstacle.AddObstacle(new Spikey());
        }
        this.CheckPowerUpCollision();
        if (this.textdrawer.Act()) {
            this.TextWriterFinished();
        }
        this.poolStar.Act();
        SpaceGame.poolObstacleBullet.Act();
        this.poolBullet1.Act();
        this.poolBullet2.Act();
        this.ship1.Act();
        this.ship2.Act();
        SpaceGame.jewel.Act();
        if (this.poolObstacle.Act()) {
            let nextLevel = this.levelManager.PeakAtNextLevel();
            if (this.gameState == GameState.RUNNING && nextLevel != null) {
                this.textdrawer.SetText("Level " + nextLevel.GetLevelNumber().toString());
                this.gameState = GameState.LEVELFINISHED;
                AudioLibrary.Play(8);
            }
            else if (this.gameState == GameState.RUNNING) {
                this.textdrawer.SetText("Game Finished");
                this.gameState = GameState.COMPLETED;
                AudioLibrary.Play(10);
            }
        }
        else if (this.gameState == GameState.LEVELFINISHED) {
            this.gameState = GameState.RUNNING;
        }
        this.shipInformationBar.Draw(this.ship1, this.ship2);
    }
    NextLevel() {
        let nextLevel = this.levelManager.GetNextLevel();
        this.poolObstacle.SetObstacles(nextLevel.GetObstacles());
    }
    CheckPowerUpCollision() {
        for (let i = 0; i < this.powerUps.length; i++) {
            if (!this.powerUps[i].isAlive) {
                this.powerUps.splice(i, 1);
                i--;
                continue;
            }
            this.powerUps[i].Act();
            if (this.ship1.Is(ObjectState.ALIVE) && this.ship1.CollisionCheck(this.powerUps[i])) {
                this.PowerUpAction(this.powerUps[i], this.ship1);
            }
            else if (this.ship2.Is(ObjectState.ALIVE) && this.ship2.CollisionCheck(this.powerUps[i])) {
                this.PowerUpAction(this.powerUps[i], this.ship2);
            }
        }
    }
    PowerUpAction(powerUp, ship) {
        powerUp.Collide();
        AudioLibrary.Play(4);
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
                this.poolObstacle.Blitz();
                break;
            case PowerUpType.ENERGY:
                ship.energy = 5;
                break;
        }
    }
    SpawnPowerUp() {
        let ran = Math.random();
        let powerUp = null;
        if (ran < 0.2) {
            powerUp = PowerUpMisile.GetInstance();
        }
        else if (ran < 0.4) {
            powerUp = PowerUpLife.GetInstance();
        }
        else if (ran < 0.6) {
            powerUp = PowerUpShield.GetInstance();
        }
        else if (ran < 0.8) {
            powerUp = PowerUpBlitz.GetInstance();
        }
        else if (ran <= 1.0) {
            powerUp = PowerUpEnergy.GetInstance();
        }
        if (powerUp.isAlive) {
            return;
        }
        powerUp.Spawn();
        this.powerUps.push(powerUp);
    }
    OnShipIsOutOfLives() {
        if (this.ship1.numberOfLives == 0 && this.ship2.numberOfLives == 0) {
            this.gameState = GameState.GAMEOVER;
            this.textdrawer.SetText("Game Over");
            AudioLibrary.Play(9);
        }
    }
    TextWriterFinished() {
        if (this.gameState == GameState.LEVELFINISHED) {
            this.NextLevel();
            this.gameState = GameState.RUNNING;
        }
        else if (this.gameState == GameState.GAMEOVER) {
            this.gameState = GameState.NOTSTARTED;
        }
        else if (this.gameState == GameState.COMPLETED) {
            this.gameState = GameState.NOTSTARTED;
        }
    }
    KeyDown(action) {
        if (action == UserAction.SHIP1_ACCELERATE) {
            this.ship1.SetMoveAnimation();
        }
        else if (action == UserAction.SHIP2_ACCELERATE2) {
            this.ship2.SetMoveAnimation();
        }
        else if (action == UserAction.SHIP1_FIRE) {
            this.poolBullet1.SpawnLaser();
        }
        else if (action == UserAction.SHIP2_FIRE2) {
            this.poolBullet2.SpawnLaser();
        }
        else if (action == UserAction.SHIP1_SHIELD) {
            this.ship1.ShieldOn();
        }
        else if (action == UserAction.SHIP2_SHIELD) {
            this.ship2.ShieldOn();
        }
        else if (action == UserAction.SHIP1_MISILE) {
            this.poolBullet1.SpawnMisile();
        }
        else if (action == UserAction.SHIP2_MISILE2) {
            this.poolBullet2.SpawnMisile();
        }
    }
    KeyUp(action) {
        if (action == UserAction.SHIP1_ACCELERATE) {
            this.ship1.SetIdleAnimation();
        }
        else if (action == UserAction.SHIP2_ACCELERATE2) {
            this.ship2.SetIdleAnimation();
        }
        else if (action == UserAction.SHIP1_SHIELD) {
            this.ship1.ShieldOff();
        }
        else if (action == UserAction.SHIP2_SHIELD) {
            this.ship2.ShieldOff();
        }
    }
}
