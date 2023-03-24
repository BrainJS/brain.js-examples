

function findMax(obj: number[]): number {
  return Math.max(...obj);
}
function findMin(obj: number[]): number {
  return Math.min(...obj);
}
export class Scale {
  min: number;
  max: number;
  constructor(values: number[]) {
    this.min = findMin(values);
    this.max = findMax(values);
  }
  normalize(value: number): number {
    return (value - this.min) / this.max;
  }
  denormalize(value: number): number {
    return (value + this.min) * this.max;
  }
}