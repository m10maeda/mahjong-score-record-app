import { Place, Point } from '../score';

export default class GameScore {
  public readonly place: Place;

  public readonly point: Point;

  public equals(other: GameScore): boolean {
    return this.place.equals(other.place) && this.point.equals(other.point);
  }

  public compareTo(other: GameScore): number {
    return this.place.compareTo(other.place);
  }

  public constructor(place: Place, point: Point) {
    this.place = place;
    this.point = point;
  }
}
