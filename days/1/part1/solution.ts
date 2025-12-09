const input = await Bun.file(`${import.meta.dir}/data.txt`).text();

const lines: string[] = input.split('\n');
const tuples: [string, number][] = lines
  .map(line => [line[0], parseInt(line.slice(1))]);

const offsets: number[] = tuples
  .map(([direction, amount]) => direction === "L" ? -amount : amount)

let current_position = 50;
let num_zeroes = 0;
for (let i = 0; i < offsets.length; i++) {
  current_position = rotate(current_position, offsets[i]);
  if (current_position === 0) {
    num_zeroes++;
  }
}
console.log(num_zeroes);

function rotate(position: number, offset: number) {
  let result = position+offset;
  while (result < 0) {
    result = result + 100;
  }
  while (result > 99) {
    result = result - 100;
  }
  return result;
}