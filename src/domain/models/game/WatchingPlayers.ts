import { PlayerCount, PlayerId } from '../player';

type Key = ReturnType<PlayerId['toString']>;

export default class WatchingPlayers implements Iterable<PlayerId> {
  private readonly ids: Map<Key, PlayerId>;

  public get count(): PlayerCount {
    return new PlayerCount(this.ids.size);
  }

  public [Symbol.iterator](): Iterator<PlayerId> {
    return this.ids.values();
  }

  public contains(id: PlayerId): boolean {
    return this.ids.has(id.toString());
  }

  public containsAll(ids: Iterable<PlayerId>): boolean {
    return Array.from(ids).every((id) => this.contains(id));
  }

  public add(id: PlayerId): WatchingPlayers {
    return new WatchingPlayers([...Array.from(this), id]);
  }

  public remove(id: PlayerId): WatchingPlayers {
    return new WatchingPlayers(
      Array.from(this).filter((_id) => !_id.equals(id)),
    );
  }

  public constructor(values: Iterable<PlayerId>) {
    this.ids = new Map(Array.from(values).map((id) => [id.toString(), id]));
  }
}
