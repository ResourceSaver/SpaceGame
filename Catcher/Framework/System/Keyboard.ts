class Keyboard {

    private static spaceGame: SpaceGame;

    private static keys: Array<boolean>;

    public static Setup(game: SpaceGame) {

        this.spaceGame = game;

        this.keys = new Array<boolean>();

        document.addEventListener("keydown", (e: KeyboardEvent) => this.KeyDown(<UserAction>e.keyCode), false);

        document.addEventListener("keyup", (e: KeyboardEvent) => this.KeyUp(<UserAction>e.keyCode), false);

    }

    private static KeyDown(action: UserAction) {

        if (action == UserAction.MUTEAUDIO) {

            AudioLibrary.ToggleMute();

        }
        else if (this.keys[action] == true) { return; }

        this.keys[action] = true;

        this.spaceGame.KeyDown(action);
    }

    private static KeyUp(action: UserAction) {

        this.keys[action] = false;

        this.spaceGame.KeyUp(action);

    }

    public static IsKeyDown(action: UserAction) {

        return this.keys[<number>action];

    }

}
