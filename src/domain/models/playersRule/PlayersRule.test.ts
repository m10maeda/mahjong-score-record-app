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
