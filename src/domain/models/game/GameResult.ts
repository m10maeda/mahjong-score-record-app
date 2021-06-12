import { PlayerId } from '../player';
import { Place, Point } from '../score';
import GameResultSizeSpecification from './GameResultSizeSpecification';
import GameScore from './GameScore';
import PlayerGameScore from './PlayerGameScore';
import PlayerScoredPoint from './PlayerScoredPoint';

type Key = ReturnType<PlayerScoredPoint['playerId']['toString']>;

export default class GameResult implements Iterable<PlayerGameScore> {
  private readonly scores: Map<Key, PlayerScoredPoint>;

  public get scoredPlayerIds(): Iterable<PlayerId> {
    return Array.from(this.scores.values()).map((score) => score.playerId);
  }

  public getPlayerGameScoreBy(playerId: PlayerId): PlayerGameScore | undefined {
    return Array.from(this).find((score) => score.playerId.equals(playerId));
  }

  public [Symbol.iterator](): Iterator<PlayerGameScore> {
    return Array.from(this.scores.values())
      .map((score) => {
        const place = this.calcPlaceBy(score.playerId);

        return new PlayerGameScore(
          score.playerId,
          new GameScore(place, score.point),
        );
      })
      [Symbol.iterator]();
  }

  private calcPlaceBy(playerId: PlayerId): Place {
    const score = this.scores.get(playerId.toString());

    if (score === undefined) {
      throw new ReferenceError(`PlayerId(${playerId}) is not contained.`);
    }

    const scores = Array.from(this.scores.values());
    const sortedScores = scores.sort((a, b) => a.compareTo(b)).reverse();
    const index = sortedScores.findIndex((_score) =>
      _score.point.equals(score.point),
    );

    return Place.valueOf(index + 1);
  }

  public constructor(
    scores: Iterable<PlayerScoredPoint>,
    sizeSpec: GameResultSizeSpecification,
  ) {
    const unduplicatedScores = new Map(
      Array.from(scores).map((score) => [score.playerId.toString(), score]),
    );

    if (!sizeSpec.isSatisfiedBy(unduplicatedScores.values())) {
      throw new RangeError(
        'Scores must be satisfied GameResultSizeSpecification.',
      );
    }

    if (!GameResult.isZeroSum(unduplicatedScores.values())) {
      throw new RangeError('Scores must be zero sum.');
    }

    this.scores = unduplicatedScores;
  }

  private static isZeroSum(scores: Iterable<PlayerScoredPoint>): boolean {
    const totalPoint = Array.from(scores)
      .map((score) => score.point)
      .reduce((a, b) => a.add(b));

    return totalPoint.equals(new Point(0));
  }
}
