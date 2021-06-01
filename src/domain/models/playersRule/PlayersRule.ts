import { PlayerCount } from '../player';
import PlayersRuleId from './PlayersRuleId';
import PlayersRuleType from './PlayersRuleType';

export default class PlayersRule {
  public readonly id: PlayersRuleId;

  public readonly type: PlayersRuleType;

  public equals(other: PlayersRule): boolean {
    return this.id.equals(other.id);
  }

  public isSatisfiedBy(count: PlayerCount): boolean {
    return this.type.isSatisfiedBy(count);
  }

  public isMatchedBy(count: PlayerCount): boolean {
    return this.type.isMatchedBy(count);
  }

  public constructor(id: PlayersRuleId, type: PlayersRuleType) {
    this.id = id;
    this.type = type;
  }
}
