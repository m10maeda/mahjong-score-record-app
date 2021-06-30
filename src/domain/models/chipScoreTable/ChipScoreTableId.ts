export default class ChipScoreTableId {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: ChipScoreTableId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') {
      throw new RangeError(`ChipScoreTableId must not be empty string.`);
    }

    this.value = value;
  }
}
