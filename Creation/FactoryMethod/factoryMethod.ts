/*
* O Factory method é um padrão de projeto criacional,
* que resolve o problema de criar objetos de produtos sem especificar suas classes concretas.
*
* O Factory Method define um método, que deve ser usado para
* criar objetos em vez da chamada direta ao construtor (operador new).
* As subclasses podem substituir esse método para alterar a classe de objetos que serão criados.
*/

interface IProduct {
  getProductName(): void;
}

class ConcreteProduct implements IProduct {
  getProductName(): void {
    console.log('Macbook Pro M1')
  }
}

abstract class ICreator {
  abstract factoryMethod(): IProduct;

  createAndShow(): void {
    const product = this.factoryMethod();
    console.log(product);
  }
}

class ConcreteCreator extends ICreator {
  factoryMethod(): IProduct {
    return new ConcreteProduct()
  }
}

const creator = new ConcreteCreator();
const product = creator.factoryMethod();
product.getProductName();
creator.createAndShow();