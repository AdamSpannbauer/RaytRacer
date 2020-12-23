/* eslint-disable import/extensions */
import Ray from './src/ray.js';
import Wall from './src/wall.js';
import { intersectPt } from './src/lineSegmentUtils.js';

let ray;
let wall;

function setup() {
  createCanvas(windowWidth, windowHeight);

  const p1 = createVector();
  const p2 = createVector();

  p1.set(width / 2, height / 2);
  ray = new Ray(p1.copy(), 0.01, 200);

  p1.set(width / 2 + 100, height / 2 - 100);
  p2.set(width / 2 + 100 + 10, height / 2 + 100);
  wall = new Wall(p1.copy(), p2.copy());
}

function draw() {
  background(30);

  stroke(255, 200);
  strokeWeight(5);

  ray.p1.x = mouseX;
  ray.p1.y = mouseY;
  ray.updateP2();

  // TODO: do this somewhere/somehow else
  // need to compare all rays and all walls somehow
  // Should Ray objects have method to check? Walls do the check? function?
  const intersection = intersectPt(ray.p1, ray.p2, wall.p1, wall.p2);
  if (intersection) {
    ray.p2.x = intersection.x;
    ray.p2.y = intersection.y;
  }

  ray.draw();

  stroke(0);
  strokeWeight(5);
  wall.draw();
}

window.setup = setup;
window.draw = draw;
