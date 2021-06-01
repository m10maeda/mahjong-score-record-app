import ChipScoreTableId from './ChipScoreTableId';
import ChipScoreTableMinSpecification from './ChipScoreTableMinSpecification';
import PlayerChipScore from './PlayerChipScore';
import PlayerChipScores from './PlayerChipScores';

export default class ChipScoreTable implements Iterable<PlayerChipScore> {
  public readonly id: ChipScoreTableId;

  private scores: PlayerChipScores;

  public [Symbol.iterator](): Iterator<PlayerChipScore> {
    return this.scores[Symbol.iterator]();
  }

  public equals(other: ChipScoreTable): boolean {
    return this.id.equals(other.id);
  }

  public update(
    scores: PlayerChipScores,
    minSpec: ChipScoreTableMinSpecification,
  ): void {
    if (!minSpec.isSatisfiedBy(scores)) {
      throw new RangeError(
        'Scores must satisfies ChipScoreTableMinSpecification',
      );
    }

    this.scores = scores;
  }

  public constructor(
    id: ChipScoreTableId,
    scores: PlayerChipScores,
    minSpec: ChipScoreTableMinSpecification,
  ) {
    if (!minSpec.isSatisfiedBy(scores)) {
      throw new RangeError(
        'Scores must satisfies ChipScoreTableMinSpecification',
      );
    }

    this.id = id;
    this.scores = scores;
  }
}
