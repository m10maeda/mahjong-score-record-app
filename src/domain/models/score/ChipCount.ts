export default class ChipCount {
  private readonly value: number;

  public toString(): string {
    return this.value.toString();
  }

  public toNumber(): number {
    return this.value;
  }

  public equals(other: ChipCount): boolean {
    return this.value === other.value;
  }

  public compareTo(other: ChipCount): number {
    return this.value - other.value;
  }

  public add(addend: ChipCount): ChipCount {
    return new ChipCount(this.value + addend.value);
  }

  public subtract(subtrahend: ChipCount): ChipCount {
    return new ChipCount(this.value - subtrahend.value);
  }

  public constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new RangeError(`ChipCount must be integer.`);
    }

    // -0 の場合 0 にする
    this.value = Object.is(value, -0) ? 0 : value;
  }
}
