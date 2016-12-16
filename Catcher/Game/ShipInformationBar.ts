class ShipInformationBar {

    private misilePicture = Images.GetImage("missile");
    private shipsmall = Images.GetImage("shipsmall");
    private sheildSmall = Images.GetImage("shieldsmall");
    private lifesmall = Images.GetImage("lifesmall");
    private asteroidsmall = Images.GetImage("asteroidsmall");

    private barWidth: number = 65;
    private barHeight: number = 5;

    private xDiff = 32;
    private xBigDiff = 55;
    private iconSize = 24;
    private font = "24px Impact";

    private show: boolean = false;
    private yDiff: number = 12;
    private max = 90;

    private energyCounter = 0;
    private currentEnergy: number;

    private shieldCounter = 0;
    private currentShield: number;

    private maxShipEnergy: number;
    private maxShipShield: number;

    private shipCenterX;
    private shipCenterY;
    private perc;
    private alpha;
    private fadeFactor: number = 10;
    private height;

    // todo ship x og y kan sætte i draw 1 gange

    public Draw(ship: Ship) {

        if (this.maxShipShield === undefined) {
            this.maxShipShield = ship.GetShield();
            this.maxShipEnergy = ship.energy
            this.currentEnergy = ship.energy;
            this.currentShield = ship.GetShield();
        }

        this.DrawScores(ship, 0);

        if (ship.Is(ObjectState.EXPLODING)) {
            this.currentEnergy = ship.energy;
            this.currentShield = ship.GetShield();
            this.energyCounter = 0;
            this.shieldCounter = 0;
        }
    
        if (this.currentEnergy != ship.energy) {
            this.currentEnergy = ship.energy;
            this.energyCounter = this.max;
        }

        //if (this.currentShield != ship.GetShield()) {
        //    this.currentShield = ship.GetShield();
        //    this.shieldCounter = this.max;
        //}

        if (this.show) {
        }
        else {
            //this.energyCounter = this.max;
            //this.DrawEnergy(ship);

            this.DrawLife(ship, 100, 5);
            this.DrawMissile(ship, 100 + this.xBigDiff, 5);

            if (this.energyCounter > 0) {
                this.energyCounter--;
                this.DrawEnergy(ship);
            }

            if (this.currentShield != ship.GetShield()) {

                this.currentShield = ship.GetShield();
                this.DrawShield(ship);

            }

            //if (this.shieldCounter > 0) {

            //    this.shieldCounter--;

            //    this.DrawShield(ship);
            //}
        }
    }

    DrawLife(ship: Ship, x:number, y:number) {

        System.canvas.DrawImage(this.shipsmall, x, y, this.iconSize, this.iconSize, this.alpha);

        System.canvas.DrawText(x + this.xDiff, y + this.yDiff, ship.numberOfLives.toString(), this.font);

    }

    DrawMissile(ship:Ship, x:number, y:number) {

        System.canvas.DrawImage(this.misilePicture, x, y, this.iconSize, this.iconSize, this.alpha);

        System.canvas.DrawText(this.xDiff + x, y + this.yDiff, ship.numberOfMisiles.toString(), this.font);

    }

    DrawScores(ship: Ship, x: number) {

        System.canvas.DrawImage(this.asteroidsmall, x, 5, this.iconSize, this.iconSize);

        x += this.xDiff;

        System.canvas.DrawText(x, 5 + 12, ship.score, this.font);

    }

    DrawEnergy(ship:Ship) {

        this.height = this.barHeight;

        if (this.energyCounter < this.max / this.fadeFactor) {
            this.height = this.height * this.energyCounter / (this.max / this.fadeFactor);
        }

        this.shipCenterX = ship.x + ship.widthHalf - (this.barWidth / 2);
        this.shipCenterY = ship.y + ship.height;

        System.canvas.DrawRectangle(this.shipCenterX - 4, this.shipCenterY - 4, this.height + 8, this.barWidth + 8, "white");

        System.canvas.DrawRectangle(this.shipCenterX - 2, this.shipCenterY - 2, this.height + 4, this.barWidth + 4, "black");

        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height , this.barWidth, "#003300");

        this.perc = (ship.energy / this.maxShipEnergy) * this.barWidth;

        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height , this.perc, "#00CC00");

    }

    DrawShield(ship:Ship) {

        this.height = this.barHeight;

        //if (this.shieldCounter < this.max / this.fadeFactor) {
        //    this.height = this.height * this.shieldCounter / (this.max / this.fadeFactor);
        //}

        this.shipCenterX = ship.x + ship.widthHalf - (this.barWidth / 2);

        this.shipCenterY = ship.y + ship.height + this.height + 12;

        System.canvas.DrawRectangle(this.shipCenterX - 4, this.shipCenterY - 4, this.height + 8, this.barWidth + 8, "white");

        System.canvas.DrawRectangle(this.shipCenterX - 2, this.shipCenterY - 2, this.height + 4, this.barWidth + 4, "black");

        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height , this.barWidth, "#2E2F7C");

        this.perc = (ship.GetShield() / this.maxShipShield) * this.barWidth;

        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height , this.perc, "#7F7FFF");

    }

}