class Drawable {
    constructor(name, image, offsetX = 0, offsetY = 0, width = image.width, height = image.height) {
        this.image = image;
        this.offsetx = offsetX;
        this.offsety = offsetY;
        this.width = width;
        this.height = height;
        this.name = name;
    }
    GetImage() { return this.image; }
    GetOffsetX() { return this.offsetx; }
    GetOffSetY() { return this.offsety; }
    GetWidth() { return this.width; }
    GetHeight() { return this.height; }
    GetName() { return this.name; }
}
