export default class PlayerName {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: PlayerName): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') {
      throw new RangeError(`PlayerName must not be empty string.`);
    }

    this.value = value;
  }
}
