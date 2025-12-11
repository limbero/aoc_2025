const input = await Bun.file(`${import.meta.dir}/data.txt`).text();

const pairs = input.split(",").map(
  pair => pair.split("-").map(
    digit_string => parseInt(digit_string)
  )
)

let sum = 0;

pairs.forEach(([lower, upper]) => {
  for (let i = lower; i <= upper; i++) {
    const digit_string = i.toString();
    const first_half = digit_string.slice(0, digit_string.length/2);
    const second_half = digit_string.slice(digit_string.length/2, digit_string.length);
    if (first_half === second_half) {
      sum += i;
    }
  }
});
console.log(sum);