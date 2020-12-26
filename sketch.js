/* eslint-disable import/extensions */
import RayBall from './src/rayBall.js';
import Wall from './src/wall.js';

let rayBall;
const walls = [];
const nWalls = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  const p1 = createVector();
  const p2 = createVector();

  rayBall = new RayBall({ x: width / 2, y: height / 2 });

  for (let i = 0; i < nWalls; i += 1) {
    p1.set(random(width), random(height));
    p2.set(random(width), random(height));
    const wall = new Wall(p1.copy(), p2.copy());
    walls.push(wall);
  }
}

function draw() {
  background(30);

  stroke(255, 100);
  strokeWeight(1);

  rayBall.update(mouseX, mouseY, walls);
  rayBall.draw();

  stroke(20);
  strokeWeight(5);
  walls.forEach((wall) => wall.draw());
}

window.setup = setup;
window.draw = draw;
