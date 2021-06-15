import { PlayerCount } from '../../player';
import { PlayersRuleType } from '../../playersRule';
import { Point } from '../../score';
import PlayerScoredPoint from '../PlayerScoredPoint';
import PlayerScoredPoints from '../PlayerScoredPoints';

export default class GameResultAdjuster {
  private readonly plaersRuleType: PlayersRuleType;

  public adjust(scores: PlayerScoredPoints): PlayerScoredPoints {
    if (!this.isNeededToAdjustBy(scores)) {
      return scores;
    }

    const scoreOfFirstPlace = Array.from(scores)[0];
    const scoresWithoutFirstPlace = new PlayerScoredPoints(
      Array.from(scores).filter((score) => !score.equals(scoreOfFirstPlace)),
    );
    const adjustedPoint = new Point(0).subtract(
      scoresWithoutFirstPlace.totalPoint,
    );

    return new PlayerScoredPoints([
      new PlayerScoredPoint(scoreOfFirstPlace.playerId, adjustedPoint),
      ...Array.from(scoresWithoutFirstPlace).map(
        (score) => new PlayerScoredPoint(score.playerId, score.point),
      ),
    ]);
  }

  private isNeededToAdjustBy(scores: PlayerScoredPoints): boolean {
    return (
      this.plaersRuleType.isMatchedBy(new PlayerCount(scores.size)) &&
      !scores.totalPoint.equals(new Point(0))
    );
  }

  private constructor(plaersRule: PlayersRuleType) {
    this.plaersRuleType = plaersRule;
  }

  public static readonly FourPlayers = new GameResultAdjuster(
    PlayersRuleType.FourPlayers,
  );

  public static readonly ThreePlayers = new GameResultAdjuster(
    PlayersRuleType.ThreePlayers,
  );
}
