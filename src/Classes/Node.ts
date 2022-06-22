export class GraphNode {
  private id: string;
  private value: number;
  private childs: Node[] = [];
  constructor(id: string, value: number, childs?: Node[]) {
    this.id = id;
    this.value = value;
    childs !== undefined ? (this.childs = childs) : null;
  }

  addChild(child: Node): void {
    this.childs.push(child);
  }

  getChilds(): Node[] {
    return this.childs;
  }

  getValue(): number {
    return this.value;
  }

  getId(): string {
    return this.id;
  }
}