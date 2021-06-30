export default class PlayersRuleId {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: PlayersRuleId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') {
      throw new RangeError(`PlayersRuleId must not be empty string.`);
    }

    this.value = value;
  }
}
