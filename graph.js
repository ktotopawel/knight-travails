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

  //given src and dest as arguments returns an object containing the amount of moves and the path
  shortestPath(src, dest) {
    if (!this.AdjList.has(src) || !this.AdjList.has(dest))
      throw new Error("invalid source/destination");
    const queue = new Queue();
    queue.enqueue({ vertex: src, depth: 0, parent: null });

    while (queue.head) {
      const node = queue.dequeue();

      if (JSON.stringify(node.vertex) === JSON.stringify(dest)) {
        const pathArr = [];
        let currentNode = node;
        while (currentNode) {
          pathArr.push(currentNode.vertex);
          currentNode = currentNode.parent;
        }
        return { depth: node.depth, path: pathArr.reverse() };
      }

      const children = this.AdjList.get(node.vertex);

      for (const child of children) {
        queue.enqueue({
          vertex: child,
          depth: node.depth + 1,
          parent: node,
        });
      }
    }

    return new Error("No path from src to dest");
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
