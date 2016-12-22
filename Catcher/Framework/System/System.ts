class System {

    public static resolutionX: number = 1920;

    public static resolutionY: number = 1080;

    public static DebugMode: boolean = false;

    public static canvas: Canvas;

    public static Volume = 0.5;
    
    public static Initialize():SpaceGame {

        AudioLibrary.Initialize(); 

        System.canvas = new Canvas("mainCanvas");

        let backgroundCanvas:Canvas = new Canvas("backgroundCanvas");

        backgroundCanvas.DrawDrawable(new Drawable("background", Images.GetImage("background")), 0, 0, System.resolutionX, System.resolutionY);

        var game = new SpaceGame();

        GamePad.Setup(game);

        Keyboard.Setup(game); 

        return game;
    }
    
}