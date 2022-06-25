/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

//Se importa la clase GraphNode y type para implementarle el reocrrido en amplitud
import { GraphNode, GraphTypes } from "../Classes/GraphNode";

//Esta función busca un GraphNode con un tipo específico y devuelve la ruta completa
export function bfsOnGraph(graph: GraphNode, type: GraphTypes): [Set<string>, GraphNode | undefined, string[]] {
  let visited = new Set<string>();
  let path: string[] = [];
  let finalGraph: GraphNode | undefined = undefined;
  let found = false;
  function bfs(graph: GraphNode) {
    console.log("visiting", graph.getId());
    path.push(graph.getId());
    //Si el nodo de tipo GraphNode es encontrado lo retorna para agregarlo al arreglo de nodos visitados
    if (found) {
      return;
    }
    path.push(graph.getId());
    if (visited.has(graph.getId())) {
      return;
    }
    visited.add(graph.getId());

    //Obtiene el tipo de nodo y lo determina como visitado
    if (graph.getType() === type) {
      found = true;
      finalGraph = graph;
      console.log("found", graph.getId());
      return;
    }

    for (let i = graph.getChilds().length - 1; i >= 0; i--) {
      bfs(graph.getChilds()[i]);
    }
  }
  bfs(graph);
  return [visited, finalGraph, path];
}
