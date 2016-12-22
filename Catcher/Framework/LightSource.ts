class LightSource {

    private radius;

    public constructor(radius) {
        this.radius = radius;
    }
    
    public Act(x:number, y:number) {

        System.canvas.DrawLight(x, y, this.radius);

    }
}


