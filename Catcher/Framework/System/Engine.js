let chosenRequestFrame;
let spaceGame;
let fpsLabel;
var fps = { startTime: 0, frameNumber: 0, getFPS: function () { this.frameNumber++; var d = new Date().getTime(), currentTime = (d - this.startTime) / 1000, result = Math.floor((this.frameNumber / currentTime)); if (currentTime > 1) { this.startTime = new Date().getTime(); this.frameNumber = 0; } return result; } };
let gamePadConnected = false;

window.onload = () => { new Images(() => this.DetectGamePad()); };

function DetectGamePad() {

    this.gamePadConnected = navigator.getGamepads()[0] != undefined;

    if (this.gamePadConnected == false) {

        window.addEventListener("gamepadconnected", function () {

            this.gamePadConnected = true;

        });

    }

    this.OnImagesLoaded();

}

function OnImagesLoaded() {

    System.Initialize();

    AudioLibrary.Initialize();

    this.chosenRequestFrame = FindRequestFrame();

    this.fpsLabel = document.getElementById("fpsLabel");

    this.spaceGame = new SpaceGame();

    GamePad.Setup(this.spaceGame);

    Keyboard.Setup(this.spaceGame);
    
    RunGame();

}

function RunGame() {

    if (System.DebugMode) {
        this.fpsLabel.innerHTML = fps.getFPS();
    }

    if (this.gamePadConnected)
    {
        GamePad.Act();
    }

    this.spaceGame.Act();

    this.chosenRequestFrame(RunGame);

}

function FindRequestFrame() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) { window.setTimeout(callback, 1000 / 60) };
    }