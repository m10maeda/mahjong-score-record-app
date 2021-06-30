import Player from './Player';
import PlayerName from './PlayerName';

export interface IPlayerFactory {
  create(name: PlayerName): Promise<Player>;
}
