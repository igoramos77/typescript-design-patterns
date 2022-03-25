/*
    O Decorator é um padrão de projeto estrutural que permite que você acople 
    novos comportamentos para objetos ao colocá-los dentro de invólucros de 
    objetos que contém os comportamentos.
*/

export interface IProduct {
  getName(): string;
  getPrice(): number;
}

export class TShirt implements IProduct {
  private name = 'Camisa NIKE Seleção Brasileira';
  private price = 299.90;

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
} 

export class ProductDecorator implements IProduct {
  constructor(protected product: IProduct) {}

  getName(): string {
    return this.product.getName();
  }

  getPrice(): number {
    return this.product.getPrice();
  }
}

// Client

const tshirt = new TShirt();

const decoratedTShirt = new ProductDecorator(tshirt);

console.log(`${tshirt.getName()} - ${tshirt.getPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
console.log(`${decoratedTShirt.getName()} - ${tshirt.getPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);


export class ProductAutographedDeocorator extends ProductDecorator {
  getPrice(): number {
    return this.product.getPrice() + 500;
  }
  getName(): string {
    return this.product.getName() + ' (AUTOGRAFADA)';
  }
}

const autographedDeocorator = new ProductAutographedDeocorator(tshirt);

console.log(`${autographedDeocorator.getName()} - ${autographedDeocorator.getPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);