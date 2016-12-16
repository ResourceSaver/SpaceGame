class Particle{

    private id;
    private hue;
    private orgHue;
    public active;
    private r;
    private x;
    private y;
    private vx;
    private vy;
    private gravity;

    public constructor(i) {
        this.id = i;

        this.orgHue = rand(50, 0, 1);

        this.active = false; 
    }

    public Build(x, y) {
        this.r = rand(7, 2, 1);
        this.x = x;
        this.y = y;
        this.active = true;
        this.hue = this.orgHue;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
        this.gravity = 0.01;

        System.canvas.DrawParticle(this.x, this.y, this.r, this.hue);
    }

    public Draw() {
        this.active = true;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.hue -= 0.5;
        this.r = Math.abs(this.r - .1);

        System.canvas.DrawParticle(this.x, this.y, this.r, this.hue);
        if (this.r <= .05) {
            this.active = false;
        }
    }


}

class ParticleSystem {
    private static particleNum = 60;

    private static particles:Array<Particle> = [];

    public constructor() {
        ParticleSystem.init();
    }

    public static init() {
        for (var i = 0; i < this.particleNum; i++) {
            this.particles.push(new Particle(i));
        }

    }

    private static x;

    private static y; 

    public static Build(x, y) {

        this.x = x;
        this.y = y;

    }

    private static count = 10;

    public static Draw() {

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




//helper functions
function rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
        min = min || 0,
        gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
};


