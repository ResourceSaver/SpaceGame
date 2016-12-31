let chosenRequestFrame;
let spaceGame;
let fpsLabel, systemPerformance;
window.onload = () => { new Images(() => this.OnImagesLoaded()); };
function OnImagesLoaded() {
    this.chosenRequestFrame = GetFrame();
    this.spaceGame = System.Initialize();
    alert(System.DebugMode);
    if (System.DebugMode) {
        this.fpsLabel = document.getElementById("fpsLabel");
        this.systemPerformance = new SystemPerformance();
        RunGameDebugMode();
    }
    else {
        RunGame();
    }
}
function RunGame() {
    System.gamePad.Act();
    this.spaceGame.Act();
    this.chosenRequestFrame(RunGame);
}
function RunGameDebugMode() {
    this.fpsLabel.innerHTML = this.systemPerformance.GetFPS();
    System.gamePad.Act();
    this.spaceGame.Act();
    this.chosenRequestFrame(RunGameDebugMode);
}
function GetFrame() {
    return this.window.requestAnimationFrame ||
        this.window.webkitRequestAnimationFrame ||
        this.window.mozRequestAnimationFrame ||
        this.window.oRequestAnimationFrame ||
        this.window.msRequestAnimationFrame ||
        function (callback, element) {
            this.window.setTimeout(callback, 1000 / 60);
        };
}
