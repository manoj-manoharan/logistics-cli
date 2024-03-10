export type R<T> = Record<string, string | number | T>;

export interface IHeapItem<T> {
  item: T;
  priority: number;
}

/** */
export class HeapItem<T> implements IHeapItem<T> {
  item: T;
  priority: number;

  constructor(item: T, priority = 0) {
    this.item = item;
    this.priority = priority;
  }
}
