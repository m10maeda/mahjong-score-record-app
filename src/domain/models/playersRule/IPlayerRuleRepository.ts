import PlayersRule from './PlayersRule';
import PlayersRuleId from './PlayersRuleId';

export interface IPlayerRuleRepository {
  findAll(): Promise<Iterable<PlayersRule>>;
  findById(id: PlayersRuleId): Promise<PlayersRule | undefined>;
  save(playersRule: PlayersRule): Promise<void>;
  remove(playersRule: PlayersRule): Promise<void>;
}
