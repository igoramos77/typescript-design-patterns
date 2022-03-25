/**
* O Bridge é um padrão de projeto estrutural que permite que você divida uma classe 
* grande ou um conjunto de classes intimamente ligadas em duas hierarquias separadas—abstração
* e implementação—que podem ser desenvolvidas independentemente umas das outras.

* A implementação do padrão Bridge é muito semelhante ao Adapter, só muda a intenção do padrão em sí. 
*/

export interface IDevice {
  getName(): string;

  getPower(): boolean;
  setPower(powerStatus: boolean): void;

  getVolume(): number; 
  setVolume(volume: number): number;

  getTemperature?(): number;
  setTemperature?(temperature: number): number;
}

export class RemoteControl {
  constructor(protected device:IDevice) {}

  togglePower(): void {
    this.device.setPower(!this.device.getPower());
    console.log(`${this.device.getName()} power status: ${this.device.getPower()}`);
  }
}

export class RemoteControlWithVolume extends RemoteControl {
  volumeUp(): void {
    const oldVolume = this.device.getVolume();
    this.device.setVolume(this.device.getVolume() + 10);

    console.log(`${this.device.getName()} tinha volume ${oldVolume} agora tem ${this.device.getVolume()}`);
  }
  
  volumeDown(): void {
    const oldVolume = this.device.getVolume();
    this.device.setVolume(this.device.getVolume() - 10);

    console.log(`${this.device.getName()} tinha volume ${oldVolume} agora tem ${this.device.getVolume()}`);
  }
}

export class RemoteControlWithTemperature extends RemoteControl {
  temperatureUp(): void {
    const oldTemperature = this.device.getTemperature();
    this.device.setTemperature(this.device.getTemperature() + 1);

    console.log(`${this.device.getName()} tinha temperatura ${oldTemperature} agora tem ${this.device.getTemperature()}`);
  }

  temperatureDown(): void {
    const oldTemperature = this.device.getTemperature();
    this.device.setTemperature(this.device.getTemperature() - 1);

    console.log(`${this.device.getName()} tinha temperatura ${oldTemperature} agora tem ${this.device.getTemperature()}`);
  }
}

export class Tv implements IDevice {
  private volume = 10;
  private power = false;
  private name = 'TV';

  setPower(powerStatus: boolean): void {
    this.power = powerStatus;
  }

  getPower(): boolean {
    return this.power;
  }

  getName(): string {
    return this.name;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): number {
    if (volume < 0) return;
    if (volume > 100) return;

    this.volume = volume;
  }
}

export class Radio implements IDevice {
  private volume = 20;
  private power = false;
  private name = 'Radio';

  setPower(powerStatus: boolean): void {
    this.power = powerStatus;
  }

  getPower(): boolean {
    return this.power;
  }

  getName(): string {
    return this.name;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): number {
    if (volume < 0) return;
    if (volume > 100) return;

    this.volume = volume;
  }
}

export class AirConditioning implements IDevice {
  private volume = 10;
  private power = false;
  private temperature = 24;
  private name = 'Air Conditioning';

  setPower(powerStatus: boolean): void {
    this.power = powerStatus;
  }

  getPower(): boolean {
    return this.power;
  }

  getName(): string {
    return this.name;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): number {
    this.volume = volume;
  }

  getTemperature(): number {
    return this.temperature;
  }

  setTemperature(temperature: number): number {
    if (temperature < 17) return;
    if (temperature > 26) return;

    this.temperature = temperature;
  }
}

function client(abstraction: RemoteControl | RemoteControlWithVolume | RemoteControlWithTemperature): void {
  abstraction.togglePower(); //true

  // Cláusula de guarda
  if ('volumeUp' in abstraction) {
      abstraction.volumeUp();   //30
      abstraction.volumeUp();   //40
      abstraction.volumeUp();   //50
      abstraction.volumeUp();   //60
      abstraction.volumeUp();   //70
      abstraction.volumeUp();   //80
      abstraction.volumeUp();   //90
      abstraction.volumeDown(); //80

      return;
    }

    if ('temperatureUp' in abstraction) {
      abstraction.temperatureUp();
      abstraction.temperatureUp();
      abstraction.temperatureUp();
      abstraction.temperatureUp();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();
      abstraction.temperatureDown();

      return;
    }
  }

const tv =  new Tv();
const radio = new Radio();
const airConditioning = new AirConditioning();

const radioRemoteControl = new RemoteControl(radio);
const radioRemoteControl2 = new RemoteControlWithVolume(radio);

const tvRemoteControl = new RemoteControlWithVolume(tv);

const airConditioningControl = new RemoteControlWithTemperature(airConditioning);

// radio 1 ON
//client(radioRemoteControl); 

// radio ON and change volumes
//client(radioRemoteControl2); 

// tv ON and change volumes
//client(tvRemoteControl); 

// Ar condicionado ON and change volumes
client(airConditioningControl); 

