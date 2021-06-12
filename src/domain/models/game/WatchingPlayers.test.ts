import { PlayerCount, PlayerId } from '../player';
import WatchingPlayers from './WatchingPlayers';

describe('期待した値を保持したモデルを生成する', () => {
  describe('重複する要素が存在しない値で生成した場合', () => {
    const values = [new PlayerId('0'), new PlayerId('1')];
    const players = new WatchingPlayers(values);

    test('受け取ったすべての要素を保持する', () => {
      const actual = Array.from(players);
      const expected = Array.from(values);

      expect(actual).toEqual(expected);
    });

    test('保持しているアイテム数を取得できる', () => {
      const actual = players.count;
      const expected = new PlayerCount(values.length);

      expect(actual.equals(expected)).toBeTruthy();
    });
  });

  describe('重複する要素が存在する値で生成した場合', () => {
    const values = [new PlayerId('0'), new PlayerId('1'), new PlayerId('0')];
    const ids = new WatchingPlayers(values);

    test('前方にある重複した要素を除外したすべての要素を保持する', () => {
      const actual = Array.from(ids);
      const expected = [new PlayerId('0'), new PlayerId('1')];

      expect(actual).toEqual(expected);
    });
  });
});

describe('contains メソッド', () => {
  const players = new WatchingPlayers([new PlayerId('0'), new PlayerId('1')]);

  test('対象の要素を保持している場合、true を返す', () => {
    const target = new PlayerId('0');

    expect(players.contains(target)).toBe(true);
  });

  test('対象の要素を保持していない場合、false を返す', () => {
    const target = new PlayerId('unknown');

    expect(players.contains(target)).toBe(false);
  });
});

describe('containsAll メソッド', () => {
  const players = new WatchingPlayers([
    new PlayerId('0'),
    new PlayerId('1'),
    new PlayerId('2'),
  ]);

  test('対象の要素をすべて保持している場合、true を返す', () => {
    const targets = [new PlayerId('1'), new PlayerId('2')];

    expect(players.containsAll(targets)).toBe(true);
  });

  test('対象の要素をひとつでも保持していない場合、false を返す', () => {
    const targets = [
      new PlayerId('0'),
      new PlayerId('1'),
      new PlayerId('2'),
      new PlayerId('unknown'),
    ];

    expect(players.containsAll(targets)).toBe(false);
  });
});

describe('add メソッド', () => {
  describe('追加対象の要素を保持していない場合', () => {
    const players = new WatchingPlayers([new PlayerId('0'), new PlayerId('1')]);
    const target = new PlayerId('2');

    const newPlayers = players.add(target);

    test('追加対象の要素を追加した新しいオブジェクトを返す', () => {
      const actual = Array.from(newPlayers);
      const expected = [
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
      ];

      expect(actual).toEqual(expected);
    });

    test('既存オブジェクトには変更はない', () => {
      const actual = Array.from(players);
      const expected = [new PlayerId('0'), new PlayerId('1')];

      expect(actual).toEqual(expected);
    });
  });

  describe('追加対象の要素を保持している場合', () => {
    const players = new WatchingPlayers([new PlayerId('0'), new PlayerId('1')]);
    const target = new PlayerId('1');

    const newPlayers = players.add(target);

    test('既存オブジェクトと同じオブジェクトを返す', () => {
      const actual = Array.from(newPlayers);
      const expected = [new PlayerId('0'), new PlayerId('1')];

      expect(actual).toEqual(expected);
    });

    test('既存オブジェクトには変更はない', () => {
      const actual = Array.from(players);
      const expected = [new PlayerId('0'), new PlayerId('1')];

      expect(actual).toEqual(expected);
    });
  });
});

describe('remove メソッド', () => {
  describe('削除対象の要素を保持している場合', () => {
    const players = new WatchingPlayers([new PlayerId('0'), new PlayerId('1')]);
    const target = new PlayerId('1');

    const newPlayers = players.remove(target);

    test('削除対象の要素を削除した新しいオブジェクトを返す', () => {
      const actual = Array.from(newPlayers);
      const expected = [new PlayerId('0')];

      expect(actual).toEqual(expected);
    });

    test('既存オブジェクトには変更はない', () => {
      const actual = Array.from(players);
      const expected = [new PlayerId('0'), new PlayerId('1')];

      expect(actual).toEqual(expected);
    });
  });

  describe('削除対象の要素を保持していない場合', () => {
    const players = new WatchingPlayers([new PlayerId('0'), new PlayerId('1')]);
    const target = new PlayerId('2');

    const newPlayers = players.remove(target);

    test('既存オブジェクトと同じオブジェクトを返す', () => {
      const actual = Array.from(newPlayers);
      const expected = [new PlayerId('0'), new PlayerId('1')];

      expect(actual).toEqual(expected);
    });

    test('既存オブジェクトには変更はない', () => {
      const actual = Array.from(players);
      const expected = [new PlayerId('0'), new PlayerId('1')];

      expect(actual).toEqual(expected);
    });
  });
});
