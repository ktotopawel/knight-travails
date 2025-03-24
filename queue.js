class Node {
  constructor(data) {
    (this.data = data), (this.next = null);
  }
}

export default class Queue {
  constructor(head = null) {
    (this.head = head), (this.tail = this.head);
  }

  enqueue(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.head) return null;

    const returnNode = this.head;
    this.head = this.head.next;

    return returnNode.data;
  }
}
