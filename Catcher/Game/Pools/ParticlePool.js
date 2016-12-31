class ParticlePool {
    constructor() {
        this.particleNum = 60;
        this.particles = [];
        this.count = 0;
        for (var i = 0; i < this.particleNum; i++) {
            this.particles.push(new Particle(i));
        }
    }
    Build(x, y) {
        this.x = x;
        this.y = y;
    }
    Draw() {
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
