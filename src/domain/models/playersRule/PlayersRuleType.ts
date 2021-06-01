import { PlayerCount } from '../player';

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

  public isSatisfiedBy(count: PlayerCount): boolean {
    return new PlayerCount(this.value).compareTo(count) <= 0;
  }

  public isMatchedBy(count: PlayerCount): boolean {
    return new PlayerCount(this.value).equals(count);
  }

  public static readonly ThreePlayers = new PlayersRuleType(3);

  public static readonly FourPlayers = new PlayersRuleType(4);
}
