import { PlayersRuleType } from '../playersRule';
import EntryPlayerList from './EntryPlayerList';

export interface IEntryPlayerListFactory {
  create(playersRuleType: PlayersRuleType): Promise<EntryPlayerList>;
}
