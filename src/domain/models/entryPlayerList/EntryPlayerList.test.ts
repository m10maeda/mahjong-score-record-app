import { Player, PlayerId, PlayerName } from '../player';
import { PlayerCount } from '../playersRule';
import EntryPlayerList from './EntryPlayerList';
import { EntryPlayerListEventPublisher } from './EntryPlayerListEvent';
import EntryPlayerListId from './EntryPlayerListId';
import EntryPlayerListMinSpecification from './EntryPlayerListMinSpecification';
import EntryPlayers from './EntryPlayers';
import RemovableEntryPlayerSpecification from './RemovableEntryPlayerSpecification';
import ScoredPlayers from './ScoredPlayers';

test('count プロパティが期待した値を返す', () => {
  const id = new EntryPlayerListId('0');
  const players = new EntryPlayers([
    new PlayerId('0'),
    new PlayerId('1'),
    new PlayerId('2'),
    new PlayerId('3'),
  ]);
  const minSpec = EntryPlayerListMinSpecification.ThreePlayers;
  const publisher = new EntryPlayerListEventPublisher();
  const entryPlayerList = new EntryPlayerList(id, players, minSpec, publisher);

  const actual = entryPlayerList.count.equals(players.count);

  expect(actual).toBe(true);
});

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test('プレイ人数ルールに満たないプレイヤーで生成する場合', () => {
    expect(() => {
      const id = new EntryPlayerListId('0');
      const players = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
      ]);
      const minSpec = EntryPlayerListMinSpecification.FourPlayers;
      const publisher = new EntryPlayerListEventPublisher();

      // eslint-disable-next-line no-new
      new EntryPlayerList(id, players, minSpec, publisher);
    }).toThrowError();
  });
});

describe('equals メソッドが正しく比較する', () => {
  const id = new EntryPlayerListId('0');
  const players = new EntryPlayers([
    new PlayerId('0'),
    new PlayerId('1'),
    new PlayerId('2'),
    new PlayerId('3'),
  ]);
  const minSpec = EntryPlayerListMinSpecification.FourPlayers;
  const publisher = new EntryPlayerListEventPublisher();

  const entryPlayerList = new EntryPlayerList(id, players, minSpec, publisher);

  test('ID が同一の場合、true を返す', () => {
    const otherId = new EntryPlayerListId('0');
    const otherPlayers = new EntryPlayers([
      new PlayerId('10'),
      new PlayerId('11'),
      new PlayerId('12'),
      new PlayerId('13'),
    ]);
    const otherMinSpec = EntryPlayerListMinSpecification.FourPlayers;
    const other = new EntryPlayerList(
      otherId,
      otherPlayers,
      otherMinSpec,
      publisher,
    );

    expect(id.equals(otherId)).toBe(true);
    expect(entryPlayerList.equals(other)).toBe(true);
  });

  test('ID が同一ではない場合、false を返す', () => {
    const otherId = new EntryPlayerListId('1');
    const otherPlayers = new EntryPlayers([
      new PlayerId('0'),
      new PlayerId('1'),
      new PlayerId('2'),
      new PlayerId('3'),
    ]);
    const otherMinSpec = EntryPlayerListMinSpecification.FourPlayers;
    const other = new EntryPlayerList(
      otherId,
      otherPlayers,
      otherMinSpec,
      publisher,
    );

    expect(id.equals(otherId)).toBe(false);
    expect(entryPlayerList.equals(other)).toBe(false);
  });
});

describe('contains メソッド', () => {
  const id = new EntryPlayerListId('0');
  const players = new EntryPlayers([
    new PlayerId('0'),
    new PlayerId('1'),
    new PlayerId('2'),
    new PlayerId('3'),
  ]);
  const minSpec = EntryPlayerListMinSpecification.FourPlayers;
  const publisher = new EntryPlayerListEventPublisher();

  const entryPlayerList = new EntryPlayerList(id, players, minSpec, publisher);

  test('対象の要素を保持している場合、true を返す', () => {
    const target = new Player(new PlayerId('0'), new PlayerName('Alice'));

    expect(entryPlayerList.contains(target)).toBe(true);
  });

  test('対象の要素を保持していない場合、false を返す', () => {
    const target = new Player(new PlayerId('unknown'), new PlayerName('Alice'));

    expect(entryPlayerList.contains(target)).toBe(false);
  });
});

describe('containsAll メソッド', () => {
  const id = new EntryPlayerListId('0');
  const players = new EntryPlayers([
    new PlayerId('0'),
    new PlayerId('1'),
    new PlayerId('2'),
    new PlayerId('3'),
  ]);
  const minSpec = EntryPlayerListMinSpecification.FourPlayers;
  const publisher = new EntryPlayerListEventPublisher();

  const entryPlayerList = new EntryPlayerList(id, players, minSpec, publisher);

  test('対象の要素をすべて保持している場合、true を返す', () => {
    const targets = [
      new Player(new PlayerId('0'), new PlayerName('Alice')),
      new Player(new PlayerId('1'), new PlayerName('Bob')),
    ];

    expect(entryPlayerList.containsAll(targets)).toBe(true);
  });

  test('対象の要素をひとつでも保持していない場合、false を返す', () => {
    const targets = [
      new Player(new PlayerId('0'), new PlayerName('Alice')),
      new Player(new PlayerId('unknown'), new PlayerName('Bob')),
    ];

    expect(entryPlayerList.containsAll(targets)).toBe(false);
  });
});

test('add メソッドが指定した要素を追加している', () => {
  const id = new EntryPlayerListId('0');
  const values = [
    new PlayerId('0'),
    new PlayerId('1'),
    new PlayerId('2'),
    new PlayerId('3'),
  ];
  const players = new EntryPlayers(values);
  const minSpec = EntryPlayerListMinSpecification.FourPlayers;
  const publisher = new EntryPlayerListEventPublisher();

  const entryPlayerList = new EntryPlayerList(id, players, minSpec, publisher);

  const target = new Player(new PlayerId('4'), new PlayerName('Ellen'));
  entryPlayerList.add(target);

  expect(entryPlayerList.count.equals(new PlayerCount(values.length + 1))).toBe(
    true,
  );
  expect(entryPlayerList.contains(target)).toBe(true);
});

describe('remove メソッド', () => {
  const id = new EntryPlayerListId('0');

  test('仕様を満たす場合、指定した要素を削除している', () => {
    const values = [
      new PlayerId('0'),
      new PlayerId('1'),
      new PlayerId('2'),
      new PlayerId('3'),
      new PlayerId('4'),
    ];
    const players = new EntryPlayers(values);
    const minSpec = EntryPlayerListMinSpecification.FourPlayers;
    const removableSpec = new RemovableEntryPlayerSpecification(
      new ScoredPlayers([]),
    );
    const publisher = new EntryPlayerListEventPublisher();

    const entryPlayerList = new EntryPlayerList(
      id,
      players,
      minSpec,
      publisher,
    );

    const target = new Player(new PlayerId('1'), new PlayerName('Bob'));
    entryPlayerList.remove(target, removableSpec);

    expect(
      entryPlayerList.count.equals(new PlayerCount(values.length - 1)),
    ).toBe(true);
    expect(entryPlayerList.contains(target)).toBe(false);
  });

  describe('仕様を満たさない場合、エラーを投げて更新されない', () => {
    const minSpec = EntryPlayerListMinSpecification.FourPlayers;
    const publisher = new EntryPlayerListEventPublisher();

    test('削除すると最小人数を下回る場合', () => {
      const players = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
        new PlayerId('3'),
      ]);
      const removableSpec = new RemovableEntryPlayerSpecification(
        new ScoredPlayers([]),
      );

      const entryPlayerList = new EntryPlayerList(
        id,
        players,
        minSpec,
        publisher,
      );

      const target = new Player(new PlayerId('1'), new PlayerName('Bob'));

      expect(() => {
        entryPlayerList.remove(target, removableSpec);
      }).toThrowError();
    });

    test('成績を保持しているプレイヤーを削除しようとしている場合', () => {
      const players = new EntryPlayers([
        new PlayerId('0'),
        new PlayerId('1'),
        new PlayerId('2'),
        new PlayerId('3'),
        new PlayerId('4'),
      ]);
      const removableSpec = new RemovableEntryPlayerSpecification(
        new ScoredPlayers(players),
      );

      const entryPlayerList = new EntryPlayerList(
        id,
        players,
        minSpec,
        publisher,
      );

      const target = new Player(new PlayerId('1'), new PlayerName('Bob'));

      expect(() => {
        entryPlayerList.remove(target, removableSpec);
      }).toThrowError();
    });
  });
});

describe('change メソッド', () => {
  const id = new EntryPlayerListId('0');
  const values = [
    new PlayerId('0'),
    new PlayerId('1'),
    new PlayerId('2'),
    new PlayerId('3'),
  ];
  const players = new EntryPlayers(values);
  const minSpec = EntryPlayerListMinSpecification.FourPlayers;
  const publisher = new EntryPlayerListEventPublisher();

  test('入れ替え対象の要素を保持している場合、入れ替え対象の要素を入れ替える', () => {
    const entryPlayerList = new EntryPlayerList(
      id,
      players,
      minSpec,
      publisher,
    );
    const from = new Player(new PlayerId('1'), new PlayerName('Bob'));
    const to = new Player(new PlayerId('4'), new PlayerName('Ellen'));

    entryPlayerList.change(from, to);

    expect(entryPlayerList.count.equals(new PlayerCount(values.length))).toBe(
      true,
    );
    expect(entryPlayerList.contains(from)).toBe(false);
    expect(entryPlayerList.contains(to)).toBe(true);
  });

  test('入れ替え対象の要素を保持していない場合、変更が起きない', () => {
    const entryPlayerList = new EntryPlayerList(
      id,
      players,
      minSpec,
      publisher,
    );
    const from = new Player(new PlayerId('unknwon'), new PlayerName('Alice'));
    const to = new Player(new PlayerId('4'), new PlayerName('Ellen'));

    entryPlayerList.change(from, to);

    expect(entryPlayerList.count.equals(new PlayerCount(values.length))).toBe(
      true,
    );
    expect(entryPlayerList.contains(from)).toBe(false);
    expect(entryPlayerList.contains(to)).toBe(false);
  });
});
