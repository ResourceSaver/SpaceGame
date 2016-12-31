class Obstacle extends GameObject {
    constructor(size, width, height, x, y, canvas, energy) {
        super(width, height, x, y, canvas);
        this.hitColor = "green";
        this.size = size;
        this.energy = energy;
        this.vector.x = Math.random() * -6 + 3;
        this.vector.y = Math.random() * -6 + 3;
        this.type = ObstacleType.OTHER;
        this.SetRandomCoordinates();
    }
    SetRandomCoordinates() {
        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? System.resolutionX : -this.width;
            this.y = Math.random() * System.resolutionY;
        }
        else {
            this.x = Math.random() * System.resolutionX;
            this.y = Math.random() > 0.5 ? System.resolutionY : -this.height;
        }
    }
    HitByBullet(attack) {
        super.HitByBullet(attack);
        this.energy -= attack;
    }
    GetEnergy() {
        return this.energy;
    }
    Explode() {
        SpaceGame.poolParticle.Build(this.x + this.widthHalf, this.y + this.heightHalf);
        this.state = ObjectState.EXPLODING;
        this.drawableCollection.SetCurrentDrawable("explosion");
        System.audioLibrary.Play(0);
    }
    GetSize() {
        return this.size;
    }
    IsType(type) {
        return this.type == type;
    }
    SetCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
}
