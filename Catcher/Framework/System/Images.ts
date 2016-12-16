class Images {

    private imagesLoaded: number;

    private callback: Function;

    private static images: Array<HTMLImageElement>;

    constructor(callback:Function) {

        this.imagesLoaded = 0;

        this.callback = callback;

        Images.images = new Array<HTMLImageElement>();

        this.AddImage("background.png", "background");

        this.AddImage("ship.png", "ship");

        this.AddImage("thrust.png", "thrust");

        this.AddImage("shield.png", "shield");

        this.AddImage("bulletred.png", "bulletred");

        this.AddImage("bulletgreen.png", "bulletgreen");

        this.AddImage("bulletblue.png", "bulletblue");

        this.AddImage("missile.png", "missile");

        this.AddImage("shield.png", "shield");

        this.AddImage("explosion.png", "explosion");

        // power ups

        this.AddImage("shipsmall.png", "shipsmall");

        this.AddImage("shieldsmall.png", "shieldsmall");

        this.AddImage("asteroidsmall.png", "asteroidsmall");

        this.AddImage("blitz.png", "blitz");

        this.AddImage("lifesmall.png", "lifesmall");

        // obstacles

        this.AddImage("blades.png", "blades");

        this.AddImage("slicer.png", "slicer");

        this.AddImage("bugeye.png", "bugeye");

        this.AddImage("scythe.png", "scythe");

        this.AddImage("spikey.png", "spikey");

        this.AddImage("saucer.png", "saucer");

        this.AddImage("fighter.png", "fighter");

        this.AddImage("asteroid.png", "asteroid");

        this.AddImage("asteroid3.png", "asteroid3");

        this.AddImage("asteroid4.png", "asteroid4");

    }

    private AddImage(file: string, name: string) {

        let image: HTMLImageElement = new Image();
        image.id = name;
        image.onload = () => {

            this.imagesLoaded++;

            if (this.imagesLoaded == Images.images.length) {

                this.callback();

            }
        };

        image.src = "Resources/Images/" + file;

        Images.images.push(image);

    }
    
    public static GetImage(name:string): HTMLImageElement {

        for (let i = 0; i < Images.images.length; i++) {

            if (Images.images[i].id == name) {

                return Images.images[i];

            }

        }

        alert("Image: " + name + " not found");

    }
    
}
