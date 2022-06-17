
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
    this.left = left
    this.right = right
  }

  interpret() {
    return this.left.interpret() + this.right.interpret()
  }
  
}

export class Subtract implements IAbstractExpression {

  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left
    this.right = right
  }

  interpret() {
    return this.left.interpret() - this.right.interpret()
  }
}

const operators = ['+', '-', '*', '/'];

// Client
const SENTENCE = '5 - 4 - 3 + 7 - 2';
console.log(SENTENCE);

const arraySentence = SENTENCE.split(" ");
console.log(arraySentence)

const n1 = new Numeral(arraySentence[0])
console.log(n1)

const n2 = new Numeral(arraySentence[2])
console.log(n2)

const subtract1 = new Subtract(n1, n2)
console.log(n1.interpret() - n2.interpret())
console.log(subtract1.interpret())