class SpaceGame  {

    private player1: Ship; // gør disse referencer static så de kan tilgåes fra andre klasser uden at de sendes med som input parametre!
    private player2: Ship;

    private shipInformationBar: ShipInformationBar; // todo - tegn for player 2
    private textdrawer: TextDrawer;
    private gameState: GameState = GameState.RUNNING;
    public static Lightning: LightSource;
    public static HeartBeat: number = 0; // flyt til ????

    private levelManager: LevelManager;

    // pools

    private poolObstacle: ObstaclePool;
    private poolStar: StarPool;
    private poolPowerUp: PowerUpPool;
    public static poolObstacleBullet: BulletPoolObstacle;
    public static poolParticle: ParticlePool;

    constructor() {

        SpaceGame.poolParticle = new ParticlePool();

        this.levelManager = new LevelManager();
     
        this.player1 = new Ship("red", System.resolutionX / 3, System.resolutionY / 2, 2, 12);
        this.player2 = new Ship("blue", System.resolutionX / 3 * 2, System.resolutionY / 2, 6, 13 );

        System.inputController.AddShip1(this.player1);
        System.inputController.AddShip2(this.player2);

        this.shipInformationBar = new ShipInformationBar();

        this.poolObstacle = new ObstaclePool(this.player1, this.player2);
        SpaceGame.poolObstacleBullet = new BulletPoolObstacle(this.player1, this.player2);

        this.poolStar = new StarPool(this.player1);

        this.textdrawer = new TextDrawer();

        this.ApplyNextLevel();

        System.audioLibrary.ToggleMute();

        System.audioLibrary.Play(7);

        SpaceGame.Lightning = new LightSource();

        this.poolPowerUp = new PowerUpPool(this.player1, this.player2, this.poolObstacle);

    }
    
    public Act() { 

        SpaceGame.HeartBeat = SpaceGame.HeartBeat + 1 % 10000;

        this.poolPowerUp.Act();

        if (this.player1.numberOfLives == 0 && this.gameState == GameState.RUNNING) {//mising player 2

            this.gameState = GameState.GAMEOVER;
            this.textdrawer.SetText("Game Over");
            System.audioLibrary.Play(9);

        }

        //if (Math.random() < 0.0001) {

        //    this.poolObstacle.AddObstacle(new Spikey());

        //}

        this.poolStar.Act();

        SpaceGame.poolObstacleBullet.Act();

        this.player1.Act(); 

        //this.ship2.Act();

        this.textdrawer.Act();

        if (this.poolObstacle.Act() && this.gameState == GameState.RUNNING) {

            this.levelManager.Advance();

            this.ApplyNextLevel();

        }

        this.shipInformationBar.Draw(this.player1);

        SpaceGame.poolParticle.Draw();

        SpaceGame.Lightning.Act();

    }

    public ApplyNextLevel() {

        System.audioLibrary.Play(8);

        if (this.levelManager.GetCurrentLevel() == null) {
            this.textdrawer.SetText("Game Finished");
            this.gameState = GameState.COMPLETED;
            System.audioLibrary.Play(10);
        }
        else {
            this.textdrawer.SetText(this.levelManager.GetCurrentLevel().GetLevelName().toString());
            this.poolObstacle.SetObstacles(this.levelManager.GetCurrentLevel().GetObstacles());
        }
    }
}