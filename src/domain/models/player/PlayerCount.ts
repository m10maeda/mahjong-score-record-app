export default class PlayerCount {
  private readonly value: number;

  public toString(): string {
    return this.value.toString();
  }

  public toNumber(): number {
    return this.value;
  }

  public equals(other: PlayerCount): boolean {
    return this.value === other.value;
  }

  public compareTo(other: PlayerCount): number {
    return this.value - other.value;
  }

  public constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new RangeError('PlayerCount must not be decimals.');
    }

    if (value < 0) {
      throw new RangeError('PlayerCount must not be less than 0.');
    }

    // -0 の場合 0 にする
    this.value = Object.is(value, -0) ? 0 : value;
  }
}
