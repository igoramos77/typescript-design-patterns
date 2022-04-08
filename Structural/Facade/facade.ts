/*
    O Facade é um padrão de projeto estrutural que fornece uma interface 
    simplificada para uma biblioteca, um framework, ou qualquer conjunto 
    COMPLEXO de classes.

    Em outras palavras, é um padrão estutural que funciona, como o próprio nome
    diz, como uma fachada para simplificar estruturas complexas.

    CUIDADO: Precisamos ter cuidado com o princípio de responsabildiade única, 
    já que é muito comum termos uma "Good Class" (Classe que faz tudo).
*/

type licenseType = 'active' | 'expire';

type componentsType = {
  name: string;
  license: licenseType; 
  status: boolean;
}

interface IServerProps {
  server: componentsType;
  database: componentsType;

  startServer(): boolean;
  startDatabase(): boolean;

  getServerStatus(): boolean;
  getServerLicense(): licenseType;

  getDatabaseStatus(): boolean;
  getDatabaseLicense(): licenseType;
}

class Server implements IServerProps {
    
    public server: componentsType;
    public database: componentsType;

    constructor(server: componentsType, database: componentsType) {
        this.server = server ;
        this.database = database;
    }


  getServerName(): string {
    return this.server.name;
  }

  getDatabaseName(): string {
    return this.database.name;
  }

  getServerStatus(): boolean {
    return this.server.status;
  }

  getServerLicense(): licenseType {
    return this.server.license;
  }

  getDatabaseStatus(): boolean {
    return this.database.status;
  }

  getDatabaseLicense(): licenseType {
    return this.database.license;
  }

  // Start

  startServer(): boolean {
      
    try {
      if (this.getServerLicense() === 'expire' || this.getDatabaseStatus() === false) {
        throw new Error(`Ops! License for Server ${this.getServerName()} is ${this.getServerStatus()}`);
      }

      if (this.getServerStatus()) {
        console.log(`server ${this.getServerName()} is started!`)
      }
      
      return true;
    } catch (error) {
      throw new Error(`Server not started. LOG: \n SERVER: ${JSON.stringify(this.server)} \n DATABASE: ${JSON.stringify(this.database)}`);
    }
    
  }

  startDatabase(): boolean {

    try {
      if (this.getDatabaseLicense() === 'expire' || this.getDatabaseStatus() === false) {
        throw new Error(`Ops! License for Database ${this.getDatabaseName()} is ${this.getDatabaseLicense()}`);
      }

      if (this.getDatabaseStatus()) {
        console.log(`server ${this.getServerName()} is started!`)
      }

      return true;
    } catch (error) {
      throw new Error(`Server not started. LOG: ${JSON.stringify(this.server)} \n ${JSON.stringify(this.database)} `);
    }
  }
   
}

// Facade

class Facade {
    public component1: Server;
    public component2: Server;

    constructor(component1: Server, component2: Server) {
        this.component1 = component1;
        this.component2 = component2;
    }

    public startUp() {
        this.component1.startServer();
        this.component2.startServer();
    }
}


// Client

const server1: componentsType = { 
    name: 'Ubuntu 1.0X', 
    license: 'active',
    status: true,
}

const database1: componentsType = {
    name: 'Postegres',
    license: 'active',
    status: true,
}

const server2: componentsType = { 
    name: 'Ubuntu 1.0X', 
    license: 'active',
    status: false,
}

const database2: componentsType = {
    name: 'Postegres',
    license: 'active',
    status: false,
}

const component1 = new Server(server1, database1);
const component2 = new Server(server2, database2);

component1.startServer();

console.log('=======================================================')

const facede = new Facade(component1, component2);
facede.startUp()