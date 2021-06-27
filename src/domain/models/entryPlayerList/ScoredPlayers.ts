import { Player, PlayerId } from '../player';

type Key = ReturnType<PlayerId['toString']>;

export default class ScoredPlayers implements Iterable<PlayerId> {
  private readonly ids: Map<Key, PlayerId>;

  public [Symbol.iterator](): Iterator<PlayerId> {
    return this.ids.values();
  }

  public contains(player: Player): boolean {
    return this.ids.has(player.id.toString());
  }

  public constructor(values: Iterable<PlayerId>) {
    this.ids = new Map(Array.from(values).map((id) => [id.toString(), id]));
  }
}
