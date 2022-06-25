/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

import { GraphNode, GraphTypes } from "../Classes/GraphNode";
// this funtion searchs for a GraphNode with a specific type and returns the full path to it
export function bfsOnGraph(graph: GraphNode, type: GraphTypes): [Set<string>, GraphNode | undefined, string[]] {
  let visited = new Set<string>();
  let path: string[] = [];
  let finalGraph: GraphNode | undefined = undefined;
  let found = false;
  let queue: GraphNode[] = [];
  queue.push(graph);
  while (queue.length > 0) {
    let current = queue.shift();
    if(current === undefined) {
      continue;
    }
    console.log("visiting", visited);
    if (visited.has(current.getId())) {
      continue;
    }
    visited.add(current.getId());
    if (current.getType() === type) {
      found = true;
      finalGraph = current;
      break;
    }
    for (let i = 0; i < current.getChilds().length; i++) {
      queue.push(current.getChilds()[i]);
    }
  }
  return [visited, finalGraph, path];
}
