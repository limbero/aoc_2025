const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const lines = input.split("\n");

const splut = lines.map(lines => lines.split(" ").filter(piece => piece !== ""));
const operations: string[] = splut.pop()!;
const numbers = splut.map(line => line.map(number_string => parseInt(number_string)));

let grand_total = 0;

for (let i = 0; i < operations.length; i++) {
  const operation = operations[i];
  const numbers_in_column = numbers.map(line => line[i]);

  let result = 0;
  if (operation === "*") {
    result = numbers_in_column.reduce((a, b) => a * b);
  } else if (operation === "+") {
    result = numbers_in_column.reduce((a, b) => a + b);
  }
  grand_total += result;
}
console.log(grand_total);