interface ICustomer {
  name: string;
}

interface IVehicle {
  //custome: ICustomer;
  pickUp(): void;
}

interface ICreateIVehicleCustomer {
  createCustomer(customerName: string): ICustomer;
  createVehicle(vehicleName: string, customerName: string): IVehicle;
}

class EnterpriseCustomer implements ICustomer {
  constructor(public name: string) {

  }
}

class IndividualCustomer implements ICustomer {
  constructor(public name: string) {

  }
}

class EnterpriseCar implements IVehicle {
  constructor(public name: string, private readonly customer: ICustomer, private readonly accents: number) {

  }

  pickUp(): void {
    console.log(`${this.customer.name} está buscando com ${this.name} com ${this.accents} lugares`);
  }
}

class IndividualCar implements IVehicle {
  constructor(public name: string, private customer: ICustomer) {

  }

  pickUp(): void {
    console.log(`${this.customer.name} está buscando ${this.name}`)
  }
}

class EnterpriseCreateVehicleCustomerFactory {
  createCustomer(customerName: string): ICustomer {
    return new EnterpriseCustomer(customerName);
  }

  createVehicle(vehicleName: string, customerName: string): IVehicle {
    const customer = this.createCustomer(customerName);
    return new EnterpriseCar(vehicleName, customer, 8);
  }
}

class IndividualCreateVehicleCustomerFactory {
  createCustomer(customerName: string): ICustomer {
    return new EnterpriseCustomer(customerName);
  }

  createVehicle(vehicleName: string, customerName: string): IVehicle {
    const customer = this.createCustomer(customerName);
    return new IndividualCar(vehicleName, customer);
  }
}


const enterpriseFactory = new EnterpriseCreateVehicleCustomerFactory();
const individualFactory = new IndividualCreateVehicleCustomerFactory();

const car1 = enterpriseFactory.createVehicle('Fiat Doblo', 'Marco');
const car2 = individualFactory.createVehicle('Honda Civic', 'Igor');

car1.pickUp();
car2.pickUp();