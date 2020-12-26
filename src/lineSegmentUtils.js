// Reference: https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
const isCounterClockwise = (ptA, ptB, ptC) => {
  const flag = (
    (ptC.y - ptA.y) * (ptB.x - ptA.x) > (ptB.y - ptA.y) * (ptC.x - ptA.x)
  );
  return flag;
};

const segmentsIntersect = (ptA, ptB, ptC, ptD) => {
  const check1 = isCounterClockwise(ptA, ptC, ptD) !== isCounterClockwise(ptB, ptC, ptD);
  const check2 = isCounterClockwise(ptA, ptB, ptC) !== isCounterClockwise(ptA, ptB, ptD);
  return check1 && check2;
};

// rise / run
const slope = (ptA, ptB) => {
  const dy = (ptA.y - ptB.y);
  let dx = (ptA.x - ptB.x);

  // lazy dirty hack to handle vertical lines....
  if (dx === 0) dx = 0.00000001;

  return dy / dx;
};

// y = mx + b  --> algebra -->  b = -mx + y
const intercept = (pt, m) => pt.y - m * pt.x;

// combine for convenience
const slopeIntercept = (ptA, ptB) => {
  const m = slope(ptA, ptB);
  const b = intercept(ptA, m);

  return [m, b];
};

const intersectPt = (ptA, ptB, ptC, ptD) => {
  if (!segmentsIntersect(ptA, ptB, ptC, ptD)) {
    return null;
  }

  // y1 = m1*x1 + b1
  const [m1, b1] = slopeIntercept(ptA, ptB);

  // y2 = m2*x2 + b2
  const [m2, b2] = slopeIntercept(ptC, ptD);

  // parallel lines assumed to just not touch
  if (m1 === m2) {
    return null;
  }

  // Set RHS equal and solve for x
  // m1*x + b1 = m2*x + b2  --> algebra -->  x = (b2 - b1) / (m1 - m2)
  const intersectX = (b2 - b1) / (m1 - m2);

  // Plug in X point of intersection
  const intersectY = m1 * intersectX + b1;

  return createVector(intersectX, intersectY);
};

export { segmentsIntersect, intersectPt };
