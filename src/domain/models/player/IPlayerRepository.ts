import Player from './Player';
import PlayerId from './PlayerId';
import PlayerName from './PlayerName';

export interface IPlayerRepository {
  findAll(): Promise<Iterable<Player>>;
  findAllByIds(ids: Iterable<PlayerId>): Promise<Iterable<Player>>;
  findById(id: PlayerId): Promise<Player | undefined>;
  findByName(name: PlayerName): Promise<Player | undefined>;
  save(player: Player): Promise<void>;
  saveAll(players: Iterable<Player>): Promise<void>;
  remove(player: Player): Promise<void>;
}
