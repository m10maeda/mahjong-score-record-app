import { PlayerGameScore } from '.';
import { PlayerId } from '../player';
import { Place, Point } from '../score';
import GameResult from './GameResult';
import GameResultSizeSpecification from './GameResultSizeSpecification';
import GameScore from './GameScore';
import PlayerScoredPoint from './PlayerScoredPoint';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test('合計ポイントが 0 にならない場合', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new GameResult(
        [
          new PlayerScoredPoint(new PlayerId('0'), new Point(40)),
          new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
          new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
          new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
        ],
        GameResultSizeSpecification.FourPlayers,
      );
    }).toThrowError();
  });

  test('プレイ人数ルールと一致しない場合', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new GameResult(
        [
          new PlayerScoredPoint(new PlayerId('0'), new Point(20)),
          new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
          new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
          new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
        ],
        GameResultSizeSpecification.ThreePlayers,
      );
    }).toThrowError();
  });
});

describe('getPlayerGameScoreBy メソッド', () => {
  const result = new GameResult(
    [
      new PlayerScoredPoint(new PlayerId('0'), new Point(20)),
      new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
      new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
      new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
    ],
    GameResultSizeSpecification.FourPlayers,
  );

  test('存在する playerId の場合、期待した値を返す', () => {
    const target = new PlayerId('0');
    const actual = result.getPlayerGameScoreBy(target);

    const expected = new PlayerGameScore(
      new PlayerId('0'),
      new GameScore(Place.First, new Point(20)),
    );

    expect(actual?.playerId.equals(expected.playerId)).toBe(true);
    expect(actual?.place.equals(expected.place)).toBe(true);
    expect(actual?.point.equals(expected.point)).toBe(true);
  });

  test('存在しない playerId の場合、undefined を返す', () => {
    const target = new PlayerId('unexisteng');
    const actual = result.getPlayerGameScoreBy(target);

    expect(actual).toBeUndefined();
  });
});
