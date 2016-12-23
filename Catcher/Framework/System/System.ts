class System {

    public static resolutionX: number = 1920;

    public static resolutionY: number = 1080;

    public static DebugMode: boolean = true;

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

class SystemPerformance {

    private startTime:number = 0;
    private frameNumber: number = 0;
    private d: number = 0;
    private currentTime: number = 0;
    private result: number = 0;

    public GetFPS() {

        this.frameNumber++;
        this.d = new Date().getTime();
        this.currentTime = (this.d - this.startTime) / 1000;
        this.result = Math.floor((this.frameNumber / this.currentTime));

        if (this.currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }

        return this.result;

    }

}