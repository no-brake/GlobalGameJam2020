// type PartType = "left" | "right";

export class Item {
    public name: string;
    public isDragging: boolean;

    public posX: number;
    public posY: number;

    public speedX: number;
    public speedY: number;

    public partType: string;
    public image: string;

    constructor(name: string, posX: number, posY: number, partType: string = "left", image: string = ""){
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.partType = partType;
        this.image = image;

        this.isDragging = false;

        this.speedX = Math.random() + Math.random();
        this.speedY = Math.random() + Math.random();
    }
}