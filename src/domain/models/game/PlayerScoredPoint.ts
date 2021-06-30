import { PlayerId } from '../player';
import { Point } from '../score';

export default class PlayerScoredPoint {
  public readonly playerId: PlayerId;

  public readonly point: Point;

  public equals(other: PlayerScoredPoint): boolean {
    return this.playerId.equals(other.playerId);
  }

  public compareTo(other: PlayerScoredPoint): number {
    return this.point.compareTo(other.point);
  }

  public constructor(playerId: PlayerId, point: Point) {
    this.playerId = playerId;
    this.point = point;
  }
}
