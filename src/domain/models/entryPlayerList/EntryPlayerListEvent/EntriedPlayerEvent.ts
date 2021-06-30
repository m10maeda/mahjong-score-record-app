import { PlayerId } from '../../player';
import EntryPlayerListId from '../EntryPlayerListId';
import EntryPlayerListEvent from './EntryPlayerListEvent';

export default class EntriedPlayerEvent extends EntryPlayerListEvent {
  public readonly entriedPlayerId: PlayerId;

  public constructor(id: EntryPlayerListId, entriedPlayerId: PlayerId) {
    super(id);

    this.entriedPlayerId = entriedPlayerId;
  }
}
