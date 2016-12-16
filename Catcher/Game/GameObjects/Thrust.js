class Thrust extends GameObject {
    constructor(ship) {
        super(ship.width, ship.height, ship.x, ship.y + ship.height - 20, System.canvas);
        this.drawableCollection = DrawableLibrary.GetThrust();
        this.thrusting = false;
        this.ship = ship;
    }
    Spawn() {
        this.x = this.ship.x;
        this.y = this.ship.y + this.ship.height - 20;
        this.SetThrusting(false);
    }
    Draw() { this.canvas.DrawObjectRotateAround(this); }
    Act() {
        this.vector.Copy(this.ship.vector);
        super.Act();
        if (!this.thrusting || this.ship.Is(ObjectState.DEAD) || this.ship.Is(ObjectState.EXPLODING))
            return;
        this.Draw();
    }
    SetThrusting(value) {
        this.thrusting = value;
    }
}
