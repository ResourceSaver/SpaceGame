class Obstacle extends GameObject{

    protected size: AsteroidSize;
    protected type: ObstacleType;

    constructor(size: AsteroidSize, width: number, height: number, x: number, y: number, canvas: Canvas, energy:number) {
        super(width, height, x, y, canvas);

        this.hitColor = "green";

        this.size = size;

        this.energy = energy;

        this.vector.x = Math.random() * -6 + 3;

        this.vector.y = Math.random() * -6 + 3;

        this.type = ObstacleType.OTHER;

        this.SetRandomCoordinates();

    }

    private SetRandomCoordinates() {

        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? System.resolutionX : - this.width;
            this.y = Math.random() * System.resolutionY;
        }
        else {
            this.x = Math.random() * System.resolutionX;
            this.y = Math.random() > 0.5 ? System.resolutionY : - this.height;
        }

    }

    public HitByBullet(attack:number): void {

        super.HitByBullet(attack);

        this.energy -= attack;

    }

    public GetEnergy() {

        return this.energy;

    }

    public Explode(): void {

        SpaceGame.particlePool.Build(this.x + this.widthHalf, this.y + this.heightHalf);

        this.state = ObjectState.EXPLODING;

        this.drawableCollection.SetCurrentDrawable("explosion");

        System.audioLibrary.Play(0);
        
    }

    public GetSize() {

        return this.size;

    }

    public IsType(type: ObstacleType) {

        return this.type == type;

    }

    public SetCoordinates(x: number, y: number) {

        this.x = x;

        this.y = y;

    }
}