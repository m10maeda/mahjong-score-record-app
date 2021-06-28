import { EntryPlayers } from '../entryPlayerList';
import { PlayerId } from '../player';

export default class ChipScoreTableSpecification {
  private readonly entriedPlayers: EntryPlayers;

  public isSatisfiedBy(ids: Iterable<PlayerId>): boolean {
    return this.entriedPlayers.equals(new EntryPlayers(ids));
  }

  public constructor(entriedPlayers: EntryPlayers) {
    this.entriedPlayers = entriedPlayers;
  }
}
