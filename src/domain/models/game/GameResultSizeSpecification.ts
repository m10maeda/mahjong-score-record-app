import { PlayerCount } from '../player';
import { PlayersRuleType } from '../playersRule';
import PlayerScoredPoints from './PlayerScoredPoints';

export default class GameResultSizeSpecification {
  private readonly playersRuleType: PlayersRuleType;

  public isSatisfiedBy(scores: PlayerScoredPoints): boolean {
    return this.playersRuleType.isMatchedBy(new PlayerCount(scores.size));
  }

  private constructor(playersRuleType: PlayersRuleType) {
    this.playersRuleType = playersRuleType;
  }

  public static readonly FourPlayers = new GameResultSizeSpecification(
    PlayersRuleType.FourPlayers,
  );

  public static readonly ThreePlayers = new GameResultSizeSpecification(
    PlayersRuleType.ThreePlayers,
  );
}
