import { PlayerId } from '../player';
import { Point } from '../score';
import PlayerScoredPoint from './PlayerScoredPoint';

describe('compareTo メソッドが正しく比較をする', () => {
  const playerId = new PlayerId('0');
  const base = new PlayerScoredPoint(playerId, new Point(0));

  test('比較対象より大きい場合、0 より大きい数を返す', () => {
    const comparison = new PlayerScoredPoint(playerId, new Point(-10));
    const actual = base.compareTo(comparison);

    expect(actual).toBeGreaterThan(0);
  });

  test('比較対象より小さい場合、0 未満の数を返す', () => {
    const comparison = new PlayerScoredPoint(playerId, new Point(10));
    const actual = base.compareTo(comparison);

    expect(actual).toBeLessThan(0);
  });
});
