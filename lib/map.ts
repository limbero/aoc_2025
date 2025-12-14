export type MapNode = {
  content: string;
  x: number;
  y: number;
  neighbors: MapNode[];
  north?: MapNode;
  northeast?: MapNode;
  east?: MapNode;
  southeast?: MapNode;
  south?: MapNode;
  southwest?: MapNode;
  west?: MapNode;
  northwest?: MapNode;
};
export type Map = MapNode[][];

export function make_map_from_input(input: string): Map {
  const lines: string[][] = input.split("\n").map(line => line.split(""));

  const map_without_neighbors: Map = lines.map((line, y) => line.map((cell, x) => {
    return {
      content: cell,
      x,
      y,
      neighbors: [],
    };
  }));

  const map = map_without_neighbors.map((line, y) => line.map((mapnode, x) => {
    if (y > 0) {
      mapnode.north = map_without_neighbors[y - 1][x];
    }
    if (y > 0 && x < line.length - 1) {
      mapnode.northeast = map_without_neighbors[y - 1][x + 1];
    }
    if (x < line.length - 1) {
      mapnode.east = map_without_neighbors[y][x + 1];
    }
    if (y < map_without_neighbors.length - 1 && x < line.length - 1) {
      mapnode.southeast = map_without_neighbors[y + 1][x + 1];
    }
    if (y < map_without_neighbors.length - 1) {
      mapnode.south = map_without_neighbors[y + 1][x];
    }
    if (y < map_without_neighbors.length - 1 && x > 0) {
      mapnode.southwest = map_without_neighbors[y + 1][x - 1];
    }
    if (x > 0) {
      mapnode.west = map_without_neighbors[y][x - 1];
    }
    if (y > 0 && x > 0) {
      mapnode.northwest = map_without_neighbors[y - 1][x - 1];
    }

    mapnode.neighbors = [
      mapnode.north,
      mapnode.northeast,
      mapnode.east,
      mapnode.southeast,
      mapnode.south,
      mapnode.southwest,
      mapnode.west,
      mapnode.northwest,
    ].filter(neighbor => neighbor !== undefined);

    return mapnode;
  }));
  return map;
}

export function printable_map(map: Map): string {
  return map.map(line => line.map(mapnode => mapnode.content).join("")).join("\n");
}