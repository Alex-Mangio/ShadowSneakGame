export const bushImage = new Image();
export default class Tile {
    static width = 70;
    static height = 70;

    constructor({ position }) {
        this.position = position;
        this.width = Tile.getWidth();
        this.height = Tile.getHeight();
    }

    draw(ctx) {
        console.log("bushImage.complete", bushImage.complete);
            ctx.drawImage(bushImage, this.position.x, this.position.y, this.width,this.height);
         
    }

    static getWidth() {
        return 35;
    }

    static getHeight() {
        return 35;
    }
    
}