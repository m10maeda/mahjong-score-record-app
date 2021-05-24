type Value = 3 | 4;

export default class PlayersRuleType {
  private readonly value: Value;

  private constructor(value: Value) {
    this.value = value;
  }

  public toNumber(): number {
    return this.value;
  }

  public equals(other: PlayersRuleType): boolean {
    return this.value === other.value;
  }

  public static readonly ThreePlayers = new PlayersRuleType(3);

  public static readonly FourPlayers = new PlayersRuleType(4);
}
