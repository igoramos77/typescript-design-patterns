export class ObjectChaining {
  
  protected proximo: ObjectChaining | null = null;

  addNext(proximo: ObjectChaining): ObjectChaining {
    this.proximo = proximo;
    return proximo;
  }

  handle(requisicao: string): string {
    if (this.proximo) return this.proximo.handle(requisicao);
    return requisicao;
  }

}

export class ObjA extends ObjectChaining {
  handle(requisicao: string): string {
    return super.handle(requisicao + 'ObjA, ')
  }
}

export class ObjB extends ObjectChaining {
  handle(requisicao: string): string {
    return super.handle(requisicao + 'ObjB, ')
  }
}

const objetoA = new ObjA();
objetoA.addNext(new ObjB()).addNext(new ObjB()).addNext(new ObjA());
console.log(objetoA.handle('Objetos em cadeia (A): '))