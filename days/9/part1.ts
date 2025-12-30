const input = await Bun.file(`${import.meta.dir}/data.txt`).text();

type Point2D = {
  x: number;
  y: number;
};

const coordinates: Point2D[] = input.split('\n')
  .map(line => {
    const [x, y] = line.split(',').map(str => parseInt(str));
    return {x, y};
  });

let max = 0;
for (const coord_a of coordinates) {
  for (const coord_b of coordinates) {
    if (coord_a === coord_b) break;
    const result = area(coord_a, coord_b);
    if (result > max) {
      max = result;
    }
  }
}
console.log(max);

function area(a: Point2D, b: Point2D): number {
  const xes = [a.x, b.x].toSorted((a, b) => a - b);
  const ys = [a.y, b.y].toSorted((a, b) => a - b);
  
  const width = xes[1] - xes[0] + 1;
  const height = ys[1] - ys[0] + 1;
  return width * height;
}