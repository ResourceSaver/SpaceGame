﻿let chosenRequestFrame;
let spaceGame;

let fpsLabel, systemPerformance;
var prevFPS = 0;
var currentFPS = 0;

window.onload = () => { new Images(() => this.OnImagesLoaded()); };

function OnImagesLoaded() {

    this.chosenRequestFrame = GetFrame();

    this.spaceGame = System.Initialize();

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

    this.currentFPS = this.systemPerformance.GetFPS();

    if (Math.abs(this.currentFPS - this.prevFPS) > 3){
        this.fpsLabel.innerHTML = this.currentFPS;
        this.prevFPS = this.currentFPS;
    }

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
            this.window.setTimeout(callback, 1000 / 60)
        };

}