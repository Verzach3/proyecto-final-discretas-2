export function parseInputFileText(text: string) {
  const gridSize = parseInt(text.split("\n")[0]);
  const rest = text.split("\n").slice(1);
  return [gridSize, rest]
}