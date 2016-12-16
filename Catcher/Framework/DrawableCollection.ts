class DrawableCollection {

    private currentDrawable: number;
    private drawables: Array<Drawable>;

    constructor() {

        this.currentDrawable = 0;

        this.drawables = new Array<Drawable>(0);

    }

    public AddDrawable(drawable: Drawable) {

        this.drawables.push(drawable);

        this.currentDrawable = this.drawables.length - 1;
    }

    public GetCurrentDrawable() {

        return this.drawables[this.currentDrawable];

    }

    public SetCurrentDrawable(name: string) {

        for (let i = 0; i < this.drawables.length; i++){

            if (this.drawables[i].GetName() === name) {

                this.currentDrawable = i;

                return;

            }
        }

    }
}