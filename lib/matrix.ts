type Direction = "anticlockwise" | "clockwise";
export function rotate_input(lines: string[], direction: Direction): string[] {
  const width = lines[0].length;
  const height = lines.length;
  const new_lines: string[] = [];
  if (direction === "anticlockwise") {
    for (let x = width - 1; x >= 0; x--) {
      let new_line = "";
      for (let y = 0; y < height; y++) {
        new_line += lines[y][x];
      }
      new_lines.push(new_line);
    }
  } else {
    for (let x = 0; x < width; x++) {
      let new_line = "";
      for (let y = height - 1; y >= 0; y--) {
        new_line += lines[y][x];
      }
      new_lines.push(new_line);
    }
  }
  return new_lines;
}