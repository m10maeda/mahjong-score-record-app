import { Player, PlayerId } from '../player';
import { ChipCount } from '../score';
import PlayerChipScore from './PlayerChipScore';

type Key = ReturnType<PlayerChipScore['playerId']['toString']>;

export default class PlayerChipScores implements Iterable<PlayerChipScore> {
  private readonly scores: Map<Key, PlayerChipScore>;

  public get count(): number {
    return this.scores.size;
  }

  public get totalChipCount(): ChipCount {
    return Array.from(this.scores.values())
      .map((score) => score.count)
      .reduce((a, b) => a.add(b));
  }

  public get playerIds(): Iterable<PlayerId> {
    return Array.from(this.scores.values()).map((score) => score.playerId);
  }

  public [Symbol.iterator](): Iterator<PlayerChipScore> {
    return this.scores.values();
  }

  public getBy(player: Player): PlayerChipScore | undefined {
    return this.scores.get(player.id.toString());
  }

  public has(playerId: PlayerId): boolean {
    return this.scores.has(playerId.toString());
  }

  public constructor(scores: Iterable<PlayerChipScore>) {
    const totalChipCount = Array.from(scores)
      .map((score) => score.count)
      .reduce((a, b) => a.add(b));

    if (!totalChipCount.equals(new ChipCount(0))) {
      throw new Error(`ChipCounts must be zero sum.`);
    }

    this.scores = new Map(
      Array.from(scores).map((score) => [score.playerId.toString(), score]),
    );
  }
}
