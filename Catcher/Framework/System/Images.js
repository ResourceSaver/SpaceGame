class Images {
    constructor(callback) {
        this.imagesLoaded = 0;
        this.callback = callback;
        Images.images = new Array();
        this.AddImage("/../Resources/Images/background.png", "background");
        this.AddImage("/../Resources/Images/ship.png", "ship");
        this.AddImage("/../Resources/Images/saucer.png", "saucer");
        this.AddImage("/../Resources/Images/fighter.png", "fighter");
        this.AddImage("/../Resources/Images/asteroid.png", "asteroid");
        this.AddImage("/../Resources/Images/asteroid3.png", "asteroid3");
        this.AddImage("/../Resources/Images/asteroid4.png", "asteroid4");
        this.AddImage("/../Resources/Images/blades.png", "blades");
        this.AddImage("/../Resources/Images/explosion.png", "explosion");
        this.AddImage("/../Resources/Images/bulletred.png", "bulletred");
        this.AddImage("/../Resources/Images/bulletgreen.png", "bulletgreen");
        this.AddImage("/../Resources/Images/slicer.png", "slicer");
        this.AddImage("/../Resources/Images/bulletblue.png", "bulletblue");
        this.AddImage("/../Resources/Images/shield.png", "shield");
        this.AddImage("/../Resources/Images/missile.png", "missile");
        this.AddImage("/../Resources/Images/shipsmall.png", "shipsmall");
        this.AddImage("/../Resources/Images/shieldsmall.png", "shieldsmall");
        this.AddImage("/../Resources/Images/asteroidsmall.png", "asteroidsmall");
        this.AddImage("/../Resources/Images/blitz.png", "blitz");
        this.AddImage("/../Resources/Images/thrust.png", "thrust");
        this.AddImage("/../Resources/Images/lifesmall.png", "lifesmall");
        this.AddImage("/../Resources/Images/bugeye.png", "bugeye");
        this.AddImage("/../Resources/Images/scythe.png", "scythe");
        this.AddImage("/../Resources/Images/spikey.png", "spikey");
        this.AddImage("/../Resources/Images/jewel.png", "jewel");
    }
    AddImage(path, name) {
        let image = new Image();
        image.onload = () => {
            this.imagesLoaded++;
            if (this.imagesLoaded == Images.images.length) {
                console.log("Images loaded");
                this.callback();
            }
        };
        image.src = path;
        image.id = name;
        Images.images.push(image);
    }
    static GetImage(name) {
        for (let i = 0; i < Images.images.length; i++) {
            if (Images.images[i].id == name) {
                return Images.images[i];
            }
        }
        alert("Image: " + name + " not found");
    }
}
