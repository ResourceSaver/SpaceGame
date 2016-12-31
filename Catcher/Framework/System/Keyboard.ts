class Keyboard {

    private spaceGame: SpaceGame;

    private keys: Array<boolean>;

    public constructor(game: SpaceGame) {

        this.spaceGame = game;

        this.keys = new Array<boolean>();

        document.addEventListener("keydown", (e: KeyboardEvent) => this.KeyDown(<UserAction>e.keyCode), false);

        document.addEventListener("keyup", (e: KeyboardEvent) => this.KeyUp(<UserAction>e.keyCode), false);

    }

    private KeyDown(action: UserAction) {

        if (this.keys[action] == true) { return; }

        else if (action == UserAction.MUTEAUDIO) {

            System.audioLibrary.ToggleMute();

        }

        this.keys[action] = true;

        this.spaceGame.KeyDown(action);
    }

    private KeyUp(action: UserAction) {

        this.keys[action] = false;

        this.spaceGame.KeyUp(action);

    }

    public IsKeyDown(action: UserAction) {

        return this.keys[<number>action];

    }

}
