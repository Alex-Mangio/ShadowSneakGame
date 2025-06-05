export default class Enemy {
    width =70;
    height =70;
    hitboxWidth = 40;
    hitboxHeight = 40;
    directionChangeCooldown = 0;
    previousDirection = null;

    constructor({ position, speed }) {
        this.position = position;
        this.speed = speed;
        this.image = new Image();
        this.image.src = "./gameImages/witchEnemy.png";
        this.velocity = { x: speed, y: 0 };
    }

    getHitbox(x = this.position.x, y = this.position.y) {
        const hitboxWidth = this.width * 0.6;
        const hitboxHeight = this.height * 0.6;
        return {
            x: x + (this.width - hitboxWidth) / 2,
            y: y + (this.height - hitboxHeight) / 2,
            width: hitboxWidth,
            height: hitboxHeight
        };
    }

    isColliding(newPos, map) {
        const hitbox = this.getHitbox(newPos.x, newPos.y);
        return map.some(tile => {
            const tX = tile.position.x;
            const tY = tile.position.y;
            const tW = tile.width;
            const tH = tile.height;
            return (
                hitbox.x < tX + tW &&
                hitbox.x + hitbox.width > tX &&
                hitbox.y < tY + tH &&
                hitbox.y + hitbox.height > tY
            );
        });
    }

    distanceToPlayer(player) {
        const centerX = this.position.x + this.width / 2;
        const centerY = this.position.y + this.height / 2;
        const playerCenterX = player.position.x + player.width / 2;
        const playerCenterY = player.position.y + player.height / 2;

        const dx = playerCenterX - centerX;
        const dy = playerCenterY - centerY;

        return Math.sqrt(dx * dx + dy * dy);
    }

    update(map, player) {
        const directions = [
            { x: this.speed, y: 0, name: "right" },
            { x: -this.speed, y: 0, name: "left" },
            { x: 0, y: this.speed, name: "down" },
            { x: 0, y: -this.speed, name: "up" }
        ];

        const opposite = {
            right: "left",
            left: "right",
            down: "up",
            up: "down"
        };

        const freeDirections = directions.filter(dir => {
            const newPos = {
                x: this.position.x + dir.x,
                y: this.position.y + dir.y
            };
            return !this.isColliding(newPos, map);
        });

        const distance = this.distanceToPlayer(player);
        const chaseRadius = 400;

        if (distance < chaseRadius) {
            const dx = player.position.x - this.position.x;
            const dy = player.position.y - this.position.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const normX = (dx / length) * this.speed;
            const normY = (dy / length) * this.speed;

            const newPos = {
                x: this.position.x + normX,
                y: this.position.y + normY
            };

            if (!this.isColliding(newPos, map)) {
                this.velocity = { x: normX, y: normY };
            } else {
                if (freeDirections.length > 0 && this.directionChangeCooldown <= 0) {
                    let possibleDirections = freeDirections;
                    if (this.previousDirection) {
                        possibleDirections = freeDirections.filter(dir => dir.name !== opposite[this.previousDirection]);
                        if (possibleDirections.length === 0) {
                            possibleDirections = freeDirections;
                        }
                    }
                    const newDir = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                    this.velocity = { x: newDir.x, y: newDir.y };
                    this.previousDirection = newDir.name;
                    this.directionChangeCooldown = 30;
                }
            }
        } else {
            const nextPos = {
                x: this.position.x + this.velocity.x,
                y: this.position.y + this.velocity.y
            };
            const stuck = this.isColliding(nextPos, map);

            if (stuck || (this.directionChangeCooldown <= 0 && Math.random() < 0.02)) {
                if (freeDirections.length > 0) {
                    let possibleDirections = freeDirections;
                    if (this.previousDirection) {
                        possibleDirections = freeDirections.filter(dir => dir.name !== opposite[this.previousDirection]);
                        if (possibleDirections.length === 0) {
                            possibleDirections = freeDirections;
                        }
                    }
                    const newDir = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                    this.velocity = { x: newDir.x, y: newDir.y };
                    this.previousDirection = newDir.name;
                    this.directionChangeCooldown = 30;
                } else {
                    this.velocity = { x: 0, y: 0 };
                }
            }
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.directionChangeCooldown > 0) {
            this.directionChangeCooldown--;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

        //const hitbox = this.getHitbox();
        //ctx.strokeStyle = "blue";
        //ctx.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    }
}