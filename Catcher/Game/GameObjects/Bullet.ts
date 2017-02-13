class Bullet extends GameObject{

    public attack = 0;
   
    constructor(color:string) {
        super(24, 40, 0, 0, System.canvas);
        
        this.state = ObjectState.DEAD;

        this.drawableCollection = System.drawableLibrary.GetLazer(color);

    }

    public Spawn(ship:GameObject, type:BulletTypes, vector:Vector, offset:number) {

        this.timestamp = SpaceGame.HeartBeat;

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

        let radian = this.vector.angle * Math.PI / 180;

        this.x = Math.cos(radian) * offset + (ship.x + ship.widthHalf - this.widthHalf);

        this.y = Math.sin(radian) * offset + (ship.y + ship.heightHalf - this.heightHalf);
        
    }

    public Draw() { this.canvas.DrawObjectRotate(this); }

    public Act() {

        super.Act();

        this.Draw();

        return this.HasReached();

    }

}