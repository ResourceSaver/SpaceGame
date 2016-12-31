class Keyboard {
    constructor(game) {
        this.spaceGame = game;
        this.keys = new Array();
        document.addEventListener("keydown", (e) => this.KeyDown(e.keyCode), false);
        document.addEventListener("keyup", (e) => this.KeyUp(e.keyCode), false);
    }
    KeyDown(action) {
        if (this.keys[action] == true) {
            return;
        }
        else if (action == UserAction.MUTEAUDIO) {
            System.audioLibrary.ToggleMute();
        }
        this.keys[action] = true;
        this.spaceGame.KeyDown(action);
    }
    KeyUp(action) {
        this.keys[action] = false;
        this.spaceGame.KeyUp(action);
    }
    IsKeyDown(action) {
        return this.keys[action];
    }
}
