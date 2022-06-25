/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

import { GraphNode, GraphTypes } from "../Classes/GraphNode";

export function bfsOnGraph(graph: GraphNode, type: GraphTypes): [Set<string>, GraphNode | undefined, string[]] {
  let visited = new Set<string>();
  let path: string[] = [];
  let finalGraph: GraphNode | undefined = undefined;
  let found = false;
  let queue: GraphNode[] = [];
  queue.push(graph);
  while (queue.length > 0) {
    let current = queue.shift();
    if (current === undefined) continue;
    path.push(current.getId());
    if (visited.has(current.getId())) {
      continue;
    }
    visited.add(current.getId());
    if (current.getType() === type) {
      found = true;
      finalGraph = current;
      console.log("found", current.getId());
      break;
    }
    current.getChilds().forEach(child => {
      queue.push(child);
    });
  }
  return [visited, finalGraph, path];
}
