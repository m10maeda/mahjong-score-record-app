import EntryPlayerListId from '../EntryPlayerListId';

export default abstract class EntryPlayerListEvent {
  public readonly id: EntryPlayerListId;

  public constructor(id: EntryPlayerListId) {
    this.id = id;
  }
}
