class Context {

  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(`Foi para: ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

class ConcreteStateA extends State {
  public handle1(): void {
    console.log('Estado A: request 1');
    console.log('Estado A mudou de contexto');
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log('Estado A: request 2');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('Estado B: request 1.');
  }

  public handle2(): void {
    console.log('Estado B: request 2');
    console.log('Estado B mudou de contexto');
    this.context.transitionTo(new ConcreteStateA());
  }
}

// Client

const context = new Context(new ConcreteStateA());
context.request1();
context.request2();