import { PlayerId } from '../../player';
import EntryPlayerListId from '../EntryPlayerListId';
import EntryPlayerListEvent from './EntryPlayerListEvent';

export default class RemovedPlayerEvent extends EntryPlayerListEvent {
  public readonly removedPlayerId: PlayerId;

  public constructor(id: EntryPlayerListId, removedPlayerId: PlayerId) {
    super(id);

    this.removedPlayerId = removedPlayerId;
  }
}
