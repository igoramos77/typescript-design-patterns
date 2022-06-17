/* 
  O Strategy é um padrão de projeto comportamental que permite que
  você defina uma família de algoritmos, coloque-os em classes separadas,
  e faça os objetos deles intercambiáveis.

  O padrão Strategy sugere que você pegue uma classe que faz algo específico
  em diversas maneiras diferentes e extraia todos esses algoritmos para classes
  separadas chamadas estratégias.

  A classe original, chamada contexto, deve ter um campo para armazenar uma
  referência para um dessas estratégias. O contexto delega o trabalho para um
  objeto estratégia ao invés de executá-lo por conta própria.

*/
export interface IProductsProps {
  name: string;
  price: number;
}


export class ShoppingCart {

  private products: IProductsProps[] = [];
  private _discountStrategy: DiscountStrategy = new DiscountStrategy(); // seta como null inicialmente

  addProducts(...products: IProductsProps[]): void {
    products.forEach((product) => {
      this.products.push(product);
    });
  }

  getProducts(): IProductsProps[] {
    return this.products;
  }

  getTotalPurchase(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }

  getTotalPurchaseWithDiscount(): number {
    return this._discountStrategy.getDiscount(this);
  }

  set discount(discount: DiscountStrategy) {
    this._discountStrategy = discount;
  }

}

export class DiscountStrategy {
  protected discount = 0;

  getDiscount(cart: ShoppingCart): number {
    return cart.getTotalPurchase();
  }
}

export class DefaultDiscount extends DiscountStrategy {

  protected discount = 0;

  getDiscount(cart: ShoppingCart): number {
    const total = cart.getTotalPurchase();

    if (total >= 100) {
      this.discount = 10;
    } else {
      this.discount = 5;
    }

    return total - total * (this.discount / 100);
  }

}

export class SecondtDiscount extends DiscountStrategy {

  protected discount = 0;

  getDiscount(cart: ShoppingCart): number {
    const total = cart.getTotalPurchase();

    if (cart.getProducts().length >= 3) {
      this.discount = 50; // 50% de desconto na compra de 3 ou mais notebooks
    }

    return total - total * (this.discount / 100);
  }

}

// Client

const cart = new ShoppingCart();

//cart.discount = new DefaultDiscount();
cart.discount = new SecondtDiscount();

cart.addProducts({ name: 'Macbook Air M1 2020', price: 7000 });
cart.addProducts({ name: 'Notebook Dell Inspiron', price: 3000 });
cart.addProducts({ name: 'Macbook PRO M1 2022', price: 10000 });

console.log('Total SEM desconto: ', cart.getTotalPurchase());
console.log('Total COM desconto: ', cart.getTotalPurchaseWithDiscount());