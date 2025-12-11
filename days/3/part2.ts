const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const lines = input.split("\n");

let total_joltage = 0;
lines.forEach(line => {
  let numbers = [];
  let last_idx = 0;
  for (let i = 11; i >= 0; i--) {
    const number = get_biggest_number_between_indices(line, last_idx, line.length - i);
    last_idx = number.index + 1;
    numbers.push(number.number);
  }
  const joltage = parseInt(numbers.join(""));
  total_joltage += joltage;
});

console.log(total_joltage);

type number_and_index = {
  number: number;
  index: number;
};
function get_biggest_number_between_indices(
  line: string,
  start_index: number,
  end_index: number
): number_and_index {
  const line_as_nums_with_idxs: [number, number][] = line.split("").map((c, idx) => [parseInt(c), idx]);
  const line_slice = line_as_nums_with_idxs.slice(start_index, end_index);
  let biggest = 0;
  let biggest_index = 0;
  line_slice
    .forEach(([num, idx]) => {
      if (num > biggest) {
        biggest = num;
        biggest_index = idx;
      }
    });
  return {
    number: biggest,
    index: biggest_index,
  };
}