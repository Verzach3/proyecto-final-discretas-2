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
  let queue: GraphNode[] = [];
  queue.push(graph);
  while (queue.length > 0) {
    let current = queue.shift();
    if(current === undefined) {
      continue;
    }
    console.log("visiting", visited);

    //Si el id actual ya ha sido visitado, es agregado al set de los visitatods
    if (visited.has(current.getId())) {
      continue;
    }
    visited.add(current.getId());
    if (current.getType() === type) {
      found = true;
      finalGraph = current;
      break;
    }

    //Recorre el set de nodos para generar el grafo
    for (let i = 0; i < current.getChilds().length; i++) {
      queue.push(current.getChilds()[i]);
    }
  }
  return [visited, finalGraph, path];
}
