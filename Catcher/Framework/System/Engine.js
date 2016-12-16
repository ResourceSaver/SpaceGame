window.onload = () => { new Images(() => this.OnImagesLoaded()); };

let chosenRequestFrame;
let spaceGame;
let fpsLabel;
var fps = { startTime: 0, frameNumber: 0, getFPS: function () { this.frameNumber++; var d = new Date().getTime(), currentTime = (d - this.startTime) / 1000, result = Math.floor((this.frameNumber / currentTime)); if (currentTime > 1) { this.startTime = new Date().getTime(); this.frameNumber = 0; } return result; } };
let gamePadConnected = false;

//function DetectGamePad() {

//    this.gamePadConnected = navigator.getGamepads()[0] != undefined;

//    //if (this.gamePadConnected == false) {

//    //    window.addEventListener("gamepadconnected", function () {

//    //        this.gamePadConnected = true;

//    //    });

//    //}

//    this.OnImagesLoaded();

//}

function OnImagesLoaded() {

    this.gamePadConnected = navigator.getGamepads()[0] != undefined; // flyt til gamepad klasse og altid kald act på den.

    System.Initialize();

    AudioLibrary.Initialize(); // flyt til system.initialize

    this.chosenRequestFrame = FindRequestFrame();

    this.fpsLabel = document.getElementById("fpsLabel");

    this.spaceGame = new SpaceGame();

    GamePad.Setup(this.spaceGame); // flyt til system.initialize

    Keyboard.Setup(this.spaceGame); // flyt til system.initialize
    
    RunGame();

}

function RunGame() {

    if (System.DebugMode) {
        this.fpsLabel.innerHTML = fps.getFPS();
    }

    if (this.gamePadConnected) // flyt til gamepad.act();
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