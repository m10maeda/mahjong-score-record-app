import { PlayerId } from '../../player';
import EntryPlayerListId from '../EntryPlayerListId';
import EntryPlayerListEvent from './EntryPlayerListEvent';

export default class ChangedPlayerEvent extends EntryPlayerListEvent {
  public readonly entriedPlayerId: PlayerId;

  public readonly removedPlayerId: PlayerId;

  public constructor(
    id: EntryPlayerListId,
    entriedPlayerId: PlayerId,
    removedPlayerId: PlayerId,
  ) {
    super(id);

    this.entriedPlayerId = entriedPlayerId;
    this.removedPlayerId = removedPlayerId;
  }
}
