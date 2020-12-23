// Reference: https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
const areCounterClockwise = (ptA, ptB, ptC) => {
  const flag = (
    (ptC.y - ptA.y) * (ptB.x - ptA.x) > (ptB.y - ptA.y) * (ptC.x - ptA.x)
  );
  return flag;
};

const segmentsIntersect = (ptA, ptB, ptC, ptD) => {
  const check1 = areCounterClockwise(ptA, ptC, ptD) !== areCounterClockwise(ptB, ptC, ptD);
  const check2 = areCounterClockwise(ptA, ptB, ptC) !== areCounterClockwise(ptA, ptB, ptD);
  return check1 && check2;
};

// rise / run
const slope = (ptA, ptB) => (ptA.y - ptB.y) / (ptA.x - ptB.x);

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

  // Set RHS equal and solve for x
  // m1*x + b1 = m2*x + b2  --> algebra -->  x = (b2 - b1) / (m1 - m2)
  // TODO: handle divide by 0 cases
  const intersectX = (b2 - b1) / (m1 - m2);

  // Plug in X point of intersection
  const intersectY = m1 * intersectX + b1;

  return createVector(intersectX, intersectY);
};

export { segmentsIntersect, intersectPt };
