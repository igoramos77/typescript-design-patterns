/*
 * Link do repo: 👇🏻
 * https://codesandbox.io/embed/typescript-playground-export-forked-0sz98i?fontsize=14&hidenavigation=1&theme=dark
 *
 * O Adapter é um padrão de projeto estrutural que permite objetos com
 * interfaces incompatíveis colaborarem entre si.
 *
 */

import isEmail from "validator/lib/isEmail";

// Verifica se o e-mail é válido sem adpter

const email = "igorborwnramos@gmail.com";

if (isEmail(email)) {
  console.log("1: E-mail is valid!");
} else {
  console.log("1: INVALID!");
}

/*
 * Caso precisemos alterar a biblioteca validator, precisaremos
 * alterar em todo o código onde checamos se é o e-mail é válido
 */

export interface IEmailValidator {
  isEmail(value: string): boolean;
}

export class EmailValidatorAdapter implements IEmailValidator {
  // usando a lib Validator.js

  isEmail(value: string): boolean {
    return isEmail(value);
  }

  // usando outra lib ou regex

  /*
  isEmail(value: string): boolean {
    const rgx: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return rgx.test(value);
  }
  */
}

const anotherEmail = "igor@gmail.com";

const emailValidatorAdapter = new EmailValidatorAdapter();

const emailIsValid = emailValidatorAdapter.isEmail(anotherEmail);

if (emailIsValid) {
  console.log("2: E-mail is valid!");
} else {
  console.log("2: INVALID!");
}
