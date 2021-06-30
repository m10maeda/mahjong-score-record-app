import { PlayerId } from '../player';
import { ChipCount } from '../score';
import ChipScoreTableId from './ChipScoreTableId';
import ChipScoreTableSpecification from './ChipScoreTableSpecification';
import PlayerChipScore from './PlayerChipScore';
import PlayerChipScores from './PlayerChipScores';

export default class ChipScoreTable implements Iterable<PlayerChipScore> {
  public readonly id: ChipScoreTableId;

  private scores: PlayerChipScores;

  public get scoredPlayerIds(): Iterable<PlayerId> {
    return this.scores.scoredPlayerIds;
  }

  public [Symbol.iterator](): Iterator<PlayerChipScore> {
    return this.scores[Symbol.iterator]();
  }

  public equals(other: ChipScoreTable): boolean {
    return this.id.equals(other.id);
  }

  public update(
    scores: PlayerChipScores,
    spec: ChipScoreTableSpecification,
  ): void {
    if (!spec.isSatisfiedBy(this.scoredPlayerIds)) {
      throw new RangeError('Scores must satisfies ChipScoreTableSpecification');
    }

    this.scores = scores;
  }

  public constructor(
    id: ChipScoreTableId,
    scores: PlayerChipScores,
    spec: ChipScoreTableSpecification,
  ) {
    if (!scores.totalChipCount.equals(new ChipCount(0))) {
      throw new Error(`ChipCounts must be zero sum.`);
    }

    if (!spec.isSatisfiedBy(scores.scoredPlayerIds)) {
      throw new RangeError('Scores must satisfies ChipScoreTableSpecification');
    }

    this.id = id;
    this.scores = scores;
  }
}
