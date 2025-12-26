const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const NUM_CONNECTIONS = 1000;

type Point3D = {
  x: number;
  y: number;
  z: number;
};
type Distance = {
  a: Point3D,
  b: Point3D,
  distance: number;
}

const junction_boxes = input.split('\n').map(input_line_to_point);
const distances: Map<string, Distance> = new Map();

// calculate distances between all pairs
for (let adx = 0; adx < junction_boxes.length; adx++) {
  const a = junction_boxes[adx];
  for (let bdx = 0; bdx < junction_boxes.length; bdx++) {
    const b = junction_boxes[bdx];
    if (adx === bdx || distances.has(point_pair_key(a, b)) || distances.has(point_pair_key(b, a))) continue;
    const distance = euclidean_3d_distance(a, b);
    distances.set(point_pair_key(a, b), { a, b, distance });
  }
}

type DistanceTuple = [
  string,
  {
    a: Point3D;
    b: Point3D;
    distance: number;
  },
];

// find the N shortest distances
const shortest_distances: DistanceTuple[] = distances.entries().toArray().toSorted((a, b) => a[1].distance - b[1].distance).slice(0, NUM_CONNECTIONS);

// populate a neighbor list map after connecting those N pairs
const neighbor_map: Map<Point3D, Point3D[]> = new Map();
shortest_distances.forEach(distanceTuple => {
  const a = distanceTuple[1].a;
  const b = distanceTuple[1].b;

  if (!neighbor_map.has(a)) {
    neighbor_map.set(a, []);
  }
  neighbor_map.get(a)!.push(b);

  if (!neighbor_map.has(b)) {
    neighbor_map.set(b, []);
  }
  neighbor_map.get(b)!.push(a);
});

// find circuits
const circuits = [];
let points_in_any_circuit = new Set<Point3D>();
for (const junction_box of junction_boxes) {
  if (points_in_any_circuit.has(junction_box)) continue;
  const new_circuit = new Set<Point3D>();
  flood_circuit_recursive(junction_box, new_circuit);
  points_in_any_circuit = points_in_any_circuit.union(new_circuit);
  
  circuits.push(new_circuit);
}
console.log(
  circuits
    .toSorted((a, b) => b.size - a.size)
    .map(circuit => circuit.size)
    .slice(0, 3)
    .reduce((prev, cur) => prev*cur)
);

function flood_circuit_recursive(point: Point3D, circuit: Set<Point3D>) {
  circuit.add(point);
  if (neighbor_map.has(point)) {
    for (const neighbor of neighbor_map.get(point)!) {
      if (!circuit.has(neighbor)) {
        flood_circuit_recursive(neighbor, circuit);
      }
    }
  }
}

function euclidean_3d_distance(a: Point3D, b: Point3D): number {
  return Math.sqrt(
    (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2
  );
}

function point_pair_key(a: Point3D, b: Point3D): string {
  return `${a.x},${a.y},${a.z} - ${b.x},${b.y},${b.z}`;
}

function input_line_to_point(line: string): Point3D {
  const [x, y, z]: number[] = line.split(",").map((str: string) => parseInt(str));
  return { x, y, z };
}