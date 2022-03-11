/*
* O Factory method é um padrão de projeto criacional,
* que resolve o problema de criar objetos de produtos sem especificar suas classes concretas.
*
* O Factory Method define um método, que deve ser usado para
* criar objetos em vez da chamada direta ao construtor (operador new).
* As subclasses podem substituir esse método para alterar a classe de objetos que serão criados.
*/

interface Product {
  saiHi(): void;
}

class ConcreteProduct implements Product {
  saiHi(): void {
    console.log('Hi!')
  }
}

abstract class Creator {
  abstract factoryMethod(): Product;

  createAndShow(): void {
    const product = this.factoryMethod();
    console.log(product);
  }
}

class ConcreteCreator extends Creator {
  factoryMethod(): Product {
    return new ConcreteProduct()
  }
}

const creator = new ConcreteCreator();
const product = creator.factoryMethod();
product.saiHi();
creator.createAndShow();