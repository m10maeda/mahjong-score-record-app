import { PlayerId } from '../player';
import GameDetail from './GameDetail';
import GameId from './GameId';
import PlayerGameScore from './PlayerGameScore';

export default class Game {
  public readonly id: GameId;

  private detail: GameDetail;

  public equals(other: Game): boolean {
    return this.id.equals(other.id);
  }

  public get scoredPlayerIds(): Iterable<PlayerId> {
    return this.detail.scoredPlayerIds;
  }

  public get watchingPlayerIds(): Iterable<PlayerId> {
    return this.detail.watchingPlayerIds;
  }

  public getPlayerGameScoreBy(playerId: PlayerId): PlayerGameScore | undefined {
    return this.detail.getPlayerGameScoreBy(playerId);
  }

  public update(detail: GameDetail): void {
    this.detail = detail;
  }

  public constructor(id: GameId, detail: GameDetail) {
    this.id = id;
    this.detail = detail;
  }
}
