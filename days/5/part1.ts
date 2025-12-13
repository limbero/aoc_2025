const input = await Bun.file(`${import.meta.dir}/data.txt`).text();
const lines = input.split("\n");

const empty_line_index = lines.findIndex(line => line === "");

const ranges = lines.slice(0, empty_line_index).map(range => {
  const [lower_string, upper_string] = range.split("-");
  return {
    lower: parseInt(lower_string),
    upper: parseInt(upper_string),
  };
});
const ids = lines.slice(empty_line_index + 1).map(id => parseInt(id));

const fresh_ids = ids.filter(id => {
  for (let i = 0; i < ranges.length; i++) {
    if (id >= ranges[i].lower && id <= ranges[i].upper) {
      return true;
    }
  }
  return false;
});
console.log(fresh_ids.length);