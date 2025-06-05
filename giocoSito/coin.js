export const coinImage = new Image();
coinImage.src = "./gameImages/moneta.png";

export default class Coin {
  static width = 35;
  static height = 35;
  collected = false;

  constructor({ position }) {
    this.position = position;
  }

  draw(ctx) {
    if (!this.collected) {
      ctx.drawImage(coinImage, this.position.x, this.position.y, Coin.width, Coin.height);
    }
  }

  static getWidth() {
    return Coin.width;
  }

  static getHeight() {
    return Coin.height;
  }

  getHitbox() {
    return {
      x: this.position.x,
      y: this.position.y,
      width: Coin.width,
      height: Coin.height
    };
  }

  collect() {
    this.collected = true;
  }
}