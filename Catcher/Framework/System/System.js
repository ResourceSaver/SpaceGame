class System {
    static Initialize() {
        System.canvas = new Canvas("mainCanvas");
        System.backgroundCanvas = new Canvas("backgroundCanvas");
        System.backgroundCanvas.DrawDrawable(new Drawable("background", Images.GetImage("background")), 0, 0, System.resolutionX, System.resolutionY);
    }
}
System.resolutionX = window.screen.width;
System.resolutionY = window.screen.height;
System.DebugMode = false;
System.Volume = 0.5;
System.Muted = true;
class Keyboard {
    static Setup(game) {
        this.spaceGame = game;
        this.keys = new Array();
        document.addEventListener("keydown", (e) => this.KeyDown(e.keyCode), false);
        document.addEventListener("keyup", (e) => this.KeyUp(e.keyCode), false);
    }
    static KeyDown(action) {
        if (action == UserAction.DEBUGMODE) {
            System.DebugMode = !System.DebugMode;
            document.getElementById("fpsLabel").style.visibility = System.DebugMode ? "visible" : "hidden";
        }
        else if (action == UserAction.MUTEAUDIO) {
            System.Muted = !System.Muted;
            if (!System.Muted) {
                AudioLibrary.Play(7);
            }
            else {
                AudioLibrary.Pause(7);
            }
        }
        else if (this.keys[action] == true) {
            return;
        }
        this.keys[action] = true;
        this.spaceGame.KeyDown(action);
    }
    static KeyUp(action) {
        this.keys[action] = false;
        this.spaceGame.KeyUp(action);
    }
    static IsKeyDown(action) {
        return this.keys[action];
    }
}
class GamePad {
    static Setup(game) {
        this.spaceGame = game;
        this.keys = new Array();
    }
    static Act() {
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
    }
    static Mapping(i) {
        let ua = null;
        switch (i) {
            case 0:
                ua = UserAction.SHIP1_ACCELERATE;
                break;
            case 1:
                ua = UserAction.SHIP1_MISILE;
                break;
            case 2:
                ua = UserAction.SHIP1_FIRE;
                break;
            case 3:
                ua = UserAction.SHIP1_SHIELD;
                break;
            case 14:
                ua = UserAction.SHIP1_LEFT;
                break;
            case 15:
                ua = UserAction.SHIP1_RIGHT;
                break;
        }
        return ua;
    }
    static UnMapping(ua) {
        let index = -1;
        switch (ua) {
            case UserAction.SHIP1_ACCELERATE:
                index = 0;
                break;
            case UserAction.SHIP1_MISILE:
                index = 1;
                break;
            case UserAction.SHIP1_FIRE:
                index = 2;
                break;
            case UserAction.SHIP1_SHIELD:
                index = 3;
                break;
            case UserAction.SHIP1_LEFT:
                index = 14;
                break;
            case UserAction.SHIP1_RIGHT:
                index = 15;
                break;
        }
        return index;
    }
    static IsKeyDown(action) {
        return this.keys[this.UnMapping(action)];
    }
}
