import { make_map_from_input, printable_map, type Map, type MapNode } from "../../lib/map";

const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const map = make_map_from_input(input);

const S = map[0].find(mapnode => mapnode.content === "S")!;
let row = 0;

type CacheValue = {
  multiplier: number;
  value: number;
};
const cache = new Map<MapNode, number>();

console.log(cached_tachyon_travel(S));

function cached_tachyon_travel(
  cur: MapNode,
): number {
  if (!cache.has(cur)) {
    const value = tachyon_travel(cur);
    cache.set(cur, value);
    return value;
  } else {
    return cache.get(cur)!;
  }
};

function tachyon_travel(
  cur: MapNode,
): number {
  if (cur.y > row) {
    row = cur.y;
  }
  if (cur.south) {
    if (cur.south.content === "^") {
      let left = 0, right = 0;
      if (cur.southwest) {
        left = cached_tachyon_travel(cur.southwest);
      }
      if (cur.southeast) {
        right = cached_tachyon_travel(cur.southeast);
      }
      return left + right;
    } else {
      return cached_tachyon_travel(cur.south);
    }
  } else {
    return 1;
  }
}