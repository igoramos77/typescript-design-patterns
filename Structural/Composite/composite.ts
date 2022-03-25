/*
*   O Composite é um padrão de projeto estrutural que permite que você componha 
*   objetos em estruturas de árvores e então trabalhe com essas estruturas como 
*   se elas fossem objetos individuais.
*/

// Component
export abstract class ValidationComponent {
  abstract validate(value: string): boolean;
}

// Base
export class ValidateIsEmail extends ValidationComponent {
  validate(value: string): boolean {
    const rgxEmail: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return rgxEmail.test(value);
  }
}

export class ValidateIsGmail extends ValidationComponent {
  validate(value: string): boolean {
    const rgxContainGmail = /gmail/;
    return rgxContainGmail.test(value);
  }
}

export class ValidateIsNationalDomain extends ValidationComponent {
  validate(value: string): boolean {
    const rgxBr = /\.br/;
    return rgxBr.test(value);
  }
}

// Composite
export class ValidationComposite extends ValidationComponent {
  private readonly children: ValidationComponent[] = [];

  validate(value: string): boolean {
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
const validateIsNationalDomain = new ValidateIsNationalDomain();

const validationComposite = new ValidationComposite();

validationComposite.add(validateEmail, validateIsGmail, validateIsNationalDomain);

console.log(validationComposite.validate('igorbrownramos@gmail.com.br'));