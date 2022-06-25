/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

import { GraphNode, GraphTypes } from "../Classes/GraphNode";

// dfs search on a GraphNode
export function dfsOnGraph(graph: GraphNode, type: GraphTypes): [Set<string>, GraphNode | undefined, string[]] {
  let visited = new Set<string>();
  let path: string[] = [];
  let finalGraph: GraphNode | undefined= undefined
  let found = false;
  function dfs(graph: GraphNode){
    console.log("visiting", graph.getId());
    if(found){
      return;
    }
    path.push(graph.getId());
    if(visited.has(graph.getId())){
      return;
    }
    visited.add(graph.getId());
    if (graph.getType() === type){
      found = true;
      finalGraph = graph;
      console.log("found", graph.getId());
      return;
    }
    for (let i = graph.getChilds().length - 1; i >= 0; i--) {
      dfs(graph.getChilds()[i]);
    }
  }
  dfs(graph);
  return [visited, finalGraph, path];
}