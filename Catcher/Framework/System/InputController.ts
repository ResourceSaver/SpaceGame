class InputController {

    private input1:Input;
    private input2:Input;

    public static keyboard: Keyboard;

    constructor() {
        InputController.keyboard = new Keyboard();
        window.addEventListener("gamepadconnected", (e: GamepadEvent) => this.OnGamePadConnected(e));
    }

    public AddShip1(ship: Ship):void {

        this.input1 = this.GetGamePad(ship);

        if (this.input1 == null) {
            this.input1 = new KeyboardLayout(ship, 87, 65, 68, 83, 81, 69);
        }
    }

    public AddShip2(ship: Ship) {

        this.input2 = this.GetGamePad(ship);

        if (this.input2 == null) {
            this.input2 = new KeyboardLayout(ship, 79, 75, 192, 76, 73, 80);
        }
    }

    public Act() {

        this.input1.Act();
        this.input2.Act();

    }

    private GetGamePad(ship: Ship): GamePadLayout {

        let gamepads = navigator.getGamepads();
        let gamepad: Gamepad = null;
        let gamePad: GamePadLayout = null;

        for (var i = 0; i < gamepads.length; i++) {

            gamepad = gamepads[i];

            let inUse1 = this.input1 != null && !this.input1.isKeyboard && this.input1.id == i;
            let inUse2 = this.input2 != null && !this.input2.isKeyboard && this.input2.id == i;

            if (inUse1 || inUse2) {
                continue;
            }

            if (gamepad != null && gamepad.connected && gamepad.buttons.length > 8 && gamepad.id != "Unknown") {

                gamePad = new GamePadLayout(ship, i);

            }

        }

        return gamePad;

    }

    private OnGamePadConnected(e: GamepadEvent) {

           console.log("Gamepad connected at index %d:. connected %s. id %s. %d buttons, %d axes.",
                e.gamepad.index,
                e.gamepad.connected,
                e.gamepad.id,
                e.gamepad.buttons.length,
                e.gamepad.axes.length);

        if (this.input1.isKeyboard) {
            let gp = new GamePadLayout(this.input1.ship, e.gamepad.index);
            this.input1.Detach();
            this.input1 = gp;
        }

        else if (this.input2.isKeyboard) {
            let gp = new GamePadLayout(this.input2.ship, e.gamepad.index);
            this.input2.Detach();
            this.input2 = gp;
        }
    }
}

class Keyboard {

    private observers: Array<KeyboardLayout>;

    public constructor() {

        this.observers = new Array<KeyboardLayout>();

        document.addEventListener("keydown", (e: KeyboardEvent) => this.KeyDown(e.keyCode), false);

        document.addEventListener("keyup", (e: KeyboardEvent) => this.KeyUp(e.keyCode), false);

    }

    private KeyDown(key: number) {

        if (key == 77) {

            System.audioLibrary.ToggleMute();

        }
        else {

            for (var i = 0; i < this.observers.length; i++) {

                this.observers[i].KeyDown(key);

            }

        }

    }

    private KeyUp(key: number) {

        for (var i = 0; i < this.observers.length; i++) {

            this.observers[i].KeyUp(key);

        }
    }

    public AddObserver(observer: KeyboardLayout) {

        this.observers.push(observer);

    }

    public RemoveObserver(observer: KeyboardLayout) {

        for (var i = 0; i < this.observers.length; i++) {

            if (this.observers[i] === observer) {
                this.observers.splice(i, 1);
                return;
            }

        }

    }
}

abstract class Input {

    public ship: Ship;
    public isKeyboard: boolean;

    constructor(ship: Ship, isKeyboard:boolean) {
        this.isKeyboard = isKeyboard;
        this.ship = ship;
    }

    abstract Act(): void;

    public id: number;

    abstract Detach(): void;
}

class GamePadLayout extends Input
{
    private gp:Gamepad;
    private keys: Array<boolean>;
    private keyMap: Array<Actions>;

    constructor(ship:Ship, gamePadId: number) {
        super(ship, false);

        this.keys = new Array<boolean>(15);
        this.FillKeyMap();
        this.id= gamePadId;
    }

    private FillKeyMap() {

        this.keyMap = new Array<Actions>(15);
        this.keyMap[0] = Actions.MISILE;
        this.keyMap[1] = Actions.ACCELERATE;
        this.keyMap[2] = Actions.SHIELD;
        this.keyMap[3] = Actions.FIRE;
        this.keyMap[14] = Actions.LEFT;
        this.keyMap[15] = Actions.RIGHT;

    }

    public XAxis(axis:number, value:number) {

        if (!this.keys[axis]) {

            if (this.gp.axes[0].valueOf() == value) {
                this.keys[axis] = true;
                this.ship.OnKeyDown(this.keyMap[axis]);
            }

        }
        else {
            if (this.gp.axes[0].valueOf() != value) {
                this.keys[axis] = false;
                this.ship.OnKeyUp(this.keyMap[axis]);
            }
        }
    }

    public Act() {

        this.gp = navigator.getGamepads()[this.id];

        if (this.gp == null) {
            return;
        }

        this.XAxis(15, 1);
        this.XAxis(14, -1);

        for (var i = 0; i < this.gp.buttons.length; i++) {

            if (i == 14 || i == 15) {
                continue;
            }

            if (this.gp.buttons[i].pressed) {

                if (!this.keys[i]) {

                    this.keys[i] = true;
                    
                    this.ship.OnKeyDown(this.keyMap[i]);

                }

            }
            else if (this.keys[i]) {

                this.keys[i] = false;

                this.ship.OnKeyUp(this.keyMap[i]);

            }

        }

    }

    public Detach() { }

}

class KeyboardLayout extends Input {

    private keyMap: Array<Actions>;

    constructor(ship:Ship, accelerate: number, left: number, right: number, fire: number, misile: number, shield: number) {
        super(ship, true);

        this.keyMap = new Array<Actions>();

        this.keyMap[accelerate] = Actions.ACCELERATE;
        this.keyMap[left] = Actions.LEFT;
        this.keyMap[right] = Actions.RIGHT;
        this.keyMap[fire] = Actions.FIRE;
        this.keyMap[misile] = Actions.MISILE;
        this.keyMap[shield] = Actions.SHIELD;

        InputController.keyboard.AddObserver(this);

    }

    public KeyDown(index: number) {

        if (this.keyMap[index] === undefined) return;

        this.ship.OnKeyDown(this.keyMap[index]);

    }

    public KeyUp(index: number) {

        if (this.keyMap[index] === undefined) return;

        this.ship.OnKeyUp(this.keyMap[index]);

    }

    public Act() { }

    public Detach() {
        InputController.keyboard.RemoveObserver(this);
    }
}