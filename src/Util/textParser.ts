export function parseInputFileText(text: string): [size: number, gridData: number[][]] {
  const gridSize = parseInt(text.split("\n")[0]);
  const rest = text.split("\n").slice(1);
  // Convert grid data to array of strings
  const gridData = rest.map((line) => line.split(""));
  // Convert grid data to array of arrays of numbers
  const gridDataNumbers = gridData.map((line) => line.map((char) => parseInt(char)));
  return [gridSize, gridDataNumbers];

}