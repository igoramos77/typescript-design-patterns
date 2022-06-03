export type IPowerStatus = 'ON' | 'OFF';

export interface ISmartHouseCommandProps {
  execute(): void;
  back(): void;
}

export class SmartHouseLight {

  private status = false;
  private intensity = 50;

  constructor(public name: string) { }

  getPowerStatus(): IPowerStatus {
    return this.status ? 'ON' : 'OFF'
  }

  on(): boolean {
    this.status = true;
    console.log(`${this.name} is ${this.getPowerStatus()}`)
    return this.status;
  }

  off(): boolean {
    this.status = false;
    console.log(`${this.name} is ${this.getPowerStatus()}`)
    return this.status;
  }

  handleUpIntensity(): number {
    if (this.intensity >= 100) return this.intensity; // limit intenity in 100
    this.intensity += 1;
    return this.intensity;
  }

  handleDownIntensity(): number {
    if (this.intensity <= 0) return this.intensity; // limit intenity in 100
    this.intensity -= 1;
    return this.intensity;
  }

}

export class LightHouseCommand implements ISmartHouseCommandProps {

  constructor(private readonly light: SmartHouseLight) { }

  execute(): void {
    this.light.on();
  }

  back(): void {
    this.light.off();
  }

}

export class SmartHouseController {
  private commands: { [k: string]: LightHouseCommand } = {};

  addCommand(key: string, command: LightHouseCommand) {
    this.commands[key] = command; 
  }

  executeCommand(key: string): void {
    this.commands[key].execute();
  }


  backCommand(key: string): void {
    this.commands[key].back();
  }

}

// Client

const light1 = new SmartHouseLight('Luz 01');

const light1Command = new LightHouseCommand(light1); 

light1Command.execute();
light1Command.back(); 