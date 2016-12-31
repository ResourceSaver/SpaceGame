class SpaceGame {
    constructor() {
        this.gameState = GameState.RUNNING;
        SpaceGame.poolParticle = new ParticlePool();
        this.levelManager = new LevelManager();
        this.player1 = new Ship(UserAction.SHIP1_LEFT, UserAction.SHIP1_RIGHT, UserAction.SHIP1_ACCELERATE, System.resolutionX / 3, System.resolutionY / 2, 2, 12);
        this.poolBulletPlayer1 = new BulletPoolShip(this.player1, "red");
        this.player1.useGamePad = true;
        this.player2 = new Ship(UserAction.SHIP2_LEFT2, UserAction.SHIP2_RIGHT2, UserAction.SHIP2_ACCELERATE2, System.resolutionX / 3 * 2, System.resolutionY / 2, 6, 13);
        this.poolBulletPlayer2 = new BulletPoolShip(this.player2, "blue");
        this.shipInformationBar = new ShipInformationBar();
        this.poolObstacle = new ObstaclePool(this.player1, this.player2, this.poolBulletPlayer1, this.poolBulletPlayer2);
        SpaceGame.poolObstacleBullet = new BulletPoolObstacle(this.player1, this.player2);
        this.poolStar = new StarPool(this.player1);
        this.textdrawer = new TextDrawer();
        this.textdrawer.SetText(this.levelManager.PeakAtNextLevel().GetLevelName().toString());
        this.NextLevel();
        System.audioLibrary.ToggleMute();
        System.audioLibrary.Play(7);
        this.light = new LightSource();
        this.poolPowerUp = new PowerUpPool(this.player1, this.player2, this.poolObstacle);
    }
    Act() {
        SpaceGame.heatbeat++;
        if (SpaceGame.heatbeat > 10000) {
            SpaceGame.heatbeat = 0;
        }
        System.canvas.Clear();
        this.poolPowerUp.Act();
        if (this.player1.numberOfLives == 0 && this.player2.numberOfLives == 0) {
            this.gameState = GameState.GAMEOVER;
            this.textdrawer.SetText("Game Over");
            System.audioLibrary.Play(9);
        }
        this.poolStar.Act();
        SpaceGame.poolObstacleBullet.Act();
        this.poolBulletPlayer1.Act();
        this.poolBulletPlayer2.Act();
        this.player1.Act();
        if (this.textdrawer.Act()) {
            this.TextWriterFinished();
        }
        if (this.poolObstacle.Act()) {
            this.nextLevel = this.levelManager.PeakAtNextLevel();
            if (this.gameState == GameState.RUNNING && this.nextLevel != null) {
                this.textdrawer.SetText(this.nextLevel.GetLevelName().toString());
                this.gameState = GameState.LEVELFINISHED;
                System.audioLibrary.Play(8);
            }
            else if (this.gameState == GameState.RUNNING) {
                this.textdrawer.SetText("Game Finished");
                this.gameState = GameState.COMPLETED;
                System.audioLibrary.Play(10);
            }
        }
        else if (this.gameState == GameState.LEVELFINISHED) {
            this.gameState = GameState.RUNNING;
        }
        this.shipInformationBar.Draw(this.player1);
        SpaceGame.poolParticle.Draw();
        this.light.Act();
    }
    KeyDown(action) {
        if (action == UserAction.SHIP1_ACCELERATE) {
            this.player1.SetMoveAnimation();
        }
        else if (action == UserAction.SHIP2_ACCELERATE2) {
            this.player2.SetMoveAnimation();
        }
        else if (action == UserAction.SHIP1_FIRE) {
            this.poolBulletPlayer1.SpawnLaser();
        }
        else if (action == UserAction.SHIP2_FIRE2) {
            this.poolBulletPlayer2.SpawnLaser();
        }
        else if (action == UserAction.SHIP1_SHIELD) {
            this.player1.ShieldOn();
        }
        else if (action == UserAction.SHIP2_SHIELD) {
            this.player2.ShieldOn();
        }
        else if (action == UserAction.SHIP1_MISILE) {
            this.poolBulletPlayer1.SpawnMisile();
        }
        else if (action == UserAction.SHIP2_MISILE2) {
            this.poolBulletPlayer2.SpawnMisile();
        }
    }
    KeyUp(action) {
        if (action == UserAction.SHIP1_ACCELERATE) {
            this.player1.SetIdleAnimation();
        }
        else if (action == UserAction.SHIP2_ACCELERATE2) {
            this.player2.SetIdleAnimation();
        }
        else if (action == UserAction.SHIP1_SHIELD) {
            this.player1.ShieldOff();
        }
        else if (action == UserAction.SHIP2_SHIELD) {
            this.player2.ShieldOff();
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
    NextLevel() {
        this.nextLevel = this.levelManager.GetNextLevel();
        this.poolObstacle.SetObstacles(this.nextLevel.GetObstacles());
    }
}
SpaceGame.heatbeat = 0;
