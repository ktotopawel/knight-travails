import Queue from "./queue.js";

export default class DirGraph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex(data) {
    if (!this.AdjList.has(data)) this.AdjList.set(data, []);
  }

  addEdge(src, dest) {
    if (!this.AdjList.has(src)) throw new Error("No existing source Vertex!");
    if (!this.AdjList.has(dest)) {
      this.addVertex(dest);
    }

    this.AdjList.get(src).push(dest);
  }

  depth(sourceVertex, targetVertex) {
    const queue = new Queue();
    queue.enqueue({ vertex: sourceVertex, depth: 0 });
    const visited = new Set();
    visited.add(sourceVertex);

    while (queue.head) {
      const { vertex, depth } = queue.dequeue();

      console.log(vertex, depth);

      if (vertex === targetVertex) return depth;

      const children = this.AdjList.get(vertex);

      for (const child of children) {
        queue.enqueue({ vertex: child, depth: depth + 1 });
      }
    }
  }

  printGraph() {
    const vertices = this.AdjList.keys();

    for (const vertex of vertices) {
      const edges = this.AdjList.get(vertex);

      console.log(vertex + "->" + edges);
    }
  }
}
