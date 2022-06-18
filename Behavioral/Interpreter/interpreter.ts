
interface IAbstractExpression {
  interpret(): number;
}

export class Numeral implements IAbstractExpression {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value)
  }

  interpret(): number {
    return this.value
  }

}

export class Add implements IAbstractExpression {

  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret() {
    return this.left.interpret() + this.right.interpret()
  }

}

export class Subtract implements IAbstractExpression {
  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret() {
    return this.left.interpret() - this.right.interpret()
  }
}

// Client
const SENTENCE = '5 + 4';
console.log(SENTENCE);

const arraySentence = SENTENCE.split(" ");
console.log(arraySentence);

let size = arraySentence.length - 1;
let value = 0;

while (size != 0) {

  if (arraySentence.length % 2 != 0) {
    let n1 = new Numeral(arraySentence[0]);
    let operator = arraySentence[1];
    let n2 = new Numeral(arraySentence[2]);

    if (operator === '-') {
      const subtract = new Subtract(n1, n2).interpret();
      console.log(subtract);
      value = subtract;
    }
    else if (operator === '+') {
      const add = new Add(n1, n2).interpret();
      console.log(add);
      value = add;
    }

    size -= 1;
  }

  console.log('final value:', value);
}


