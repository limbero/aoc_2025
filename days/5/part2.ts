const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const lines = input.split("\n");

const empty_line_index = lines.findIndex(line => line === "");

type RangeMember = {
  value: number;
  value_type: string;
};
const range_members: RangeMember[] = [];

lines.slice(0, empty_line_index).forEach(range => {
  const [lower_string, upper_string] = range.split("-");
  const lower = parseInt(lower_string);
  const upper = parseInt(upper_string);

  range_members.push({
    value: lower,
    value_type: "lower",
  });
  range_members.push({
    value: upper,
    value_type: "upper",
  });
});
range_members.sort((a, b) => a.value - b.value);

const simplified_range_members: RangeMember[] = [];
let inside_range = 0;
let last_member: RangeMember | undefined;
range_members.forEach(range_member => {
  if (inside_range === 0) {
    if (range_member.value_type === "lower") {
      inside_range++;
      if (range_member.value === last_member?.value) {
        simplified_range_members.pop();
      } else {
        simplified_range_members.push(range_member);
      }
    }
  } else if (inside_range > 0) {
    if (range_member.value_type === "lower") {
      inside_range++;
    }
    if (range_member.value_type === "upper") {
      inside_range--;
      if (inside_range === 0) {
        simplified_range_members.push(range_member);
      }
    }
  } else {
    console.log("wtf");
  }
  last_member = range_member;
});

let sum = 0;
for (let i = 0; i < simplified_range_members.length; i += 2) {
  const lower = simplified_range_members[i];
  const upper = simplified_range_members[i + 1];
  const diff = upper.value - lower.value;
  sum += diff + 1;
}

console.log(sum);

