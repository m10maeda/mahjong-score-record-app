import { PlayerId } from '../player';
import { PlayerCount } from '../playersRule';

type Key = ReturnType<PlayerId['toString']>;

export default class EntryPlayers implements Iterable<PlayerId> {
  private readonly ids: Map<Key, PlayerId>;

  public get count(): PlayerCount {
    return new PlayerCount(this.ids.size);
  }

  public [Symbol.iterator](): Iterator<PlayerId> {
    return this.ids.values();
  }

  public equals(other: EntryPlayers): boolean {
    return this.count.equals(other.count) && this.containsAll(other);
  }

  public contains(id: PlayerId): boolean {
    return this.ids.has(id.toString());
  }

  public containsAll(ids: Iterable<PlayerId>): boolean {
    return Array.from(ids).every((id) => this.contains(id));
  }

  public exclude(ids: Iterable<PlayerId>): EntryPlayers {
    const excluded = Array.from(this).filter(
      (id) => Array.from(ids).find((_id) => _id.equals(id)) === undefined,
    );
    return new EntryPlayers(excluded);
  }

  public add(id: PlayerId): EntryPlayers {
    return new EntryPlayers([...Array.from(this), id]);
  }

  public remove(id: PlayerId): EntryPlayers {
    return new EntryPlayers(Array.from(this).filter((_id) => !_id.equals(id)));
  }

  public change(from: PlayerId, to: PlayerId): EntryPlayers {
    if (!this.canChange(from, to)) {
      return new EntryPlayers(this);
    }

    return this.remove(from).add(to);
  }

  private canChange(from: PlayerId, to: PlayerId): boolean {
    return this.contains(from) && !this.contains(to);
  }

  public constructor(values: Iterable<PlayerId>) {
    this.ids = new Map(Array.from(values).map((id) => [id.toString(), id]));
  }
}
