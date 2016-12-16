class DrawableLibrary {

    public static GetShip(explotionFinishedEventHandler:Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        let ship: HTMLImageElement = Images.GetImage("ship");
        
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(ship, 15, 6272, 0, 128, 128, 7, "idle"));

        return drawableCollection;
    }

    public static GetShield(): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("shield"), 20, 0, 0, 192, 192, 0, "shield", null));
        
        return drawableCollection;

    }
    
    public static GetSaucer(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("saucer"), 16, 0, 0, 128, 128, 6, "saucer"));

        return drawableCollection;

    }

    public static GetAsteroid(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid"), 16, 0, 0, 64, 64, 3, "asteroid"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid3"), 16, 0, 0, 64, 64, 3, "asteroid3"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid4"), 16, 0, 0, 64, 64, 3, "asteroid4"));

        return drawableCollection;

    }

    public static GetFighter(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("fighter"), 16, 0, 0, 128, 128, 6, "fighter"));

        return drawableCollection;

    }

    public static GetSlicer(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("slicer"), 16, 0, 0, 128, 128, 6, "slicer"));

        return drawableCollection;

    }

    public static GetBlades(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("blades"), 16, 0, 0, 128, 128, 6, "blades"));

        return drawableCollection;

    }

    public static GetLazer(color: string): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0, 32, 32));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bullet" + color), 16, 0, 0, 32, 64, 1, "bullet"));

        return drawableCollection;

    }

    public static GetPowerUps() {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("life", Images.GetImage("shipsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("shield", Images.GetImage("shieldsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("blitz", Images.GetImage("blitz"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("energy", Images.GetImage("lifesmall"), 0, 0));

        return drawableCollection;

    }

    public static GetThrust() {
        let drawableCollection: DrawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("thrust"), 24, 0, 0, 128, 128, 1, "thrust"));
        return drawableCollection;

    }

    public static GetSpikey(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("spikey"), 16, 0, 0, 128, 128, 6, "spikey"));

        return drawableCollection;

    }

    public static GetBugEye(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bugeye"), 16, 0, 0, 128, 128, 6, "bugeye"));

        return drawableCollection;

    }

    public static GetScythe(explotionFinishedEventHandler: Function): DrawableCollection {

        let drawableCollection: DrawableCollection = new DrawableCollection();

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));

        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("scythe"), 16, 0, 0, 128, 128, 6, "scythe"));

        return drawableCollection;

    }

}