import { GraphNode } from "../Classes/GraphNode";

export function graphFromInput(input: [size: number, gridData: number[][]]) {
  const [size, gridData] = input

  if (gridData.length !== size) {
    throw new Error("Grid data is not the same size as the grid")
  }
  for (let i = 0; i < gridData.length; i++){
    if (gridData[i].length !== size) {
      throw new Error("Grid data is not the same size as the grid")
    }
  }

  const nodes = new Map<string, GraphNode>()
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const node = new GraphNode(`${i}-${j}`)
      switch (gridData[i][j]) {
        case 1:
          node.setType("wall")
          break;
        case 2:
          node.setType("2kilos")
          break;
        case 3:
          node.setType("3kilos")
          break;
        case 4:
          node.setType("start")
          break;
        case 5:
          node.setType("recicle")
        default:
          node.setType("free")
          break;
      }
      nodes.set(node.getId(), node)
    }
  }

  console.log(nodes)





}
