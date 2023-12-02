import { isVerbose, verboseLog } from './utils';

export interface Node<T> {
  value: T,
  next?: Node<T>,
  prev?: Node<T>,
}

export function fromArray<T>(values: T[], loop: boolean = false): Node<T> {

  if (values.length === 0) {
    throw new Error('You need to pass some values');
  }

  const first: Node<T> = { value: values[0] };
  let prev = first;

  for (const val of values.slice(1)) {
    const curr: Node<T> = { value: val, prev };
    prev.next = curr;
    prev = curr;
  }

  if (loop) {
    prev.next = first;
    first.prev = prev;
  }

  return first;
}

export function moveNode<T>(node: Node<T>, move: number) {
  let target: Node<T> | undefined = node;

  if (move === 0) {
    return;
  }

  const prev = node.prev;
  const next = node.next;

  if (prev) {
    prev.next = next;
    if (next) {
      next.prev = prev;
    }
  }

  if (move > 0) {
    target = next;
    for (let i = 0; i < move; i++) {
      target = target?.next;
    }
    // target should now be the node after where we ant to be
    const tPrev = target?.prev;
    if (!target || !tPrev) {
      throw new Error('We\'ve gone over the end of the list.');
    }
    tPrev.next = node;
    node.prev = tPrev;
    node.next = target;
    target.prev = node;
  }
  else {
    target = prev;
    for (let i = 0; i < Math.abs(move); i++) {
      target = target?.prev
    }
    // target should now be the node before where we ant to be
    const tNext = target?.next;
    if (!target || !tNext) {
      throw new Error('We\'ve gone over the end of the list.');
    }
    tNext.prev = node;
    node.next = tNext;
    node.prev = target;
    target.next = node;
  }
}

export function printList<T>(node: Node<T>) {
  if (isVerbose()) {
    const first = node;

    let output = [String(node.value)];

    let curr = first.next;

    while (curr && curr !== first) {
      output.push(String(curr.value));
      curr = curr.next;
    }

    verboseLog(output.join(', '));
  }
}