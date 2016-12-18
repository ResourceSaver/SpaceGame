let chosenRequestFrame;
let spaceGame;
let fpsLabel;
var fps = { startTime: 0, frameNumber: 0, getFPS: function () { this.frameNumber++; var d = new Date().getTime(), currentTime = (d - this.startTime) / 1000, result = Math.floor((this.frameNumber / currentTime)); if (currentTime > 1) { this.startTime = new Date().getTime(); this.frameNumber = 0; } return result; } };

window.onload = () => { new Images(() => this.OnImagesLoaded()); };

function OnImagesLoaded() {

    this.spaceGame = System.Initialize();

    this.chosenRequestFrame = GetFrame();

    this.fpsLabel = document.getElementById("fpsLabel");

    RunGame();

}

declare function webkitRequestAnimationFrame();
declare function mozRequestAnimationFrame();
declare function oRequestAnimationFrame();

function GetFrame() {
    return requestAnimationFrame ||
        webkitRequestAnimationFrame ||
        mozRequestAnimationFrame ||
        oRequestAnimationFrame ||
        msRequestAnimationFrame ||
        function (callback, element) { window.setTimeout(callback, 1000 / 60) };
}

function RunGame() {

    if (System.DebugMode) {
        this.fpsLabel.innerHTML = fps.getFPS();
    }

    GamePad.Act();

    this.spaceGame.Act();

    this.chosenRequestFrame(RunGame);

}
