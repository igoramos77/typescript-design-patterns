/*
* O Singleton é um padrão de projeto criacional que permite a você garantir que 
* uma classe tenha apenas uma instância, enquanto provê um ponto de acesso global
* para essa instância.

* Usamos o padrão de criação Singleton, inclusive, para substituir variaveis globais que possam ser utilizadas 
* por todo o software
*/

class Singleton {
  private static _instance: Singleton | null = null;

  private constructor() {
    // Construtor privado impede que se faça um new Singleton() fora da classe, por exemplo
  }

  static getInstance(): Singleton {
    if(Singleton._instance === null) {
      Singleton._instance = new Singleton();
    }

    return Singleton._instance; // Dessa forma, impedimos que tenham mais de 1 instância do Singleton por todo o código
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

// testa de as instâncias são iguais
console.log(instance1 === instance2); //true