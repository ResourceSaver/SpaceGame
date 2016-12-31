class ParticlePool {
    private particleNum = 60;
    private x;
    private y;
    private particles: Array<Particle> = [];
    private count = 0;

    public constructor() {

        for (var i = 0; i < this.particleNum; i++) {

            this.particles.push(new Particle(i));

        }

    }

    public Build(x, y) {

        this.x = x;

        this.y = y;

    }

    public Draw() {

        for (var i = 0; i < this.particles.length; i++) {

            if (this.particles[i].active === true) {

                this.particles[i].Draw();

            }
            else if (this.x != -1) {

                this.particles[i].Build(this.x, this.y);

                this.count++;

                if (this.count > 30) {

                    this.x = -1;

                }
            }
        }

        this.count = 0;

        this.x = -1;

    }

}