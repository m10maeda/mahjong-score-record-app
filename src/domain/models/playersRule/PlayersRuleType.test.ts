import PlayersRuleType from './PlayersRuleType';

describe('toNumber メソッドが期待した値を返す', () => {
  test.each`
    ruleType                        | expected | description
    ${PlayersRuleType.ThreePlayers} | ${3}     | ${'ThreePlayers'}
    ${PlayersRuleType.FourPlayers}  | ${4}     | ${'FourPlayers'}
  `(
    '$description',
    ({
      ruleType,
      expected,
    }: {
      ruleType: PlayersRuleType;
      expected: number;
    }) => {
      expect(ruleType.toNumber()).toBe(expected);
    },
  );
});
