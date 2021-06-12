import { PlayerId } from '../player';
import { Place, Point } from '../score';
import GameScore from './GameScore';

export default class PlayerGameScore {
  public readonly playerId: PlayerId;

  private readonly score: GameScore;

  public get place(): Place {
    return this.score.place;
  }

  public get point(): Point {
    return this.score.point;
  }

  public equals(other: PlayerGameScore): boolean {
    return this.playerId.equals(other.playerId);
  }

  public compareTo(other: PlayerGameScore): number {
    return this.place.compareTo(other.place);
  }

  public constructor(playerId: PlayerId, score: GameScore) {
    this.playerId = playerId;
    this.score = score;
  }
}
