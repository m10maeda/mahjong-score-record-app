import ChipScoreTable from './ChipScoreTable';
import ChipScoreTableId from './ChipScoreTableId';

export interface IChipScoreTableRepository {
  findAll(): Promise<Iterable<ChipScoreTable>>;
  findAllByIds(
    ids: Iterable<ChipScoreTableId>,
  ): Promise<Iterable<ChipScoreTable>>;
  findById(id: ChipScoreTableId): Promise<ChipScoreTable | undefined>;
  save(chipScoreTable: ChipScoreTable): Promise<void>;
  saveAll(chipScoreTables: Iterable<ChipScoreTable>): Promise<void>;
  remove(chipScoreTable: ChipScoreTable): Promise<void>;
}
