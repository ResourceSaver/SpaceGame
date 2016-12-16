class Drawable {

    private image: HTMLImageElement;
    private offsetx: number;
    private offsety: number;
    private width: number;
    private height: number;
    private name: string;

    constructor(name: string, image: HTMLImageElement, offsetX: number = 0, offsetY: number = 0, width: number = image.width, height: number = image.height) {

        this.image = image;
        this.offsetx = offsetX;
        this.offsety = offsetY;
        this.width = width;
        this.height = height;
        this.name = name;

    }

    public GetImage() { return this.image; }

    public GetOffsetX(): number { return this.offsetx; }

    public GetOffSetY(): number { return this.offsety; }

    public GetWidth(): number { return this.width; }

    public GetHeight(): number { return this.height; }

    public GetName(): string { return this.name; }

}