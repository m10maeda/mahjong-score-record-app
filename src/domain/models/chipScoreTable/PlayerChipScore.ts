import { PlayerId } from '../player';
import { ChipCount } from '../score';

export default class PlayerChipScore {
  public readonly playerId: PlayerId;

  public readonly count: ChipCount;

  public equals(other: PlayerChipScore): boolean {
    return this.playerId.equals(other.playerId);
  }

  public compareTo(other: PlayerChipScore): number {
    return this.count.compareTo(other.count);
  }

  public constructor(playerId: PlayerId, chipCount: ChipCount) {
    this.playerId = playerId;
    this.count = chipCount;
  }
}
