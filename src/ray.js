export default class Ray {
  constructor(p1, a, maxLen) {
    this.p1 = p1;
    this.a = a;
    this.maxLen = maxLen;

    // If no obstacles in way, this is end point
    this.maxP2 = createVector(
      cos(a) * this.maxLen + this.p1.x,
      sin(a) * this.maxLen + this.p1.y,
    );
    this.p2 = this.maxP2.copy();
  }

  // detectCollision(walls) {
  //   // TODO: find endpoints and return or set new p2
  //   return false;
  // }

  updateP2() {
    this.p2.x = cos(this.a) * this.maxLen + this.p1.x;
    this.p2.y = sin(this.a) * this.maxLen + this.p1.y;
  }

  draw() {
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}
