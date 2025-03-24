import Queue from "./queue.js";

export default class DirGraph {
  constructor() {
    this.AdjList = createMapProxy();
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

  //gets distance of target vertex from the src vertex || returns -1 if there is no connection from src to dest
  depth(sourceVertex, targetVertex) {
    if (!this.AdjList.has(sourceVertex) || !this.AdjList.has(targetVertex))
      throw new Error("invalid source/destination");
    const queue = new Queue();
    queue.enqueue({ vertex: sourceVertex, depth: 0 });

    while (queue.head) {
      const { vertex, depth } = queue.dequeue();

      if (JSON.stringify(vertex) === JSON.stringify(targetVertex)) return depth;

      const children = this.AdjList.get(vertex);

      for (const child of children) {
        queue.enqueue({ vertex: child, depth: depth + 1 });
      }
    }

    return -1;
  }

  printGraph() {
    const vertices = this.AdjList.keys();

    for (const vertex of vertices) {
      const edges = this.AdjList.get(vertex);

      console.log(vertex, " -> ", JSON.stringify(edges));
    }
  }
}

//creates a Proxy that ensures all stored keys are strings
function createMapProxy() {
  const target = new Map();

  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop === "set") {
        const setFn = function (key, value) {
          return target.set(
            typeof key === "string" ? key : JSON.stringify(key),
            value
          );
        };
        return setFn.bind(target);
      }

      if (prop === "get") {
        const getFn = function (key) {
          return target.get(
            typeof key === "string" ? key : JSON.stringify(key)
          );
        };
        return getFn.bind(target);
      }

      if (prop === "has") {
        const hasFn = function (key) {
          return target.has(
            typeof key === "string" ? key : JSON.stringify(key)
          );
        };
        return hasFn.bind(target);
      }

      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}
