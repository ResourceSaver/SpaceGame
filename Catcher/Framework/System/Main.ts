let chosenRequestFrame;
let fpsLabel, systemPerformance;
var system;
var prevFPS = 0;
var currentFPS = 0;

window.onload = () => { new Images(() => this.OnImagesLoaded()); };

function OnImagesLoaded() {

    this.chosenRequestFrame = GetFrame();

    this.system = new System();

    system.Initialize();



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

    this.system.Act();

    this.chosenRequestFrame(RunGame);

}

function RunGameDebugMode() {

    this.system.Act();

    this.chosenRequestFrame(RunGameDebugMode);

    this.currentFPS = this.systemPerformance.GetFPS();

    if (Math.abs(this.currentFPS - this.prevFPS) > 3) {

        this.fpsLabel.innerHTML = this.currentFPS;
        this.prevFPS = this.currentFPS;
    }

}

function GetFrame() {

    return this.window.requestAnimationFrame ||
        this.window.webkitRequestAnimationFrame ||
        this.window.mozRequestAnimationFrame ||
        this.window.oRequestAnimationFrame ||
        this.window.msRequestAnimationFrame ||
        function (callback, element) {
            this.window.setTimeout(callback, 1000 / 60)
        };

}