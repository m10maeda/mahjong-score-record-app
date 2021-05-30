import PlayersRuleId from './PlayersRuleId';
import PlayersRuleType from './PlayersRuleType';

export default class PlayersRule {
  public readonly id: PlayersRuleId;

  public readonly type: PlayersRuleType;

  public equals(other: PlayersRule): boolean {
    return this.id.equals(other.id);
  }

  public constructor(id: PlayersRuleId, type: PlayersRuleType) {
    this.id = id;
    this.type = type;
  }
}
