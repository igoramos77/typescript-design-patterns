/*
    O Mediator é um padrão de projeto comportamental que permite que você reduza as dependências
    caóticas entre objetos. O padrão restringe comunicações diretas entre objetos e os força a 
    colaborar apenas através do objeto mediador.
*/
export type IProductProps = {
  id: string;
  name: string;
  price: number;
}

export class Seller {
  
  private products: IProductProps[] = [];
  private mediator?: Mediator;

  showProducts(): void {
    this.products.forEach((product) => {
      console.log(product.id, product.name, product.price);
    });
  }

  addProduct(...products: IProductProps[]): void {
    products.forEach((product) => this.products.push(product));
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  sell(id: string) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === - 1) return; // not found.
    
    const product = this.products.splice(index, 1);

    return product[0];
  }

}

export class Mediator {

  private sellers: Seller[] = [];

  addSellers(...sellers: Seller[]): void {
    sellers.forEach((seller) => this.sellers.push(seller));
  }

  buy(id: string): Seller | void {
    
    let product: IProductProps;
    
    for (let i = 0; i < this.sellers.length; i++) {
      console.log(`produtct find: `, product.id, product.name, product.price);
      return;
    }

    console.log('Product not found  by id ', product.id);
  }

  showProducts(): void {
    this.sellers.forEach((seller) => seller.showProducts());
  }

}

// Client 

const mediator = new Mediator();
const seler1 =  new Seller();
const seller2 = new Seller();

seler1.addProduct({ id: '1', name: 'Macbook Air', price: 7.500 });
seler1.addProduct({ id: '2', name: 'Macbook PRO M1', price: 9.500 });

seller2.addProduct({ id: '3', name: 'Notebok DELL v1', price: 3.500 });
seller2.addProduct({ id: '4', name: 'Notebok DELL v2', price: 4.500 });


mediator.addSellers(seler1, seller2);

mediator.showProducts(); 
