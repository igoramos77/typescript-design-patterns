// Parte intrinsica (NÃO MUDA)
export type TDeliveryLocationData = {
  readonly street: string;
  readonly city: string;
}

export type TDeliveryLocationDictionary = { 
  [key: string]: DeliveryLocation;
 }

export interface IDeliveryFlyweigth {
  deliver(name: string, number: number): void;
}

export class DeliveryLocation implements IDeliveryFlyweigth {

  constructor(private readonly intrinsicState: TDeliveryLocationData) {

  }

  deliver(name: string, number: number): void {
    console.log(`
      Entrega enviada para ${name} em ${this.intrinsicState.street}, 
      ${number} - ${this.intrinsicState.city}. 
    `);
  }
}

export class DeliveryFactor {
  private locations: TDeliveryLocationDictionary  = {}
  
  private createId(data: TDeliveryLocationData) {
    return Object.values(data).map(item => item.replace(/\s+/, '').toLocaleLowerCase()).join('_')
  }
  
  makeLocation(intrinsicState: TDeliveryLocationData): IDeliveryFlyweigth {
    const key = this.createId(intrinsicState);

    if (key in this.locations) {
      return this.locations[key];
    }

    this.locations[key] = new DeliveryLocation(intrinsicState);
    
    return this.locations[key];
  }

  getLocations(): TDeliveryLocationDictionary {
    return this.locations
  }
}

const deliveryContext = (
  factory: DeliveryFactor,
  name: string,
  number: number,
  street: string,
  city: string,
): void => {
  const location = factory.makeLocation({ street, city }); //factory
  location.deliver(name, number);
}

const factory = new DeliveryFactor();

// podemos notar 5 endereços e somente 2 endereços foram criados, ou seja, economia de memória
deliveryContext(factory, 'Marco', 20, 'Rua A', 'JF');
deliveryContext(factory, 'Tassio', 20, 'Rua A', 'JF');
deliveryContext(factory, 'Tassio 2', 20, 'Rua A', 'JF');
deliveryContext(factory, 'Anrafel', 20, 'Rua A', 'JF');
deliveryContext(factory, 'Igor', 20, 'Rua B', 'Rj');


console.log(factory.getLocations());