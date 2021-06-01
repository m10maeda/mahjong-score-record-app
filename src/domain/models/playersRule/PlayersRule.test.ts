import { PlayerCount } from '../player';
import PlayersRule from './PlayersRule';
import PlayersRuleId from './PlayersRuleId';
import PlayersRuleType from './PlayersRuleType';

describe('equals メソッドが正しく比較する', () => {
  const playersRule = new PlayersRule(
    new PlayersRuleId('0'),
    PlayersRuleType.FourPlayers,
  );

  test('ID が同一の場合、true を返す', () => {
    const other = new PlayersRule(
      new PlayersRuleId('0'),
      PlayersRuleType.ThreePlayers,
    );

    expect(playersRule.equals(other)).toBeTruthy();
  });

  test('ID が同一ではない場合、false を返す', () => {
    const other = new PlayersRule(
      new PlayersRuleId('1'),
      PlayersRuleType.FourPlayers,
    );

    expect(playersRule.equals(other)).toBeFalsy();
  });
});

describe('isSatisfiedBy メソッド', () => {
  const playersRule = new PlayersRule(
    new PlayersRuleId('0'),
    PlayersRuleType.FourPlayers,
  );

  test('ルールより少ない人数の場合、false を返す', () => {
    expect(playersRule.isSatisfiedBy(new PlayerCount(3))).toBe(false);
  });

  test('ルールと同じ人数の場合、true を返す', () => {
    expect(playersRule.isSatisfiedBy(new PlayerCount(4))).toBe(true);
  });

  test('ルールより多い人数の場合、true を返す', () => {
    expect(playersRule.isSatisfiedBy(new PlayerCount(5))).toBe(true);
  });
});

describe('isMatchedBy メソッド', () => {
  const playersRule = new PlayersRule(
    new PlayersRuleId('0'),
    PlayersRuleType.FourPlayers,
  );

  test('ルールより少ない人数の場合、false を返す', () => {
    expect(playersRule.isMatchedBy(new PlayerCount(3))).toBe(false);
  });

  test('ルールと同じ人数の場合、true を返す', () => {
    expect(playersRule.isMatchedBy(new PlayerCount(4))).toBe(true);
  });

  test('ルールより多い人数の場合、false を返す', () => {
    expect(playersRule.isMatchedBy(new PlayerCount(5))).toBe(false);
  });
});
