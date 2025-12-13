import { rotate_input } from "../../lib/matrix";

const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const lines = input.split("\n");

const rotated = rotate_input(lines, "anticlockwise")
  .map(line => line.trim())
  .filter(line => line !== "");

let grand_total = 0;
let current_numbers = [];
for (const line of rotated) {
  const maybe_operation = line[line.length - 1];
  if (["+", "*"].includes(maybe_operation)) {
    current_numbers.push(parseInt(line.slice(0, line.length - 1)));

    let result = 0;
    if (maybe_operation === "*") {
      result = current_numbers.reduce((a, b) => a * b);
    } else if (maybe_operation === "+") {
      result = current_numbers.reduce((a, b) => a + b);
    }
    grand_total += result;
    current_numbers = [];
  } else {
    current_numbers.push(parseInt(line));
  }
}
console.log(grand_total);