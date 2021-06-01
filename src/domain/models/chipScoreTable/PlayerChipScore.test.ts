import { PlayerId } from '../player';
import { ChipCount } from '../score';
import PlayerChipScore from './PlayerChipScore';

describe('equals メソッドが正しく比較する', () => {
  const score = new PlayerChipScore(new PlayerId('0'), new ChipCount(0));

  test('ID が同一の場合、true を返す', () => {
    const other = new PlayerChipScore(new PlayerId('0'), new ChipCount(10));

    expect(score.equals(other)).toBe(true);
  });

  test('ID が同一ではない場合、false を返す', () => {
    const other = new PlayerChipScore(new PlayerId('1'), new ChipCount(0));

    expect(score.equals(other)).toBe(false);
  });
});

describe('compareTo メソッドが正しく比較をする', () => {
  const id = new PlayerId('0');

  describe('チップ枚数が比較対象と同じ値の場合、0 を返す', () => {
    test.each`
      a     | b
      ${0}  | ${0}
      ${1}  | ${1}
      ${-1} | ${-1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new PlayerChipScore(id, new ChipCount(_a));
      const b = new PlayerChipScore(id, new ChipCount(_b));

      expect(a.compareTo(b)).toBe(0);
    });
  });

  describe('チップ枚数が比較対象より大きい場合、0 より大きい数を返す', () => {
    test.each`
      a    | b
      ${0} | ${-1}
      ${1} | ${0}
      ${1} | ${-1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new PlayerChipScore(id, new ChipCount(_a));
      const b = new PlayerChipScore(id, new ChipCount(_b));

      expect(a.compareTo(b)).toBeGreaterThan(0);
    });
  });

  describe('チップ枚数が比較対象より小さい場合、0 未満の数を返す', () => {
    test.each`
      a     | b
      ${0}  | ${1}
      ${-1} | ${0}
      ${-1} | ${1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new PlayerChipScore(id, new ChipCount(_a));
      const b = new PlayerChipScore(id, new ChipCount(_b));

      expect(a.compareTo(b)).toBeLessThan(0);
    });
  });
});
