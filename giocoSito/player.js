export default class Player {
    width =70;
    height =70;
    hitboxWidth = 40;
    hitboxHeight = 40;
    imageLoad = false;

    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.image = new Image();
        this.image.src = "./gameImages/hooded_skeletal_character_final_32x32.png";

        this.image.onload = () => {
            this.imageLoad = true;
            console.log("Immagine caricata!");
        };
    }

    drawPlayer(ctx) {
        if (!this.imageLoad) return;
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        //const hitbox = this.getHitbox();
        //ctx.strokeStyle = "red";
        //ctx.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    }

    getHitbox() {
        const hitboxWidth = this.width * 0.6;
        const hitboxHeight = this.height * 0.6;
        return {
            x: this.position.x + (this.width - hitboxWidth) / 2,
            y: this.position.y + (this.height - hitboxHeight) / 2,
            width: hitboxWidth,
            height: hitboxHeight
        };
    }
}