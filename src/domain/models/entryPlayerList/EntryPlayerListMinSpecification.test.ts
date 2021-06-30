import { PlayerId } from '../player';
import EntryPlayerListMinSpecification from './EntryPlayerListMinSpecification';
import EntryPlayers from './EntryPlayers';

describe('ThreePlayersRule の場合', () => {
  const spec = EntryPlayerListMinSpecification.ThreePlayers;

  describe('isSatisfiedBy メソッド', () => {
    test('仕様を満たす場合、true を返す', () => {
      const playerIds = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
      ]);

      expect(spec.isSatisfiedBy(playerIds)).toBe(true);
    });

    test('仕様を満たさない場合、false を返す', () => {
      const playerIds = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
      ]);

      expect(spec.isSatisfiedBy(playerIds)).toBe(false);
    });
  });
});

describe('FourPlayersRule の場合', () => {
  const spec = EntryPlayerListMinSpecification.FourPlayers;

  describe('isSatisfiedBy メソッド', () => {
    test('仕様を満たす場合、true を返す', () => {
      const playerIds = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
        new PlayerId('3'),
      ]);

      expect(spec.isSatisfiedBy(playerIds)).toBe(true);
    });

    test('仕様を満たさない場合、false を返す', () => {
      const playerIds = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
      ]);

      expect(spec.isSatisfiedBy(playerIds)).toBe(false);
    });
  });
});
