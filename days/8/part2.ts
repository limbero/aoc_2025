const input = await Bun.file(`${import.meta.dir}/data.txt`).text();

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
const shortest_distances: DistanceTuple[] = distances.entries().toArray().toSorted((a, b) => a[1].distance - b[1].distance);

type SetHolder = {
  set: Set<Point3D>;
};
// populate a circuit set map after connecting those N pairs
const circuit_map: Map<Point3D, SetHolder> = new Map();
junction_boxes.forEach(junction_box => circuit_map.set(
  junction_box,
  { set: new Set([junction_box]) }
));

let last_added: DistanceTuple;
let i = 0;

outer_loop:
for (const distanceTuple of shortest_distances) {
  i++;
  last_added = distanceTuple;

  const a = distanceTuple[1].a;
  const b = distanceTuple[1].b;

  // console.log(`${i}: j${junction_boxes.indexOf(a)} + j${junction_boxes.indexOf(b)}`);

  const a_circuit = circuit_map.get(a)!;
  const b_circuit = circuit_map.get(b)!;
  const joint_circuit_set = a_circuit.set.union(b_circuit.set);
  
  a_circuit.set = joint_circuit_set;
  joint_circuit_set.values().forEach(junction_box => circuit_map.set(junction_box, a_circuit));

  if (a_circuit.set.size === junction_boxes.length) break;
}

// console.log("#" + i);
console.log(last_added[1].a.x * last_added[1].b.x);
// console.log(circuit_map);

function flood_circuit_recursive(point: Point3D, circuit: Set<Point3D>) {
  circuit.add(point);
  if (circuit_map.has(point)) {
    for (const neighbor of circuit_map.get(point)!) {
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