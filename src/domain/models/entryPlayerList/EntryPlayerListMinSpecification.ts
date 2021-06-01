import { PlayersRuleType } from '../playersRule';
import EntryPlayers from './EntryPlayers';

export default class EntryPlayerListMinSpecification {
  private readonly playersRuleType: PlayersRuleType;

  public isSatisfiedBy(players: EntryPlayers): boolean {
    return this.playersRuleType.isSatisfiedBy(players.count);
  }

  private constructor(playersRuleType: PlayersRuleType) {
    this.playersRuleType = playersRuleType;
  }

  public static readonly FourPlayers = new EntryPlayerListMinSpecification(
    PlayersRuleType.FourPlayers,
  );

  public static readonly ThreePlayers = new EntryPlayerListMinSpecification(
    PlayersRuleType.ThreePlayers,
  );
}
