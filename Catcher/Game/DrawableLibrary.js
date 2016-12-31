class DrawableLibrary {
    GetShip(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        let ship = Images.GetImage("ship");
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(ship, 15, 6272, 0, 128, 128, 7, "idle"));
        return drawableCollection;
    }
    GetShield() {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("shield"), 20, 0, 0, 192, 192, 0, "shield", null));
        return drawableCollection;
    }
    GetSaucer(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("saucer"), 16, 0, 0, 128, 128, 6, "saucer"));
        return drawableCollection;
    }
    GetAsteroid(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid"), 16, 0, 0, 64, 64, 3, "asteroid"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid3"), 16, 0, 0, 64, 64, 3, "asteroid3"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid4"), 16, 0, 0, 64, 64, 3, "asteroid4"));
        return drawableCollection;
    }
    GetFighter(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("fighter"), 16, 0, 0, 128, 128, 6, "fighter"));
        return drawableCollection;
    }
    GetSlicer(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("slicer"), 16, 0, 0, 128, 128, 6, "slicer"));
        return drawableCollection;
    }
    GetBlades(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("blades"), 16, 0, 0, 128, 128, 6, "blades"));
        return drawableCollection;
    }
    GetLazer(color) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0, 32, 32));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bullet" + color), 16, 0, 0, 32, 64, 1, "bullet"));
        return drawableCollection;
    }
    GetPowerUps() {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("life", Images.GetImage("shipsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("shield", Images.GetImage("shieldsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("blitz", Images.GetImage("blitz"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("energy", Images.GetImage("lifesmall"), 0, 0));
        return drawableCollection;
    }
    GetThrust() {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("thrust"), 24, 0, 0, 128, 128, 1, "thrust"));
        return drawableCollection;
    }
    GetSpikey(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("spikey"), 16, 0, 0, 128, 128, 6, "spikey"));
        return drawableCollection;
    }
    GetBugEye(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bugeye"), 16, 0, 0, 128, 128, 6, "bugeye"));
        return drawableCollection;
    }
    GetScythe(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("scythe"), 16, 0, 0, 128, 128, 6, "scythe"));
        return drawableCollection;
    }
}
