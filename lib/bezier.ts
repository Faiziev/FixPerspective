"use client"

// Cubic Bezier curve calculation
export function bezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const cX = 3 * (p1 - p0)
  const bX = 3 * (p2 - p1) - cX
  const aX = p3 - p0 - cX - bX

  // The cubic Bezier formula: at^3 + bt^2 + ct + p0
  return aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0
}

// Calculate a point on a cubic Bezier curve
export function pointOnCubicBezier(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
): { x: number; y: number } {
  return {
    x: bezier(t, p0.x, p1.x, p2.x, p3.x),
    y: bezier(t, p0.y, p1.y, p2.y, p3.y),
  }
}

// Subdivide a Bezier curve into a series of points
export function subdivideBezier(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  steps = 10,
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = []

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    points.push(pointOnCubicBezier(t, p0, p1, p2, p3))
  }

  return points
}

// Create a mesh grid from Bezier curves
export function createBezierMesh(
  topCurve: { x: number; y: number }[],
  rightCurve: { x: number; y: number }[],
  bottomCurve: { x: number; y: number }[],
  leftCurve: { x: number; y: number }[],
  gridSize = 10,
): { x: number; y: number }[][] {
  const mesh: { x: number; y: number }[][] = []

  // For each row
  for (let i = 0; i <= gridSize; i++) {
    const row: { x: number; y: number }[] = []
    const t = i / gridSize

    // Get points on left and right curves at this t value
    const leftPoint = leftCurve[Math.floor(t * leftCurve.length)]
    const rightPoint = rightCurve[Math.floor(t * rightCurve.length)]

    // For each column, interpolate between left and right
    for (let j = 0; j <= gridSize; j++) {
      const s = j / gridSize
      row.push({
        x: leftPoint.x + s * (rightPoint.x - leftPoint.x),
        y: leftPoint.y + s * (rightPoint.y - leftPoint.y),
      })
    }

    mesh.push(row)
  }

  return mesh
}
