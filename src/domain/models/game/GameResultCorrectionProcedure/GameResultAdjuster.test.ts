import { PlayerId } from '../../player';
import { Point } from '../../score';
import PlayerScoredPoint from '../PlayerScoredPoint';
import PlayerScoredPoints from '../PlayerScoredPoints';
import GameResultAdjuster from './GameResultAdjuster';

describe('adjust メソッド', () => {
  describe('調整可能な場合はスコアを補完して返す', () => {
    const adjuster = GameResultAdjuster.FourPlayers;

    test.each`
      values                | expected
      ${[15, 10, -10, -20]} | ${[20, 10, -10, -20]}
      ${[30, 10, -10, -20]} | ${[20, 10, -10, -20]}
      ${[10, 10, -10, -20]} | ${[20, 10, -10, -20]}
      ${[20, 20, -10, -20]} | ${[10, 20, -10, -20]}
    `(
      '$values => $expected',
      ({
        values,
        expected: _expected,
      }: {
        values: number[];
        expected: number[];
      }) => {
        const scores = new PlayerScoredPoints(
          values.map(
            (value, index) =>
              new PlayerScoredPoint(new PlayerId(`${index}`), new Point(value)),
          ),
        );
        const actual = adjuster.adjust(scores);

        const expected = new PlayerScoredPoints(
          _expected.map(
            (value, index) =>
              new PlayerScoredPoint(new PlayerId(`${index}`), new Point(value)),
          ),
        );

        expect(Array.from(actual)).toEqual(Array.from(expected));
      },
    );
  });
});
