import { PlayerId } from '../player';
import { Point } from '../score';
import PlayerScoredPoint from './PlayerScoredPoint';

type Key = ReturnType<PlayerScoredPoint['playerId']['toString']>;

export default class PlayerScoredPoints implements Iterable<PlayerScoredPoint> {
  private readonly scores: Map<Key, PlayerScoredPoint>;

  public get size(): number {
    return this.scores.size;
  }

  public get scoredPlayerIds(): Iterable<PlayerId> {
    return Array.from(this.scores.values()).map((score) => score.playerId);
  }

  public get totalPoint(): Point {
    return Array.from(this.scores.values())
      .map((score) => score.point)
      .reduce((a, b) => a.add(b));
  }

  public [Symbol.iterator](): Iterator<PlayerScoredPoint> {
    return this.scores.values();
  }

  public getBy(playerId: PlayerId): PlayerScoredPoint | undefined {
    return this.scores.get(playerId.toString());
  }

  public constructor(scores: Iterable<PlayerScoredPoint>) {
    this.scores = new Map(
      Array.from(scores).map((score) => [score.playerId.toString(), score]),
    );
  }
}
