class Thrust extends GameObject{
   
    private thrusting: boolean;
    private ship: GameObject;

    constructor(ship: GameObject) {
        super(ship.width, ship.height, ship.x, ship.y + ship.height - 20, System.canvas);

        this.drawableCollection = System.drawableLibrary.GetThrust();

        this.thrusting = false;

        this.ship = ship;

    }

    public Spawn() {
        this.x = this.ship.x;
        this.y = this.ship.y + this.ship.height - 20;
        this.SetThrusting(false);
    }

    public Draw() { this.canvas.DrawObjectRotateAround(this); }

    public Act() {

        this.vector.Copy(this.ship.vector);

        super.Act();

        if (!this.thrusting || this.ship.Is(ObjectState.DEAD) || this.ship.Is(ObjectState.EXPLODING)) return;

        this.Draw();

    }

    public SetThrusting(value: boolean) {

        this.thrusting = value;

    }

}