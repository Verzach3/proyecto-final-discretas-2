export class GraphNode {
  private id: string;
  private childs: GraphNode[] = [];
  private type: "free" | "wall" | "start" | "recicle" | "3kilos" | "2kilos" = "free";
  constructor(id: string, childs?: GraphNode[]) {
    this.id = id;
    childs !== undefined ? (this.childs = childs) : null;
  }

  addChild(child: GraphNode): void {
    this.childs.push(child);
  }

  getChilds(): GraphNode[] {
    return this.childs;
  }
  
  getId(): string {
    return this.id;
  }

  setType(type: typeof this.type): void {
    this.type = type;
  }

  getType(): typeof this.type {
    return this.type;
  }
}

export type GraphTypes = "free" | "wall" | "start" | "recicle" | "3kilos" | "2kilos"

//Cambio
