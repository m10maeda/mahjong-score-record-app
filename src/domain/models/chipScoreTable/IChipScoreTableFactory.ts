import { Player } from '../player';
import { PlayersRuleType } from '../playersRule';
import ChipScoreTable from './ChipScoreTable';

export interface IChipScoreTableFactory {
  create(
    players: Iterable<Player>,
    playersRuleType: PlayersRuleType,
  ): Promise<ChipScoreTable>;
}
