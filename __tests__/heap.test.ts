import { HeapItem } from '../src/lib/Heap/HeapItem.js';
import { MinHeap } from '../src/lib/Heap/MinHeap.js';

describe('Heap', () => {
  it('Scenario 1', () => {
    const input = [5, 2, 3, 1, 4, 6, 10];

    const heap = new MinHeap<number>();

    input.map((v) => heap.push(new HeapItem(v, v)));

    const result = [];

    while (heap.size()) {
      console.debug(heap.peek());
      result.push(heap.pop().item);
    }

    expect(result).toStrictEqual(input.sort((a, b) => a - b));
  });
});
