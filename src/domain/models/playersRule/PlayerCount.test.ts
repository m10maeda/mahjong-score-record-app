import PlayerCount from './PlayerCount';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test.each`
    value       | description
    ${0.1}      | ${'少数'}
    ${-1}       | ${'負の数'}
    ${Infinity} | ${'Infinity'}
    ${NaN}      | ${'NaN'}
  `('$description', ({ value }: { value: number }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new PlayerCount(value);
    }).toThrowError();
  });
});

describe('toNumber メソッドが期待した値を返す', () => {
  test.each`
    value | expected | description
    ${0}  | ${0}     | ${'0'}
    ${-0} | ${0}     | ${'-0'}
    ${1}  | ${1}     | ${'正の整数'}
  `(
    '$description',
    ({ value, expected }: { value: number; expected: number }) => {
      const count = new PlayerCount(value);
      expect(count.toNumber()).toBe(expected);
    },
  );
});

describe('equals メソッドが正しく比較をする', () => {
  test.each`
    a    | b    | expected
    ${0} | ${0} | ${true}
    ${0} | ${1} | ${false}
    ${1} | ${0} | ${false}
    ${1} | ${1} | ${true}
  `(
    '$a equals $b is $expected',
    ({
      a: _a,
      b: _b,
      expected,
    }: {
      a: number;
      b: number;
      expected: boolean;
    }) => {
      const a = new PlayerCount(_a);
      const b = new PlayerCount(_b);

      expect(a.equals(b)).toBe(expected);
    },
  );
});

describe('compareTo メソッドが正しく比較をする', () => {
  describe('比較対象と同じ値の場合、0 を返す', () => {
    test.each`
      a    | b
      ${0} | ${0}
      ${1} | ${1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new PlayerCount(_a);
      const b = new PlayerCount(_b);

      expect(a.compareTo(b)).toBe(0);
    });
  });

  describe('比較対象より大きい場合、0 より大きい数を返す', () => {
    test.each`
      a    | b
      ${1} | ${0}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new PlayerCount(_a);
      const b = new PlayerCount(_b);

      expect(a.compareTo(b)).toBeGreaterThan(0);
    });
  });

  describe('比較対象より小さい場合、0 未満の数を返す', () => {
    test.each`
      a    | b
      ${0} | ${1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new PlayerCount(_a);
      const b = new PlayerCount(_b);

      expect(a.compareTo(b)).toBeLessThan(0);
    });
  });
});
