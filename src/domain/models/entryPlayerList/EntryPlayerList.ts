import { Player, PlayerCount, PlayerId } from '../player';
import {
  ChangedPlayerEvent,
  EntriedPlayerEvent,
  EntryPlayerListEventPublisher,
  RemovedPlayerEvent,
} from './EntryPlayerListEvent';
import EntryPlayerListId from './EntryPlayerListId';
import EntryPlayerListMinSpecification from './EntryPlayerListMinSpecification';
import EntryPlayers from './EntryPlayers';

export default class EntryPlayerList implements Iterable<PlayerId> {
  public readonly id: EntryPlayerListId;

  private players: EntryPlayers;

  private readonly publisher: EntryPlayerListEventPublisher;

  public get count(): PlayerCount {
    return this.players.count;
  }

  public equals(other: EntryPlayerList): boolean {
    return this.id.equals(other.id);
  }

  public [Symbol.iterator](): Iterator<PlayerId> {
    return this.players[Symbol.iterator]();
  }

  public contains(player: Player): boolean {
    return this.players.contains(player.id);
  }

  public containsAll(players: Iterable<Player>): boolean {
    return this.players.containsAll(
      Array.from(players).map((player) => player.id),
    );
  }

  public exclude(playerIds: Iterable<PlayerId>): Iterable<PlayerId> {
    return this.players.exclude(playerIds);
  }

  public add(player: Player): void {
    this.players = this.players.add(player.id);

    this.publisher.publish(new EntriedPlayerEvent(this.id, player.id));
  }

  public remove(
    player: Player,
    minSpec: EntryPlayerListMinSpecification,
  ): void {
    const newPlayers = this.players.remove(player.id);
    if (!minSpec.isSatisfiedBy(newPlayers)) {
      throw new RangeError(
        'Players must satisfies EntryPlayerListMinSpecification',
      );
    }

    this.players = newPlayers;

    this.publisher.publish(new RemovedPlayerEvent(this.id, player.id));
  }

  public change(fromPlayer: Player, toPlayer: Player): void {
    this.players = this.players.change(fromPlayer.id, toPlayer.id);

    this.publisher.publish(
      new ChangedPlayerEvent(this.id, toPlayer.id, fromPlayer.id),
    );
  }

  public constructor(
    id: EntryPlayerListId,
    players: EntryPlayers,
    minSpec: EntryPlayerListMinSpecification,
    publisher: EntryPlayerListEventPublisher,
  ) {
    this.id = id;
    this.players = players;
    this.publisher = publisher;

    if (!minSpec.isSatisfiedBy(players)) {
      throw new RangeError(
        'Players must satisfies EntryPlayerListMinSpecification',
      );
    }
  }
}
