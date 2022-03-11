/* 
* O Prototype é um padrão de projeto criacional que permite copiar objetos 
* existentes sem fazer seu código ficar dependente de suas classes.
*/

/*
  * Como o JS é uma linguagem baseada em prototypes, os objetos detem de métodos nativo, 
  * já que todo obj em js/ts é Object.prototype


  * esse tipo de padrão de criação evita que você fique criando subclasses somente 
  * para fazer pequenas alterações e evita a "explosão de subclasses"
*/

interface IPerson {
  name: string;
  age?: number;
} 

const person = {
  name: 'Igor',
  age: 28,
}

// apenas verifica se há a propriedade name no obj person 
person.hasOwnProperty('name') ? console.log(true) : console.log(false);

const person1 = Object.create(person); //Clone baseado no prototype <> de Interface por exemplo

// outra pessoa baseado em Interface
const person2: IPerson = {
  name: 'Marco',
  //age: 50,
}

console.log(person1.name);
console.log(person2);



// abaixo a implementação baseada em class e objs =================================

interface Prototype {
  clone(): Prototype;
}

class Person implements Prototype {
  constructor(public name: string, public age: number) {

  }

  clone(): this {
    // Criando uma especie de clone, porém é um novo objeto que tem o mesmo obj como protótipo
    const newPerson = Object.create(this);
    return newPerson;
  }
}

const person3 = new Person('Marco Antônio', 45);
const person4 = person3.clone();

console.log(person3.name); // Marco Antônio
console.log(person4.name); // Marco Antônio, porém, o name não é uma propriedade de person ela está dentro do "proto" do obj