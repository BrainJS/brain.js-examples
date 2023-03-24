import {INumberDictionary} from "./shirts";

export class Lookup {
  dictionary: INumberDictionary;
  values: number[];

  constructor(dictionary: INumberDictionary) {
    this.dictionary = dictionary;
    this.values = Object.values(dictionary);
  }
  getKey(value: number): string {
    for (const p in this.values) {
      if (this.values[p] === value) {
        return p;
      }
    }
    throw new Error('could not find key');
  }
  closest(value: number): number {
    return this.values.reduce((prev, curr) => {
      return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    });
  }
}