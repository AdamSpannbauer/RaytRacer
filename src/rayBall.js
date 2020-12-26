/* eslint-disable import/extensions */
import Ray from './ray.js';
import { intersectPt } from './lineSegmentUtils.js';

const generateRays = (p, nRays, rayLength) => {
  const da = TWO_PI / nRays;

  const rays = [];
  let ray;
  let angle;
  for (let i = 0; i < nRays; i += 1) {
    angle = i * da;
    // another dirty lazy hack to avoid actually handling vertical lines
    if (angle % HALF_PI <= 0.0001) {
      angle += 0.000001;
    }
    ray = new Ray(p, angle, rayLength);
    rays.push(ray);
  }

  return rays;
};

export default class RayBall {
  constructor({
    x, y, radius = 20, nRays = 100, rayLength = 400,
  }) {
    this.pos = createVector(x, y);
    this.r = radius;
    this.nRays = nRays;
    this.rayLength = rayLength;

    this.rays = generateRays(this.pos, this.nRays, this.rayLength);
  }

  rayIntersect(walls) {
    let intersection;
    this.rays.forEach((ray) => {
      walls.forEach((wall) => {
        intersection = intersectPt(ray.p1, ray.p2, wall.p1, wall.p2);
        if (intersection) {
          // eslint-disable-next-line no-param-reassign
          ray.p2.x = intersection.x;
          // eslint-disable-next-line no-param-reassign
          ray.p2.y = intersection.y;
        }
      });
    });
  }

  update(x, y, walls) {
    this.pos.set(x, y);
    this.rays.forEach((ray) => ray.updateP2());
    this.rayIntersect(walls);
  }

  draw() {
    push();
    this.rays.forEach((ray) => ray.draw());
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    pop();
  }
}
