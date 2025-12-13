import { make_map_from_input, printable_map } from "../../lib/map";

const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const map = make_map_from_input(input);

let matching = 0;
map.map(line => line.map(mapnode => {
  const neighbor_contents = mapnode.neighbors.map(neighbor => neighbor.content);
  const paper_neighbors = neighbor_contents.filter(neighbor => ["@", "x"].includes(neighbor));
  if (mapnode.content === "@" && paper_neighbors.length < 4) {
    matching++;
    mapnode.content = "x";
  }
}));
console.log(`${printable_map(map)}\n\n${matching}`);