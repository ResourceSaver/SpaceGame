class Bullet extends GameObject {
    constructor(color) {
        super(32, 64, 0, 0, System.canvas);
        this.attack = 0;
        this.state = ObjectState.DEAD;
        this.drawableCollection = System.drawableLibrary.GetLazer(color);
    }
    Spawn(ship, type, vector) {
        this.timestamp = SpaceGame.heatbeat;
        this.vector.Copy(vector);
        if (type == BulletTypes.LAZER) {
            this.drawableCollection.SetCurrentDrawable("bullet");
            this.reach = 70;
            this.attack = 1;
            this.AdjustBoundingbox(-20, -20);
            this.vector.Accelerate(8);
        }
        else if (type == BulletTypes.MISILE) {
            this.reach = 140;
            this.attack = 10;
            this.drawableCollection.SetCurrentDrawable("missile");
            this.vector.Accelerate(4);
        }
        this.state = ObjectState.ALIVE;
        this.x = ship.x + ship.widthHalf - this.widthHalf;
        this.y = ship.y + ship.heightHalf - this.heightHalf;
    }
    Draw() { this.canvas.DrawObjectRotate(this); }
    Act() {
        super.Act();
        this.Draw();
        return this.HasReached();
    }
}
