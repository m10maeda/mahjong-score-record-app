import { PlayerCount, PlayersRuleType } from '../playersRule';
import PlayerChipScores from './PlayerChipScores';

export default class ChipScoreTableMinSpecification {
  private readonly playersRuleType: PlayersRuleType;

  public isSatisfiedBy(scores: PlayerChipScores): boolean {
    return this.playersRuleType.isSatisfiedBy(new PlayerCount(scores.count));
  }

  private constructor(playersRuleType: PlayersRuleType) {
    this.playersRuleType = playersRuleType;
  }

  public static readonly FourPlayers = new ChipScoreTableMinSpecification(
    PlayersRuleType.FourPlayers,
  );

  public static readonly ThreePlayers = new ChipScoreTableMinSpecification(
    PlayersRuleType.ThreePlayers,
  );
}
