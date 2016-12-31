class Particle {
    constructor(i) {
        this.id = i;
        this.orgHue = rand(50, 0, 1);
        this.active = false;
    }
    Build(x, y) {
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
    Draw() {
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
function rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1, min = min || 0, gen = min + (max - min) * Math.random();
    return (_int) ? Math.round(gen) : gen;
}
;
