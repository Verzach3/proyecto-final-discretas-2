import { GraphNode } from "../Classes/GraphNode";

export function graphFromInput(input: [size: number, gridData: number[][]]) {
  const [size, gridData] = input;

  if (gridData.length !== size) {
    throw new Error("Grid data is not the same size as the grid");
  }
  for (let i = 0; i < gridData.length; i++) {
    if (gridData[i].length !== size) {
      throw new Error("Grid data is not the same size as the grid");
    }
  }

  const nodes = new Map<string, GraphNode>();
  let startNodeId: string | undefined;
  let mapString = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const node = new GraphNode(`${i}-${j}`);
      mapString.push(node.getId());
      switch (gridData[i][j]) {
        case 1:
          node.setType("wall");
          break;
        case 2:
          node.setType("2kilos");
          break;
        case 3:
          node.setType("3kilos");
          break;
        case 4:
          node.setType("start");
          startNodeId = node.getId();
          break;
        case 5:
          node.setType("recicle");
          console.log("recicle", node.getId());
          break;
        default:
          node.setType("free");
          break;
      }
      nodes.set(node.getId(), node);
    }
  }
  console.log("map",mapString);
  // add the nodes to the childs if they are not walls and are adjacent to the node
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const node = nodes.get(`${i}-${j}`);
      if (node === undefined) continue;
      if (node.getType() !== "wall") {
        if (i > 0) {
          const child = nodes.get(`${i - 1}-${j}`);
          if (child !== undefined) {
            if (child.getType() !== "wall") {
              node.addChild(child);
            }
          }
        }
        if (i < size - 1) {
          const child = nodes.get(`${i + 1}-${j}`);
          if (child !== undefined) {
            if (child.getType() !== "wall") {
              node.addChild(child);
            }
          }
        }
        if (j > 0) {
          const child = nodes.get(`${i}-${j - 1}`);
          if (child !== undefined) {
            if (child.getType() !== "wall") {
              node.addChild(child);
            }
          }
        }
        if (j < size - 1) {
          const child = nodes.get(`${i}-${j + 1}`);
          if (child !== undefined) {
            if (child.getType() !== "wall") {
              node.addChild(child);
            }
          }
        }
      
      }
    }
  }

  if (startNodeId === undefined) {
    throw new Error("No start node found");
  }
  console.log(nodes.get(startNodeId));
  return nodes.get(startNodeId!);

}
