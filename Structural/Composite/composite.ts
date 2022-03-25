/*
*   O Composite é um padrão de projeto estrutural que permite que você componha 
*   objetos em estruturas de árvores e então trabalhe com essas estruturas como 
*   se elas fossem objetos individuais.
*/

// Component
export abstract class ValidationComponent {
  abstract validate(value: unknown): boolean;
}

// Base
export class ValidateIsEmail extends ValidationComponent {
  validate(value: unknown): boolean {
    // Clausula de guarda
    if (typeof value !== 'string') return false;

    const rgxEmail: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return rgxEmail.test(value);
  }
}

export class ValidateIsGmail extends ValidationComponent {
  validate(value: unknown): boolean {
    // Clausula de guarda
    if (typeof value !== 'string') return false;

    const rgxContainGmail = /gmail/;
    return rgxContainGmail.test(value);
  }
}

// Composite
export class ValidationComposite extends ValidationComponent {
  private readonly children: ValidationComponent[] = [];

  validate(value: unknown): boolean {
    for (const child of this.children) {
      const validation = child.validate(value);
      if (!validation) return false;
    }
    return true;
  }

  add(...validations: ValidationComponent[]): void {
    validations.forEach((validation) => this.children.push(validation));
  }
}

const validateEmail = new ValidateIsEmail();
const validateIsGmail = new ValidateIsGmail();

const validationComposite = new ValidationComposite();

validationComposite.add(validateEmail, validateIsGmail);

console.log(validationComposite.validate('igorbrownramos@gmail.com'));