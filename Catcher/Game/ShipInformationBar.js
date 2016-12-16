class ShipInformationBar {
    constructor() {
        this.misilePicture = Images.GetImage("missile");
        this.shipsmall = Images.GetImage("shipsmall");
        this.sheildSmall = Images.GetImage("shieldsmall");
        this.lifesmall = Images.GetImage("lifesmall");
        this.asteroidsmall = Images.GetImage("asteroidsmall");
        this.xDiff = 40;
        this.xBigDiff = 55;
    }
    Draw(ship1, ship2) {
        this.DrawBar(ship1, 10, System.resolutionY - 40);
        this.DrawBar(ship2, System.resolutionX - 1100, System.resolutionY - 40);
    }
    DrawBar(ship, x, y) {
        System.canvas.DrawImage(this.shipsmall, x, y, 32, 32);
        x += this.xDiff;
        System.canvas.DrawText(x, y + 15, ship.numberOfLives.toString());
        x += this.xBigDiff;
        System.canvas.DrawImage(this.misilePicture, x, y, 32, 32);
        x += this.xDiff;
        System.canvas.DrawText(x, y + 15, ship.numberOfMisiles.toString());
        x += this.xBigDiff;
        System.canvas.DrawImage(this.asteroidsmall, x, y, 32, 32);
        x += this.xDiff;
        System.canvas.DrawText(x, y + 15, ship.score);
        x += this.xBigDiff * 2;
        System.canvas.DrawImage(this.sheildSmall, x, y, 32, 32);
        x += this.xDiff;
        System.canvas.DrawRectangle(x, y + 5, 20, 200 * 1.5, "#2E2F7C");
        System.canvas.DrawRectangle(x, y + 5, 20, ship.GetShield() * 1.5);
        x += this.xBigDiff * 6;
        System.canvas.DrawImage(this.lifesmall, x, y, 32, 32);
        x += this.xDiff;
        System.canvas.DrawRectangle(x, y + 5, 20, 5 * 65, "#2E2F7C");
        System.canvas.DrawRectangle(x, y + 5, 20, ship.energy * 65);
    }
}
