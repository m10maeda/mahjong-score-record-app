import { PlayerCount } from '../player';
import { PlayersRuleType } from '../playersRule';
import PlayerScoredPoint from './PlayerScoredPoint';

export default class GameResultSizeSpecification {
  private readonly playersRuleType: PlayersRuleType;

  public isSatisfiedBy(scores: Iterable<PlayerScoredPoint>): boolean {
    const { size } = new Map(
      Array.from(scores).map((score) => [score.playerId.toString(), score]),
    );

    return this.playersRuleType.isMatchedBy(new PlayerCount(size));
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
