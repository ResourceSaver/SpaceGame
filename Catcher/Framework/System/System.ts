﻿class System {

    public static resolutionX: number = 1920;

    public static resolutionY: number = 1080;

    public static DebugMode: boolean = false;

    public static canvas: Canvas;

    public static audioLibrary: AudioLibrary;

    public static drawableLibrary: DrawableLibrary;

    public static Volume = 0.5;

    public static gamePad: GamePad;

    public static keyboard: Keyboard;

    private game: SpaceGame;

    public Initialize():void {

        System.drawableLibrary = new DrawableLibrary();

        System.audioLibrary = new AudioLibrary();

        System.canvas = new Canvas("mainCanvas");

        let backgroundCanvas:Canvas = new Canvas("backgroundCanvas");

        backgroundCanvas.DrawDrawable(new Drawable("background", Images.GetImage("background")), 0, 0, System.resolutionX, System.resolutionY);

        this.game = new SpaceGame();

        System.gamePad = new GamePad(this.game);

        System.keyboard = new Keyboard(this.game); 

    }

    public Act() {

        System.canvas.Clear();

        System.gamePad.Act();

        this.game.Act();

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