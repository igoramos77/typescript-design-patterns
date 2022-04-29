interface NextIteratorMethodReturn {
  value: number;
  done: boolean;
}

interface ICounterIterator {
  next(): NextIteratorMethodReturn;
}

export class CounterIterator implements ICounterIterator {
  private current = this.counter.current;
  private last = this.counter.last;

  constructor(private counter: Counter) {

  }

  next(): { value: number, done: boolean } {
    return { value: ++this.current, done: this.current > this.last };
  }
}

export class Counter {
  public current = 0;
  public last = 7;

  [Symbol.iterator](): CounterIterator {
    return this.resetIterator();
  }

  resetIterator(): CounterIterator {
    return new CounterIterator(this);
  }
}

// Client

const counter = new Counter();
const [um, dois, tres, ...rest] = [...counter];

console.log(um, dois, tres, rest);

for (const iterator of counter) {
  console.log(iterator)
}