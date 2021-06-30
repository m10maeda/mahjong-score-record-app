import Player from './Player';
import PlayerId from './PlayerId';
import PlayerName from './PlayerName';

describe('equals メソッドが正しく比較する', () => {
  const player = new Player(new PlayerId('0'), new PlayerName('Alice'));

  test('ID が同一の場合、true を返す', () => {
    const other = new Player(new PlayerId('0'), new PlayerName('Bob'));

    expect(player.equals(other)).toBeTruthy();
  });

  test('ID が同一ではない場合、false を返す', () => {
    const other = new Player(new PlayerId('1'), new PlayerName('Alice'));

    expect(player.equals(other)).toBeFalsy();
  });
});

test('renameTo メソッドが指定した名前に置き換える', () => {
  const player = new Player(new PlayerId('0'), new PlayerName('Alice'));
  const newName = new PlayerName('Bob');

  player.renameTo(newName);

  expect(player.name.equals(newName)).toBeTruthy();
});
