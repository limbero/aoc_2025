const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const lines = input.split("\n");

let total_joltage = 0;
lines.forEach(line => {
  const line_before_last_char = line.slice(0, line.length - 1);
  let biggest = 0;
  let biggest_index = 0;
  line_before_last_char.split("").map(c => parseInt(c))
    .forEach((num, idx) => {
      if (num > biggest) {
        biggest = num;
        biggest_index = idx;
      }
    });
  const line_after_biggest_index = line.slice(biggest_index + 1);
  const second_digit = Math.max(...line_after_biggest_index.split("").map(c => parseInt(c)));

  const joltage = biggest * 10 + second_digit;

  total_joltage += joltage;
});

console.log(total_joltage);