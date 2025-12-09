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
}
console.log(num_zeroes);

function rotate(position: number, offset: number) {
  const step = offset > 0 ? 1 : -1;
  let result = position;
  for (let i = 0; i < Math.abs(offset); i++) {
    result += step;
    if (result === -1) {
      result = 99;
    } else if (result === 100) {
      result = 0;
    }
    if (result === 0) {
      num_zeroes++;
    }
  }

  return result;
}