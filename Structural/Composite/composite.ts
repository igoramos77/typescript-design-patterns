/*
*   O Composite é um padrão de projeto estrutural que permite que você componha 
*   objetos em estruturas de árvores e então trabalhe com essas estruturas como 
*   se elas fossem objetos individuais.
*/

export abstract class ProductComponent {
  abstract getPrice(): number;

  addProduct(product: ProductComponent): void {}
  removeProduct(product: ProductComponent): void {}
}

export class ProductBase extends ProductComponent {
  constructor(public name: string, public price: number) {
    super(); // preciso chamar o super(), já que a classe extendida é abstract
  }

  getPrice(): number {
    return this.price;
  }
}

export class ProductComposite extends ProductComponent {
  private children: ProductComponent[] = [];
  
  addProduct(product: ProductComponent): void {
    const productIndex = this.children.indexOf(product);
    if (productIndex !== -1) {
      this.children.splice(productIndex, 1);
    }
  }

  getPrice(): number {
    // Soma todos os preços dos produtos
    return this.children.reduce((sum, children) => sum + children.getPrice(), 0);
  }
}

// Client

const tshirt = new ProductBase('Camisa estampada azul', 120);
const shoes = new ProductBase('Tenis nike SB', 260);
const smartphone = new ProductBase('iPhone 13', 9620);

const productsBag = new ProductComposite();
productsBag.addProduct(tshirt); 
productsBag.addProduct(shoes); 
productsBag.addProduct(smartphone); 

console.log(productsBag);