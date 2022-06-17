export interface TaxVisitor {
  calculateTaxForFood(food: Food): number;
  calculateTaxForBeer(beer: Beer): number;
  calculateTaxForSoda(soda: Soda): number;
  calculateTaxForCandy(candy: Candy): number;
}

export class BrazilTaxVisitor implements TaxVisitor {

  calculateTaxForFood(food: Food): number {
    return food.getPrice() + (food.getPrice() * 0.1); // 10%
  }
  calculateTaxForBeer(beer: Beer): number {
    return beer.getPrice() + (beer.getPrice() * 1.5); // 150%
  }
  calculateTaxForSoda(soda: Soda): number {
    return soda.getPrice() + (soda.getPrice() * 0.8); // 80%
  }
  calculateTaxForCandy(candy: Candy): number {
    return candy.getPrice() + (candy.getPrice() * 0.5); // 50%
  }

}

export abstract class Product {

  constructor(private name: string, protected price: number) { }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  abstract getPriceWithTax(visitor: TaxVisitor): number;

}

export class Food extends Product {

  constructor(protected price: number) {
    super('Food', price);
  }

  getPriceWithTax(visitor: TaxVisitor): number {
    return visitor.calculateTaxForFood(this);
  }
}

export class Beer extends Product {

  constructor(protected price: number) {
    super('Beer', price);
  }

  getPriceWithTax(visitor: TaxVisitor): number {
    return visitor.calculateTaxForBeer(this);
  }
}

export class Soda extends Product {
  constructor(protected price: number) {
    super('Soda', price);
  }

  getPriceWithTax(visitor: TaxVisitor): number {
    return visitor.calculateTaxForSoda(this);
  }
}

export class Candy extends Product {
  constructor(protected price: number) {
    super('Candy', price);
  }

  getPriceWithTax(visitor: TaxVisitor): number {
    return visitor.calculateTaxForCandy(this);
  }
}

// Client

const cerveja = new Food(10);
const coca = new Food(5);
const bombom = new Food(1);

const brazilTaxVisitor = new BrazilTaxVisitor();

const cart = [cerveja, coca, bombom];
const total = cart.reduce((sum, item) => item.getPrice() + sum, 0);

console.log('TOTA: ', total);

const totalWithTaxBrazil = cart.reduce((sum, item) => item.getPriceWithTax(brazilTaxVisitor) + sum, 0);
console.log('TOTA: ', totalWithTaxBrazil);