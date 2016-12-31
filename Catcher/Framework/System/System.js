class System {
    static Initialize() {
        this.drawableLibrary = new DrawableLibrary();
        this.audioLibrary = new AudioLibrary();
        System.canvas = new Canvas("mainCanvas");
        let backgroundCanvas = new Canvas("backgroundCanvas");
        backgroundCanvas.DrawDrawable(new Drawable("background", Images.GetImage("background")), 0, 0, System.resolutionX, System.resolutionY);
        var game = new SpaceGame();
        this.gamePad = new GamePad(game);
        this.keyboard = new Keyboard(game);
        return game;
    }
}
System.resolutionX = 1920;
System.resolutionY = 1080;
System.DebugMode = true;
System.Volume = 0.5;
class SystemPerformance {
    constructor() {
        this.startTime = 0;
        this.frameNumber = 0;
        this.d = 0;
        this.currentTime = 0;
        this.result = 0;
    }
    GetFPS() {
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
