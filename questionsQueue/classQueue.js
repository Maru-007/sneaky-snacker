class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(value){
    let newNode = new Node(value);
    if (this.isEmpty()){
      this.front = newNode;
      this.rear = newNode;
    }
    this.rear.next = newNode;
    this.rear = newNode;
  }

  dequeue(){
    if (this.isEmpty()){
      return;
    } else {
      let current = this.front;
      this.front = current.next;
      return current.value;
    }
  }

  peek(){
    if (this.isEmpty()){
      return;
    } else {
      return this.front.value;
    }
  }

  isEmpty(){
    return this.front === null;
  }
}


module.exports = Queue;
