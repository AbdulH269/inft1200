// Get a reference to the canvas element and its 2D context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions to match the window's inner dimensions
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Function to generate a random number between min and max (inclusive)
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random RGB color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Define a Ball class
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x; // x-coordinate
    this.y = y; // y-coordinate
    this.velX = velX; // velocity in the x-direction
    this.velY = velY; // velocity in the y-direction
    this.color = color; // color of the ball
    this.size = size; // radius of the ball
  }

  // Method to draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Method to update the ball's position and handle collisions with the canvas edges
  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // Method to detect collisions between balls
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Array to hold all the balls
const balls = [];

// Create 25 balls with random properties
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// Function to animate the balls
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

// Start the animation loop
loop();
