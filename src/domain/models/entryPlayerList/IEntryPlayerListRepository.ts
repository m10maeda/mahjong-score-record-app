import EntryPlayerList from './EntryPlayerList';
import EntryPlayerListId from './EntryPlayerListId';

export interface IEntryPlayerListRepository {
  findAll(): Promise<Iterable<EntryPlayerList>>;
  findAllByIds(
    ids: Iterable<EntryPlayerListId>,
  ): Promise<Iterable<EntryPlayerList>>;
  findById(id: EntryPlayerListId): Promise<EntryPlayerList | undefined>;
  save(entryPlayerList: EntryPlayerList): Promise<void>;
  saveAll(entryPlayerLists: Iterable<EntryPlayerList>): Promise<void>;
  remove(entryPlayerList: EntryPlayerList): Promise<void>;
}
