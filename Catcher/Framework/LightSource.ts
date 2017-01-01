class LightSource {

    private xx = 1.0;
    private dd = 0;
    private x0 = 0;
    private x1 = 0;
    private y0 = 0;
    private y1 = 0;

    public Act() {
        if (this.xx > 0) {
            this.xx = this.xx - 0.1;
        }
        else {
            return;
        }

        this.Draw();

    }

    private Draw() {

        this.dd = (1 + Math.sin(this.xx)) / 2;        

        System.canvas.DrawLight(this.dd, this.xx, this.x0, this.y0, this.x1, this.y1);


    }

    public Blitz() {

        this.xx = 1;

        System.audioLibrary.Play(14);

        this.x0 = System.resolutionX * Math.random();
        this.y0 = System.resolutionY * Math.random();
        this.x1 = System.resolutionX * Math.random();
        this.y1 = System.resolutionY * Math.random();

    }
}


