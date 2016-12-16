class System {

    public static resolutionX: number = 1920;

    public static resolutionY: number = 1080;

    public static DebugMode: boolean = false;

    public static canvas: Canvas;

    private static backgroundCanvas: Canvas;

    public static Volume = 0.5;


    public static Initialize() {

        System.canvas = new Canvas("mainCanvas");

        System.backgroundCanvas = new Canvas("backgroundCanvas");

        System.backgroundCanvas.DrawDrawable(new Drawable("background", Images.GetImage("background")), 0, 0, System.resolutionX, System.resolutionY);
        
    }


}

class Keyboard {

    private static spaceGame: SpaceGame;

    private static keys: Array<boolean>;
    
    public static Setup(game: SpaceGame) {
      
        this.spaceGame = game;

        this.keys = new Array<boolean>();

        document.addEventListener("keydown", (e: KeyboardEvent) => this.KeyDown(<UserAction>e.keyCode), false);

        document.addEventListener("keyup", (e: KeyboardEvent) => this.KeyUp(<UserAction>e.keyCode), false);

    }
    
    private static KeyDown(action:UserAction) {

        if (action == UserAction.DEBUGMODE) {
            System.DebugMode = !System.DebugMode;
            document.getElementById("fpsLabel").style.visibility = System.DebugMode ? "visible" : "hidden";
        }
        else if (action == UserAction.MUTEAUDIO) {

            AudioLibrary.ToggleMute();

            
        }
        else if (this.keys[action] == true) { return; }

        this.keys[action] = true;

        this.spaceGame.KeyDown(action);
    }

    private static KeyUp(action : UserAction) {

        this.keys[action] = false;

        this.spaceGame.KeyUp(action);

    }

    public static IsKeyDown(action: UserAction) {

        return this.keys[<number> action];

    }
           
}

class GamePad {

    private static spaceGame: SpaceGame;

    private static keys: Array<boolean>;

    public static Setup(game: SpaceGame) {

        this.spaceGame = game;

        this.keys = new Array<boolean>();

    }

    public static Act() {

        //if ("getGamepads" in navigator) {

            var gp = navigator.getGamepads()[0];

            for (var i = 0; i < gp.buttons.length; i++) {

                if (gp.buttons[i].pressed) {

                    if (!this.keys[i]) {

                        this.keys[i] = true;

                        this.spaceGame.KeyDown(this.Mapping(i));

                    }

                }
                else {

                    if (this.keys[i]) {

                        this.keys[i] = false;

                        this.spaceGame.KeyUp(this.Mapping(i));

                    }

                }
            }
        //}
        
    }

    private static Mapping(i: number): UserAction {

        switch (i) {
            case 0:
                return UserAction.SHIP1_ACCELERATE;
            case 1:
                return UserAction.SHIP1_MISILE;
            case 2:
                return UserAction.SHIP1_FIRE;
            case 3:
                return UserAction.SHIP1_SHIELD;
            case 14:
                return UserAction.SHIP1_LEFT;
            case 15:
                return UserAction.SHIP1_RIGHT;
            default: return null;
        }
    }

    private static UnMapping(ua: UserAction): number{

        switch (ua) {
            case UserAction.SHIP1_ACCELERATE:
                return 0;
            case UserAction.SHIP1_MISILE:
                return 1;
            case UserAction.SHIP1_FIRE:
                return 2;
            case UserAction.SHIP1_SHIELD:
                return 3;
            case UserAction.SHIP1_LEFT:
                return 14;
            case UserAction.SHIP1_RIGHT:
                return 15;
            default: return -1;
        }

    }

    public static IsKeyDown(action: UserAction) {

        return this.keys[this.UnMapping(action)];

    }

}