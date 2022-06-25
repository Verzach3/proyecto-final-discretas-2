/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

export function parseInputFileText(
  text: string
): [size: number, gridData: number[][]] {
  const gridSize = parseInt(text.split("\n")[0]);
  const rest = text.split("\n").slice(1);
  // Convert grid data to array of strings
  const gridData = rest.map((line) => line.split(""));
  // remove \r from each string
  gridData.forEach((line) =>
    line.forEach((char, index) => {
      if (char === "\r") {
        line.splice(index, 1);
      }
    })
  );
  // Convert grid data to array of arrays of numbers
  const gridDataNumbers = gridData.map((line) =>
    line.map((char) => {
      const parsed = parseInt(char);
      if (isNaN(parsed)) {
        console.log(`Error: ${char} is not a number`);
      }
      return parsed;
    })
  );
  return [gridSize, gridDataNumbers];
}
