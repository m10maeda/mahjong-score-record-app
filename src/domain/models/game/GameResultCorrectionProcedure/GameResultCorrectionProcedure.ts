import PlayerScoredPoints from '../PlayerScoredPoints';
import GameResultAdjuster from './GameResultAdjuster';
import GameResultComplementer from './GameResultComplementer';

export default class GameResultCorrectionProcedure {
  private readonly complementer: GameResultComplementer;

  private readonly adjuster: GameResultAdjuster;

  public correct(scores: PlayerScoredPoints): PlayerScoredPoints {
    const complemented = this.complementer.complement(scores);
    const adjusted = this.adjuster.adjust(complemented);

    return adjusted;
  }

  public constructor(
    complementer: GameResultComplementer,
    adjuster: GameResultAdjuster,
  ) {
    this.complementer = complementer;
    this.adjuster = adjuster;
  }
}
