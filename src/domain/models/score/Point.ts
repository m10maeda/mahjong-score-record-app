export default class Point {
  private readonly value: number;

  public toString(): string {
    return this.value.toFixed(1);
  }

  public toNumber(): number {
    return this.value;
  }

  public equals(other: Point): boolean {
    return this.value === other.value;
  }

  public compareTo(other: Point): number {
    return this.value - other.value;
  }

  public add(addend: Point): Point {
    const result = Math.floor(this.value * 10 + addend.value * 10) / 10;

    return new Point(result);
  }

  public subtract(subtrahend: Point): Point {
    const result = Math.floor(this.value * 10 - subtrahend.value * 10) / 10;

    return new Point(result);
  }

  public multiply(factor: number): Point {
    const result = this.value * factor;

    return new Point(result);
  }

  public constructor(value: number) {
    if (!Number.isInteger(value * 10)) {
      throw new RangeError(`Point must be to the first decimal place.`);
    }

    // -0 の場合 0 にする
    this.value = Object.is(value, -0) ? 0 : value;
  }
}
