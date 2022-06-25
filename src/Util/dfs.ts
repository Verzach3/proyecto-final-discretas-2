import { GraphNode, GraphTypes } from "../Classes/GraphNode";

// dfs search on a GraphNode
export function dfsOnGraph(graph: GraphNode, type: GraphTypes){
  let visited = new Set<string>();
  
  let found = false;
  function dfs(graph: GraphNode){
    if(found){
      return;
    }
    if(visited.has(graph.getId())){
      return;
    }
    visited.add(graph.getId());
    if (graph.getType() === type){
      found = true;
      console.log("found", graph.getId());
      return;
    }
    graph.getChilds().forEach(child => {
      dfs(child);
    }); 
  }
  dfs(graph);
  return visited;
}