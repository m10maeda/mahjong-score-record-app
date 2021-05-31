import { PlayerCount } from '../player';
import { PlayersRuleType } from '../playersRule';
import EntryPlayers from './EntryPlayers';

export default class EntryPlayerListMinSpecification {
  public readonly playersRuleType: PlayersRuleType;

  public isSatisfiedBy(players: EntryPlayers): boolean {
    if (this.playersRuleType.equals(PlayersRuleType.ThreePlayers)) {
      return players.count.compareTo(new PlayerCount(3)) >= 0;
    }

    return players.count.compareTo(new PlayerCount(4)) >= 0;
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
