import { EntryPlayers } from '../entryPlayerList';
import { PlayerId } from '../player';
import { ChipCount } from '../score';
import ChipScoreTable from './ChipScoreTable';
import ChipScoreTableId from './ChipScoreTableId';
import ChipScoreTableSpecification from './ChipScoreTableSpecification';
import PlayerChipScore from './PlayerChipScore';
import PlayerChipScores from './PlayerChipScores';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test('合計チップ枚数が 0 にならない場合', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new ChipScoreTable(
        new ChipScoreTableId('0'),
        new PlayerChipScores([
          new PlayerChipScore(new PlayerId('0'), new ChipCount(10)),
          new PlayerChipScore(new PlayerId('1'), new ChipCount(0)),
          new PlayerChipScore(new PlayerId('2'), new ChipCount(0)),
          new PlayerChipScore(new PlayerId('3'), new ChipCount(0)),
        ]),
        new ChipScoreTableSpecification(
          new EntryPlayers([
            new PlayerId('0'),
            new PlayerId('1'),
            new PlayerId('2'),
            new PlayerId('3'),
          ]),
        ),
      );
    }).toThrowError();
  });

  test('仕様を満たしていない場合', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new ChipScoreTable(
        new ChipScoreTableId('0'),
        new PlayerChipScores([
          new PlayerChipScore(new PlayerId('0'), new ChipCount(0)),
          new PlayerChipScore(new PlayerId('1'), new ChipCount(0)),
          new PlayerChipScore(new PlayerId('2'), new ChipCount(0)),
          new PlayerChipScore(new PlayerId('3'), new ChipCount(0)),
        ]),
        new ChipScoreTableSpecification(
          new EntryPlayers([
            new PlayerId('10'),
            new PlayerId('11'),
            new PlayerId('12'),
            new PlayerId('13'),
          ]),
        ),
      );
    }).toThrowError();
  });
});

describe('equals メソッドが正しく比較する', () => {
  const table = new ChipScoreTable(
    new ChipScoreTableId('0'),
    new PlayerChipScores([
      new PlayerChipScore(new PlayerId('0'), new ChipCount(0)),
      new PlayerChipScore(new PlayerId('1'), new ChipCount(0)),
      new PlayerChipScore(new PlayerId('2'), new ChipCount(0)),
      new PlayerChipScore(new PlayerId('3'), new ChipCount(0)),
    ]),
    new ChipScoreTableSpecification(
      new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
        new PlayerId('3'),
      ]),
    ),
  );

  test('ID が同一の場合、true を返す', () => {
    const other = new ChipScoreTable(
      new ChipScoreTableId('0'),
      new PlayerChipScores([
        new PlayerChipScore(new PlayerId('10'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('11'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('12'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('13'), new ChipCount(0)),
      ]),
      new ChipScoreTableSpecification(
        new EntryPlayers([
          new PlayerId('10'),
          new PlayerId('11'),
          new PlayerId('12'),
          new PlayerId('13'),
        ]),
      ),
    );

    expect(table.equals(other)).toBe(true);
  });

  test('ID が同一ではない場合、false を返す', () => {
    const other = new ChipScoreTable(
      new ChipScoreTableId('1'),
      new PlayerChipScores([
        new PlayerChipScore(new PlayerId('0'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('1'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('2'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('3'), new ChipCount(0)),
      ]),
      new ChipScoreTableSpecification(
        new EntryPlayers([
          new PlayerId('0'),
          new PlayerId('1'),
          new PlayerId('2'),
          new PlayerId('3'),
        ]),
      ),
    );

    expect(table.equals(other)).toBe(false);
  });
});
