import { EntryPlayerList } from '../../entryPlayerList';
import { PlayerId } from '../../player';
import { PlayerCount, PlayersRuleType } from '../../playersRule';
import { Point } from '../../score';
import PlayerScoredPoint from '../PlayerScoredPoint';
import PlayerScoredPoints from '../PlayerScoredPoints';

export default class GameResultComplementer {
  private readonly entryPlayerList: EntryPlayerList;

  private readonly playersRuleType: PlayersRuleType;

  public complement(scores: PlayerScoredPoints): PlayerScoredPoints {
    if (!this.isNeededToComplementBy(scores)) {
      return scores;
    }

    const addend = this.calcPlayerScoredPoint(scores);
    if (addend === undefined) {
      return scores;
    }

    return new PlayerScoredPoints([
      ...Array.from(scores).map(
        (score) => new PlayerScoredPoint(score.playerId, score.point),
      ),
      addend,
    ]);
  }

  private isNeededToComplementBy(scores: PlayerScoredPoints): boolean {
    return this.playersRuleType.isMatchedBy(new PlayerCount(scores.size + 1));
  }

  private calcPlayerScoredPoint(
    scores: PlayerScoredPoints,
  ): PlayerScoredPoint | undefined {
    const candidateId = this.getCandidateId(scores);

    if (candidateId === undefined) {
      return undefined;
    }

    const diffPoint = new Point(0).subtract(scores.totalPoint);
    return new PlayerScoredPoint(candidateId, diffPoint);
  }

  private getCandidateId(scores: PlayerScoredPoints): PlayerId | undefined {
    const unscoredEntryPlayerIds = Array.from(
      this.entryPlayerList.exclude(scores.scoredPlayerIds),
    );

    if (unscoredEntryPlayerIds.length !== 1) {
      return undefined;
    }

    return unscoredEntryPlayerIds[0];
  }

  public constructor(
    entryPlayerList: EntryPlayerList,
    playersRuleType: PlayersRuleType,
  ) {
    this.entryPlayerList = entryPlayerList;
    this.playersRuleType = playersRuleType;
  }
}
