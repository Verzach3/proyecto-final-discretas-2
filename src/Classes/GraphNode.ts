export class GraphNode {
  private id: string;
  private childs: Node[] = [];
  private type: "free" | "wall" | "start" | "recicle" | "3kilos" | "2kilos" = "free";
  constructor(id: string, childs?: Node[]) {
    this.id = id;
    childs !== undefined ? (this.childs = childs) : null;
  }

  addChild(child: Node): void {
    this.childs.push(child);
  }

  getChilds(): Node[] {
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