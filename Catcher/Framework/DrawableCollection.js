class DrawableCollection {
    constructor() {
        this.currentDrawable = 0;
        this.drawables = new Array(0);
    }
    AddDrawable(drawable) {
        this.drawables.push(drawable);
        this.currentDrawable = this.drawables.length - 1;
    }
    GetCurrentDrawable() {
        return this.drawables[this.currentDrawable];
    }
    SetCurrentDrawable(name) {
        for (let i = 0; i < this.drawables.length; i++) {
            if (this.drawables[i].GetName() === name) {
                this.currentDrawable = i;
                return;
            }
        }
    }
}
