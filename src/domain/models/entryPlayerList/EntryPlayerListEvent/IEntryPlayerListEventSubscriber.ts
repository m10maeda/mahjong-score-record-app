import EntryPlayerListEvent from './EntryPlayerListEvent';

export interface IEntryPlayerListEventSubscriber {
  handle(event: EntryPlayerListEvent): void;
}
