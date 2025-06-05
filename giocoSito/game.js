import keyInputs from "./KeyInputs.js";
import Tile, { bushImage } from "./gameMap.js";
import Coin, { coinImage } from "./coin.js";
import Player from "./player.js";
import Enemy from "./enemy.js";

let ctx;
let canvas;
let canvasH = window.innerHeight;
let canvasW = window.innerWidth;

let gameOver = false;
let victory = false;
let score = 0;
let totalCoins = 0;

const player = new Player({
  position: { x: 140, y: 140 },
  velocity: { x: 0, y: 0 }
});

const enemy = new Enemy({
  position: { x: 1610, y: 765 },
  speed: 1.5
});

let map = [];
let inputs = new keyInputs();
const messageDiv = document.getElementById("message");

window.onload = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  canvas.height = canvasH;
  canvas.width = canvasW;

  bushImage.onload = () => {
    drawMap();

    const waitForImage = setInterval(() => {
      if (player.imageLoad) {
        clearInterval(waitForImage);
        requestAnimationFrame(update);
      }
    }, 100);
  };

  bushImage.src = "./gameImages/cespuglio.png";
  coinImage.src = "./gameImages/moneta.png";
};

function update() {
  requestAnimationFrame(update);

  if (gameOver || victory) return;

  movePlayer();
  player.position.x += player.velocity.x;
  player.position.y += player.velocity.y;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.forEach((square) => {
    square.draw(ctx);

    checkCollision(player, square);
    checkCollision(enemy, square);

    if (square instanceof Coin && !square.collected) {
      const pHitbox = player.getHitbox();
      const cHitbox = square.getHitbox();

      const collided =
        pHitbox.x < cHitbox.x + cHitbox.width &&
        pHitbox.x + pHitbox.width > cHitbox.x &&
        pHitbox.y < cHitbox.y + cHitbox.height &&
        pHitbox.y + pHitbox.height > cHitbox.y;

      if (collided) {
        square.collect();
        score++;
        console.log("Score:", score);

        if (score === totalCoins) {
          console.log("Hai vinto!");
          victory = true;
          showMessage("Hai Vinto!");
        }
      }
    }
  });

  enemy.update(map, player);
  enemy.draw(ctx);
  player.drawPlayer(ctx);

  const eHitbox = enemy.getHitbox();
  const pHitbox = player.getHitbox();

  const collided =
    eHitbox.x < pHitbox.x + pHitbox.width &&
    eHitbox.x + eHitbox.width > pHitbox.x &&
    eHitbox.y < pHitbox.y + pHitbox.height &&
    eHitbox.y + eHitbox.height > pHitbox.y;

  if (collided) {
    console.log("Nemico ha raggiunto il player!");
    gameOver = true;
    showMessage("Game Over");
  }

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score + "/" + totalCoins, 20, 20);
}

function checkCollision(entity, square) {
  if (square instanceof Coin && !square.collected) return;

  const eHitbox = entity.getHitbox();
  const tX = square.position.x;
  const tY = square.position.y;
  const tW = square.width;
  const tH = square.height;

  const collided =
    eHitbox.x < tX + tW &&
    eHitbox.x + eHitbox.width > tX &&
    eHitbox.y < tY + tH &&
    eHitbox.y + eHitbox.height > tY;

  if (collided) {
    const offsetX = eHitbox.x - entity.position.x;
    const offsetY = eHitbox.y - entity.position.y;

    if (entity.velocity.x > 0) {
      entity.position.x = tX - eHitbox.width - offsetX;
      entity.velocity.x = 0;
    } else if (entity.velocity.x < 0) {
      entity.position.x = tX + tW - offsetX;
      entity.velocity.x = 0;
    }

    if (entity.velocity.y > 0) {
      entity.position.y = tY - eHitbox.height - offsetY;
      entity.velocity.y = 0;
    } else if (entity.velocity.y < 0) {
      entity.position.y = tY + tH - offsetY;
      entity.velocity.y = 0;
    }
  }
}

function drawMap() {
    const mapMatrix = [ 
        ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],
        ["0","0","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","-","-","+","+","+","-","-","-","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","-","-","-","+","+","+","-","-","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","-","-","-","-","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","-","-","-","-","-","0","0"],
        ["0","0","-","-","-","-","-","+","+","+","-","+","+","+","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","+","+","+","-","+","+","+","-","-","-","-","-","0","0"],
        ["0","0","-","-","-","-","-","+","+","+","-","+","+","+","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","+","+","+","-","+","+","+","-","-","-","-","-","0","0"],
        ["0","0","-","-","-","-","-","+","+","+","-","+","+","+","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","+","+","+","-","+","+","+","-","-","-","-","-","0","0"],
        ["0","0","-","-","-","-","-","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","-","-","-","-","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","-","-","+","+","+","-","-","-","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","-","-","-","+","+","+","-","-","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","+","+","+","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","-","-","+","+","+","-","-","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","+","+","+","+","+","-","0","0"],
        ["0","0","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","0","0"],
        ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
    ];

  mapMatrix.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case "-":
          map.push(new Tile({ position: { x: Tile.getWidth() * j, y: Tile.getHeight() * i } }));
          break;
        case "+":
          map.push(new Coin({ position: { x: Coin.getWidth() * j, y: Coin.getHeight() * i } }));
          totalCoins++;
          break;
      }
    });
  });
}

function movePlayer() {
  if (gameOver || victory) return;

  const speed = 2;
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (inputs.wPressed) {
    player.velocity.y = -speed;
  } else if (inputs.sPressed) {
    player.velocity.y = speed;
  } else if (inputs.aPressed) {
    player.velocity.x = -speed;
  } else if (inputs.dPressed) {
    player.velocity.x = speed;
  }
}
function showMessage(msg) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const finalScore = document.getElementById("final-score");

  modalText.innerText = msg;
  finalScore.innerText = `Score: ${score}/${totalCoins}`;
  modal.style.display = "flex";

  const restartBtn = document.getElementById("restart-button");
  restartBtn.onclick = () => {
    window.location.reload();
  };
}

