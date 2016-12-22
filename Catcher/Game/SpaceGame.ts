class SpaceGame  {

    private player1: Ship;
    private player2: Ship;
    private poolBullet1: BulletPool; 
    private poolBullet2: BulletPool;

    private shipInformationBar: ShipInformationBar; // todo - tegn for player 2

    private poolObstacle: ObstaclePool;
    public static poolObstacleBullet: ObstacleBulletPool;

    public particleSystem: ParticleSystem;
    private poolStar: StarPool;
    public textdrawer: TextDrawer;

    public levelManager: LevelManager; // refactor denne
    private nextLevel: Level; // todo flyt til levelmanager

    private powerUps: Array<PowerUp>; // indkapsle i pool?
    private powerUp: PowerUp; // hvad er denne?
    private randomPowerUpType: number; 
    private spawnPowerUpCounter: number;
    private spawnPowerUp: number;

    private gameState: GameState = GameState.RUNNING;

    private light: LightSource;

    constructor() {

        this.spawnPowerUp = 1000;
        this.spawnPowerUpCounter = 0;

        this.particleSystem = new ParticleSystem();

        this.powerUps = new Array<PowerUp>();

        this.levelManager = new LevelManager();

        this.player1 = new Ship(UserAction.SHIP1_LEFT, UserAction.SHIP1_RIGHT, UserAction.SHIP1_ACCELERATE, System.resolutionX / 3, System.resolutionY / 2, 2, 12);
        this.poolBullet1 = new BulletPool(this.player1, "red");
        this.player1.useGamePad = true;
        
        this.player2 = new Ship(UserAction.SHIP2_LEFT2, UserAction.SHIP2_RIGHT2, UserAction.SHIP2_ACCELERATE2, System.resolutionX / 3 * 2, System.resolutionY / 2, 6, 13 );
        this.poolBullet2 = new BulletPool(this.player2, "blue");

        this.shipInformationBar = new ShipInformationBar();

        this.poolObstacle = new ObstaclePool(this.player1, this.player2, this.poolBullet1, this.poolBullet2);
        SpaceGame.poolObstacleBullet = new ObstacleBulletPool(this.player1, this.player2);

        this.poolStar = new StarPool(this.player1);

        this.textdrawer = new TextDrawer();
        this.textdrawer.SetText(this.levelManager.PeakAtNextLevel().GetLevelNumber().toString());

        this.NextLevel();

        AudioLibrary.ToggleMute();

        AudioLibrary.Play(7);

        this.light = new LightSource(60);
    }

    public Act() { 


        System.canvas.Clear();

        this.spawnPowerUpCounter++;

        if (this.spawnPowerUpCounter > this.spawnPowerUp) {

            this.spawnPowerUpCounter = 0;

            this.spawnPowerUp = Math.random() * 1000;

            this.SpawnPowerUp();

        }

        if (this.player1.numberOfLives == 0 && this.player2.numberOfLives == 0) {

            this.gameState = GameState.GAMEOVER;
            this.textdrawer.SetText("Game Over");
            AudioLibrary.Play(9);

        }

        //if (Math.random() < 0.0001) {

        //    this.poolObstacle.AddObstacle(new Spikey());

        //}

        this.CheckPowerUpCollision();

        this.poolStar.Act();

        SpaceGame.poolObstacleBullet.Act();

        this.poolBullet1.Act();

        this.poolBullet2.Act();

        this.player1.Act(); 

        //this.ship2.Act();

        if (this.textdrawer.Act()) {
            this.TextWriterFinished();
        }

        if (this.poolObstacle.Act()) {

            this.nextLevel = this.levelManager.PeakAtNextLevel();

            if (this.gameState == GameState.RUNNING && this.nextLevel != null) {
                this.textdrawer.SetText("Level " + this.nextLevel.GetLevelNumber().toString());
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

        this.shipInformationBar.Draw(this.player1);

        ParticleSystem.Draw();

        this.light.Act(this.player1.x + this.player1.widthHalf, this.player1.y + this.player1.heightHalf);


    }

    public KeyDown(action: UserAction) {

        if (action == UserAction.SHIP1_ACCELERATE) { this.player1.SetMoveAnimation(); }

        else if (action == UserAction.SHIP2_ACCELERATE2) { this.player2.SetMoveAnimation(); }

        else if (action == UserAction.SHIP1_FIRE) { this.poolBullet1.SpawnLaser(); }

        else if (action == UserAction.SHIP2_FIRE2) { this.poolBullet2.SpawnLaser(); }

        else if (action == UserAction.SHIP1_SHIELD) { this.player1.ShieldOn(); }

        else if (action == UserAction.SHIP2_SHIELD) { this.player2.ShieldOn() }

        else if (action == UserAction.SHIP1_MISILE) { this.poolBullet1.SpawnMisile(); }

        else if (action == UserAction.SHIP2_MISILE2) { this.poolBullet2.SpawnMisile(); }

    }

    public KeyUp(action: UserAction) {

        if (action == UserAction.SHIP1_ACCELERATE) { this.player1.SetIdleAnimation(); }

        else if (action == UserAction.SHIP2_ACCELERATE2) { this.player2.SetIdleAnimation(); }

        else if (action == UserAction.SHIP1_SHIELD) { this.player1.ShieldOff(); }

        else if (action == UserAction.SHIP2_SHIELD) { this.player2.ShieldOff(); }

    }

    
    

    private TextWriterFinished() {

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

    public NextLevel() {

        this.nextLevel = this.levelManager.GetNextLevel();

        this.poolObstacle.SetObstacles(this.nextLevel.GetObstacles());

    }



    private SpawnPowerUp() {

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

        this.powerUp = PowerUpBlitz.GetInstance(); // fnix


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
                System.canvas.Blitz();
                this.poolObstacle.Nuclear();
                break;
            case PowerUpType.ENERGY:
                ship.energy = 5;
                break;
        }

    }

}