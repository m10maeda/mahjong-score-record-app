import PlayersRule from './PlayersRule';
import PlayersRuleType from './PlayersRuleType';

export interface IPlayerRuleFactory {
  create(type: PlayersRuleType): Promise<PlayersRule>;
}
