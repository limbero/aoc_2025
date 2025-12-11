const input = await Bun.file(`${import.meta.dir}/data.txt`).text();

const pairs = input.split(",").map(
  pair => pair.split("-").map(
    digit_string => parseInt(digit_string)
  )
)

let sum = 0;
const repeated_number_regex = /^(\d+)\1+$/;

pairs.forEach(([lower, upper]) => {
  for (let i = lower; i <= upper; i++) {
    const digit_string = i.toString();
    if (repeated_number_regex.test(digit_string)) {
      sum += i;
    }
  }
});
console.log(sum);