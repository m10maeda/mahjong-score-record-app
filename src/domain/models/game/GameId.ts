export default class GameId {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: GameId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') {
      throw new RangeError(`GameId must not be empty string.`);
    }

    this.value = value;
  }
}
