abstract class TemplateMethodBaseClass {

  // Como não existe método final em js/ts, um hack seria declara-lo como READONLY para que ele não possa ser sobrescrito
  readonly templateMethod = (): void => {
    this.stepA();
    this.hook();
    this.stepB();
  }

  abstract stepA(): void;
  abstract stepB(): void;
  hook(): void {}
}

export class ConcreteTemplateMethod extends TemplateMethodBaseClass {
  stepA(): void {
    console.log('A - stepA')
  }

  stepB(): void {
    console.log('A - stepB')
  }

  hook(): void {
    console.log('A - Hook foi usado')
  }
}

// Client

const use = new ConcreteTemplateMethod();
use.templateMethod();
