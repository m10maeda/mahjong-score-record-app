import { PlayerId } from '../player';
import { GameScore, Place, Point } from '../score';
import GameResultCorrectionProcedure from './GameResultCorrectionProcedure';
import GameResultSizeSpecification from './GameResultSizeSpecification';
import PlayerGameScore from './PlayerGameScore';
import PlayerScoredPoints from './PlayerScoredPoints';

export default class GameResult implements Iterable<PlayerGameScore> {
  private readonly scores: PlayerScoredPoints;

  public get scoredPlayerIds(): Iterable<PlayerId> {
    return this.scores.scoredPlayerIds;
  }

  public getPlayerGameScoreBy(playerId: PlayerId): PlayerGameScore | undefined {
    return Array.from(this).find((score) => score.playerId.equals(playerId));
  }

  public [Symbol.iterator](): Iterator<PlayerGameScore> {
    return Array.from(this.scores)
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
    const score = this.scores.getBy(playerId);

    if (score === undefined) {
      throw new ReferenceError(`PlayerId(${playerId}) is not contained.`);
    }

    const scores = Array.from(this.scores);
    const sortedScores = scores.sort((a, b) => a.compareTo(b)).reverse();
    const index = sortedScores.findIndex((_score) =>
      _score.point.equals(score.point),
    );

    return Place.valueOf(index + 1);
  }

  public constructor(
    scores: PlayerScoredPoints,
    correctionProcedure: GameResultCorrectionProcedure,
    sizeSpec: GameResultSizeSpecification,
  ) {
    const correctedScores = correctionProcedure.correct(scores);

    if (!sizeSpec.isSatisfiedBy(correctedScores)) {
      throw new RangeError(
        'Scores must be satisfied GameResultSizeSpecification.',
      );
    }

    if (!correctedScores.totalPoint.equals(new Point(0))) {
      throw new RangeError('Scores must be zero sum.');
    }

    this.scores = correctedScores;
  }
}
