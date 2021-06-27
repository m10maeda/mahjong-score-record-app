import {
  EntryPlayerList,
  EntryPlayerListEventPublisher,
  EntryPlayerListId,
  EntryPlayerListMinSpecification,
  EntryPlayers,
} from '../entryPlayerList';
import { PlayerId } from '../player';
import { PlayersRuleType } from '../playersRule';
import { Place, Point } from '../score';
import GameResult from './GameResult';
import GameResultCorrectionProcedure, {
  GameResultAdjuster,
  GameResultComplementer,
} from './GameResultCorrectionProcedure';
import GameResultSizeSpecification from './GameResultSizeSpecification';
import GameScore from './GameScore';
import PlayerGameScore from './PlayerGameScore';
import PlayerScoredPoint from './PlayerScoredPoint';
import PlayerScoredPoints from './PlayerScoredPoints';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test('プレイ人数ルールと一致しない場合', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new GameResult(
        new PlayerScoredPoints([
          new PlayerScoredPoint(new PlayerId('0'), new Point(20)),
          new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
          new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
          new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
        ]),
        new GameResultCorrectionProcedure(
          new GameResultComplementer(
            new EntryPlayerList(
              new EntryPlayerListId('0'),
              new EntryPlayers([
                new PlayerId('0'),
                new PlayerId('1'),
                new PlayerId('2'),
                new PlayerId('3'),
              ]),
              EntryPlayerListMinSpecification.FourPlayers,
              new EntryPlayerListEventPublisher(),
            ),
            PlayersRuleType.ThreePlayers,
          ),
          GameResultAdjuster.ThreePlayers,
        ),
        GameResultSizeSpecification.ThreePlayers,
      );
    }).toThrowError();
  });
});

describe('getPlayerGameScoreBy メソッド', () => {
  const result = new GameResult(
    new PlayerScoredPoints([
      new PlayerScoredPoint(new PlayerId('0'), new Point(20)),
      new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
      new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
      new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
    ]),
    new GameResultCorrectionProcedure(
      new GameResultComplementer(
        new EntryPlayerList(
          new EntryPlayerListId('0'),
          new EntryPlayers([
            new PlayerId('0'),
            new PlayerId('1'),
            new PlayerId('2'),
            new PlayerId('3'),
          ]),
          EntryPlayerListMinSpecification.FourPlayers,
          new EntryPlayerListEventPublisher(),
        ),
        PlayersRuleType.FourPlayers,
      ),
      GameResultAdjuster.FourPlayers,
    ),
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
