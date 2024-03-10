import { IHeapItem } from './HeapItem.js';

export class MinHeap<T> {
  heap: Array<IHeapItem<T>>;

  constructor() {
    this.heap = [];
  }

  push(node: IHeapItem<T>): void {
    // insert the new node at the end of the heap array
    this.heap.push(node);
    // find the correct position for the new node
    this.bubbleUp();
  }

  bubbleUp(): void {
    let index = this.heap.length - 1;

    while (index > 0) {
      const element = this.heap[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (parent.priority <= element.priority) break;
      // if the parent is bigger than the child then swap the parent and child
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  pop(): IHeapItem<T> {
    const min = this.heap[0];
    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleDown(): void {
    let index = 0;
    let min = index;
    const n = this.heap.length;

    while (index < n) {
      const left = 2 * index + 1;
      const right = left + 1;
      // check if left or right child is smaller than parent
      if (
        (left < n && this.heap[left].priority < this.heap[min].priority) ||
        (right < n && this.heap[right].priority < this.heap[min].priority)
      ) {
        // pick the smaller child if both child is present
        if (right < n) {
          min =
            this.heap[left].priority < this.heap[right].priority ? left : right;
        } else {
          min = left;
        }
      }

      if (min === index) break;
      [this.heap[min], this.heap[index]] = [this.heap[index], this.heap[min]];
      index = min;
    }
  }

  peek(): IHeapItem<T> {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }
}
