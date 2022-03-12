/*
* O Builder é um padrão de projeto criacional que permite a você construir objetos
* complexos passo a passo. O padrão permite que você produza diferentes tipos e
* representações de um objeto usando o mesmo código de construção.
*/


class Person {
  constructor(public name?: string, public age?: number, public cpf?: number) {

  }
}

class PersonBuilder {
  private person = new Person();

  newPerson(): void {
    this.person = new Person();
  }

  setName(name: string): this {
    this.person.name = name;

    return this;
  }

  setAge(age: number): this {
    this.person.age = age;

    return this;
  }

  setCpf(cpf: number): this {
    this.person.cpf = cpf;

    return this;
  }

  getResult(): Person {
    return this.person;
  }

}

const personBuilder = new PersonBuilder();

const person1 = personBuilder.setName('Igor Brown').setAge(28).setCpf(15443385704);
console.log(person1);

personBuilder.newPerson(); //zera a pessoa

const person2 = personBuilder.setName('Marco Antônio').setAge(45);
console.log(person2);

const person3 = personBuilder.setName('Nicole').setAge(23).setCpf(999999)
console.log(person3.getResult());