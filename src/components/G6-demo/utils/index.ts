export function generateCircularLayout(centerX: number, centerY: number, radius: number, numPoints: number) {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 * i) / numPoints;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });
  }

  return points;
}
