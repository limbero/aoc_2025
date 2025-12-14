import { make_map_from_input, printable_map, type MapNode } from "../../lib/map";

const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const map = make_map_from_input(input);

const S = map[0].find(mapnode => mapnode.content === "S")!;

let splits = 0;
let curs: MapNode[] = [S];
while (curs.length > 0) {
  const nextcurs: MapNode[] = [];
  for (const cur of curs) {
    if (cur.south) {
      if (cur.south.content === "^") {
        splits++;
        if (cur.southwest && !nextcurs.includes(cur.southwest)) {
          nextcurs.push(cur.southwest);
        }
        if (cur.southeast && !nextcurs.includes(cur.southeast)) {
          nextcurs.push(cur.southeast);
        }
      } else if (!nextcurs.includes(cur.south)) {
        nextcurs.push(cur.south);
      }
    }
  }
  for (const nextcur of nextcurs) {
    nextcur.content = "|";
  }
  curs = nextcurs;
}

// console.log(printable_map(map));
// console.log("");
console.log(splits);