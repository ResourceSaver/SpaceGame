class GamePad {
    constructor(game) {
        this.spaceGame = game;
        this.keys = new Array(15);
    }
    Act() {
        this.gp = navigator.getGamepads()[0];
        if (this.gp == undefined)
            return;
        for (var i = 0; i < this.gp.buttons.length; i++) {
            if (this.gp.buttons[i].pressed) {
                if (!this.keys[i]) {
                    this.keys[i] = true;
                    this.spaceGame.KeyDown(this.Mapping(i));
                }
            }
            else if (this.keys[i]) {
                this.keys[i] = false;
                this.spaceGame.KeyUp(this.Mapping(i));
            }
        }
    }
    Mapping(i) {
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
            default:
                return null;
        }
    }
    UnMapping(ua) {
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
            default:
                return -1;
        }
    }
    IsKeyDown(action) {
        return this.keys[this.UnMapping(action)];
    }
}
