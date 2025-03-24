import DirGraph from "./graph.js";
import Queue from "./queue.js";

class GameController {
  knightMoves(startPos, targetPos) {
    const tree = this.buildTree(startPos, targetPos);
    const { depth, path } = tree.shortestPath(startPos, targetPos);
    this.printResults(depth, path);
  }

  printResults(depth, path) {
    console.log(`The knight made it! it took him ${depth} moves.`);
    console.log(`The path the knight had to take: `);
    for (const step of path) {
      console.log(step);
    }
  }

  buildTree(startPos, targetPos) {
    const tree = new DirGraph();
    const queue = new Queue();
    queue.enqueue(startPos);
    const visited = new Set();

    while (queue.head) {
      const currentPos = queue.dequeue();

      if (visited.has(JSON.stringify(currentPos))) continue;

      visited.add(JSON.stringify(currentPos));
      tree.addVertex(currentPos);

      if (JSON.stringify(currentPos) === JSON.stringify(targetPos)) {
        return tree;
      }

      const possibleMoves = this.findPossibleMoves(currentPos);

      possibleMoves.forEach((move) => {
        tree.addEdge(currentPos, move);
        queue.enqueue(move);
      });
    }
  }

  findPossibleMoves(position) {
    const [x, y] = position;
    const possibleMoves = [
      [x - 1, y + 2],
      [x + 1, y + 2],
      [x - 1, y - 2],
      [x + 1, y - 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y + 1],
    ];
    const validMoves = [];

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];

      //returns only valid moves
      if (move.every((value) => value >= 0 && value <= 7)) {
        validMoves.push(possibleMoves[i]);
      }
    }

    return validMoves;
  }
}

const test = new GameController();

test.knightMoves([0, 0], [4, 3]);
