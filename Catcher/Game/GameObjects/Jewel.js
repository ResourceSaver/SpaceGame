class Jewel extends GameObject {
    constructor() {
        super(32, 32, System.resolutionX / 2, System.resolutionY / 2, System.canvas);
        this.drawableCollection = DrawableLibrary.GetJewel();
        this.drawableCollection.SetCurrentDrawable("jewel");
    }
    Act() {
        super.Act();
        this.Draw();
    }
}
