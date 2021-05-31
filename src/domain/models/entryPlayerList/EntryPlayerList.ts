import { Player, PlayerCount, PlayerId } from '../player';
import EntryPlayerListId from './EntryPlayerListId';
import EntryPlayerListMinSpecification from './EntryPlayerListMinSpecification';
import EntryPlayers from './EntryPlayers';

export default class EntryPlayerList implements Iterable<PlayerId> {
  public readonly id: EntryPlayerListId;

  private players: EntryPlayers;

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

  public add(player: Player): void {
    this.players = this.players.add(player.id);
  }

  public remove(
    player: Player,
    minSpec: EntryPlayerListMinSpecification,
  ): void {
    const newPlayers = this.players.remove(player.id);
    if (!minSpec.isSatisfiedBy(newPlayers)) {
      throw new RangeError('Players must be reached PlayersRule');
    }

    this.players = newPlayers;
  }

  public change(fromPlayer: Player, toPlayer: Player): void {
    this.players = this.players.change(fromPlayer.id, toPlayer.id);
  }

  public constructor(
    id: EntryPlayerListId,
    players: EntryPlayers,
    minSpec: EntryPlayerListMinSpecification,
  ) {
    this.id = id;
    this.players = players;

    if (!minSpec.isSatisfiedBy(players)) {
      throw new RangeError(
        'Players must be satisfied EntryPlayerListMinSpecification',
      );
    }
  }
}
