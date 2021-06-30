import {
  EntryPlayerList,
  EntryPlayerListEventPublisher,
  EntryPlayerListId,
  EntryPlayerListMinSpecification,
  EntryPlayers,
} from '../../entryPlayerList';
import { PlayerId } from '../../player';
import { PlayersRuleType } from '../../playersRule';
import { Point } from '../../score';
import PlayerScoredPoint from '../PlayerScoredPoint';
import PlayerScoredPoints from '../PlayerScoredPoints';
import GameResultComplementer from './GameResultComplementer';

describe('complement メソッド', () => {
  test('補完可能な場合はスコアを補完して返す', () => {
    const players = new EntryPlayers([
      new PlayerId('0'),
      new PlayerId('1'),
      new PlayerId('2'),
      new PlayerId('3'),
    ]);
    const minSpec = EntryPlayerListMinSpecification.FourPlayers;
    const publisher = new EntryPlayerListEventPublisher();
    const entryPlayerList = new EntryPlayerList(
      new EntryPlayerListId('0'),
      players,
      minSpec,
      publisher,
    );
    const complementer = new GameResultComplementer(
      entryPlayerList,
      PlayersRuleType.FourPlayers,
    );

    const scores = new PlayerScoredPoints([
      new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
      new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
      new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
    ]);

    const actual = complementer.complement(scores);
    const expected = new PlayerScoredPoints([
      new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
      new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
      new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
      new PlayerScoredPoint(new PlayerId('0'), new Point(20)),
    ]);

    expect(Array.from(actual)).toEqual(Array.from(expected));
  });

  describe('補完できない場合はスコアをそのまま返す', () => {
    describe('渡されたスコア数が保管できない状態の場合', () => {
      const players = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
        new PlayerId('3'),
      ]);
      const minSpec = EntryPlayerListMinSpecification.FourPlayers;
      const publisher = new EntryPlayerListEventPublisher();
      const entryPlayerList = new EntryPlayerList(
        new EntryPlayerListId('0'),
        players,
        minSpec,
        publisher,
      );

      const complementer = new GameResultComplementer(
        entryPlayerList,
        PlayersRuleType.FourPlayers,
      );

      test('スコア数がプレイ人数ルールと一致している場合', () => {
        const scores = new PlayerScoredPoints([
          new PlayerScoredPoint(new PlayerId('0'), new Point(20)),
          new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
          new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
          new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
        ]);

        const actual = complementer.complement(scores);

        expect(Array.from(actual)).toEqual(Array.from(scores));
      });

      test('スコア数がプレイ人数ルール - 2以上の場合', () => {
        const scores = new PlayerScoredPoints([
          new PlayerScoredPoint(new PlayerId('0'), new Point(20)),
          new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
        ]);

        const actual = complementer.complement(scores);

        expect(Array.from(actual)).toEqual(Array.from(scores));
      });
    });

    test('候補者が多く絞りきれない場合', () => {
      const players = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
        new PlayerId('3'),
        new PlayerId('4'),
      ]);
      const minSpec = EntryPlayerListMinSpecification.FourPlayers;
      const publisher = new EntryPlayerListEventPublisher();
      const entryPlayerList = new EntryPlayerList(
        new EntryPlayerListId('0'),
        players,
        minSpec,
        publisher,
      );
      const complementer = new GameResultComplementer(
        entryPlayerList,
        PlayersRuleType.FourPlayers,
      );

      const scores = new PlayerScoredPoints([
        new PlayerScoredPoint(new PlayerId('1'), new Point(10)),
        new PlayerScoredPoint(new PlayerId('2'), new Point(-10)),
        new PlayerScoredPoint(new PlayerId('3'), new Point(-20)),
      ]);

      const actual = complementer.complement(scores);

      expect(Array.from(actual)).toEqual(Array.from(scores));
    });
  });
});
