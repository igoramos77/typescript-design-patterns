export type File = 'csv' | 'xls' | 'xlsx' | 'txt';

export interface IMemento {
  getName(): string;
  getDate(): Date;
}

export class Memento implements IMemento {

  constructor(private name: string, private date: Date, private filePath: string, private fileFormat: string) {}

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }

  getFilePath(): string {
    return this.filePath;
  }

  getFileFileFormat(): string {
    return this.fileFormat;
  }

}

export class CsvEditor {
  constructor(private filePath: string, private fileFormat: string) {}
  
  convertTo(format: File): void {
    this.fileFormat = format;
    this.filePath = this.filePath.split('.').pop();
    this.filePath += '.' + format;
  }

  save(): Memento {
    const date = new Date();
    return new Memento('bkp1', date, this.filePath, this.fileFormat);
  }

  restore(memento: Memento): void {
    const memento1 = memento as Memento;
    
    this.filePath = memento1.getFilePath();
    this.fileFormat = memento1.getFileFileFormat(); 
  }

}

export class BackupManager {

  private mementos: Memento[] = [];

  constructor(private readonly csvEditor: CsvEditor) {}

  backup(): void {
    console.log(`BACKUP: CSV CONVERTER IN PROGRESS.`);
    this.mementos.push(this.csvEditor.save());
  }

  undo(): void {
    const memento = this.mementos.pop();
    
    if (!memento) {
      console.log(`BACKUP: NOT FOUND.`);
      return;
    }

    this.csvEditor.restore(memento);
    console.log(`BACKUP ${memento.getName()} successfully restored`);
  }

  show(): void {
    this.mementos.forEach(memento => {
      console.log(memento);
    });
  }
}

// Client

//console.log('--------- INICIAL --------- ');
const csv1 = new CsvEditor('/src/alunos.csv', 'csv');
const bkpManager = new BackupManager(csv1);

bkpManager.backup();
csv1.convertTo('xlsx');

bkpManager.backup();
csv1.convertTo('xls');

bkpManager.backup();
csv1.convertTo('txt');

console.log('último formato: ')
console.log(csv1);

console.log('após o backup: ')
bkpManager.undo();
//bkpManager.undo();
//bkpManager.undo();
//bkpManager.undo();
console.log(csv1);