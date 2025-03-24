import Queue from "./queue.js";

class GameController {
  knightMoves(startPos, targetPos) {
    this.buildTree(startPos, targetPos);
  }

  buildTree(startPos, targetPos) {
    const queue = new Queue();
    queue.enqueue(startPos);
    const visited = new Set();
    const parentNode = startPos;

    while (queue.head) {
      const currentPos = queue.dequeue();

      if (visited.has(JSON.stringify(currentPos))) continue;

      visited.add(JSON.stringify(currentPos));
      console.log(currentPos);

      if (JSON.stringify(currentPos) === JSON.stringify(targetPos)) {
        console.log("found it!");
        return;
      }

      const possibleMoves = this.findPossibleMoves(currentPos);

      possibleMoves.forEach((move) => queue.enqueue(move));
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
