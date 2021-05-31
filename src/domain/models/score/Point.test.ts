import Point from './Point';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test.each`
    value       | description
    ${0.12}     | ${'小数点第2位以下の正の数'}
    ${-0.12}    | ${'小数点第2位以下負の数'}
    ${Infinity} | ${'Infinity'}
    ${NaN}      | ${'NaN'}
  `('$description', ({ value }: { value: number }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Point(value);
    }).toThrowError();
  });
});

describe('toNumber メソッドが期待した値を返す', () => {
  test.each`
    value    | expected | description
    ${0}     | ${0}     | ${'0'}
    ${-0}    | ${0}     | ${'-0'}
    ${1}     | ${1}     | ${'正の整数'}
    ${-1}    | ${-1}    | ${'負の整数'}
    ${0.1}   | ${0.1}   | ${'正の少数'}
    ${-0.1}  | ${-0.1}  | ${'負の少数'}
    ${1e1}   | ${10}    | ${'指数表記の正の整数'}
    ${-1e1}  | ${-10}   | ${'指数表記の負の整数'}
    ${1e-1}  | ${0.1}   | ${'指数表記の正の小数'}
    ${-1e-1} | ${-0.1}  | ${'指数表記の負の小数'}
  `(
    '$description',
    ({ value, expected }: { value: number; expected: number }) => {
      expect(new Point(value).toNumber()).toBe(expected);
    },
  );
});

describe('equals メソッドが正しく比較をする', () => {
  test.each`
    a       | b       | expected
    ${0}    | ${0}    | ${true}
    ${0}    | ${1}    | ${false}
    ${0}    | ${-1}   | ${false}
    ${0}    | ${0.1}  | ${false}
    ${0}    | ${-0.1} | ${false}
    ${1}    | ${0}    | ${false}
    ${1}    | ${1}    | ${true}
    ${1}    | ${-1}   | ${false}
    ${1}    | ${0.1}  | ${false}
    ${1}    | ${-0.1} | ${false}
    ${-1}   | ${0}    | ${false}
    ${-1}   | ${1}    | ${false}
    ${-1}   | ${-1}   | ${true}
    ${-1}   | ${0.1}  | ${false}
    ${-1}   | ${-0.1} | ${false}
    ${0.1}  | ${0}    | ${false}
    ${0.1}  | ${1}    | ${false}
    ${0.1}  | ${-1}   | ${false}
    ${0.1}  | ${0.1}  | ${true}
    ${0.1}  | ${-0.1} | ${false}
    ${-0.1} | ${0}    | ${false}
    ${-0.1} | ${1}    | ${false}
    ${-0.1} | ${-1}   | ${false}
    ${-0.1} | ${0.1}  | ${false}
    ${-0.1} | ${-0.1} | ${true}
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
      const a = new Point(_a);
      const b = new Point(_b);

      expect(a.equals(b)).toBe(expected);
    },
  );
});

describe('compareTo メソッドが正しく比較をする', () => {
  describe('比較対象と同じ値の場合、0 を返す', () => {
    test.each`
      a       | b
      ${0}    | ${0}
      ${1}    | ${1}
      ${-1}   | ${-1}
      ${0.1}  | ${0.1}
      ${-0.1} | ${-0.1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new Point(_a);
      const b = new Point(_b);

      expect(a.compareTo(b)).toBe(0);
    });
  });

  describe('比較対象より大きい場合、0 より大きい数を返す', () => {
    test.each`
      a       | b
      ${0}    | ${-1}
      ${0}    | ${-0.1}
      ${1}    | ${0}
      ${1}    | ${-1}
      ${1}    | ${0.1}
      ${1}    | ${-0.1}
      ${0.1}  | ${0}
      ${0.1}  | ${-1}
      ${0.1}  | ${-0.1}
      ${-0.1} | ${-1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new Point(_a);
      const b = new Point(_b);

      expect(a.compareTo(b)).toBeGreaterThan(0);
    });
  });

  describe('比較対象より小さい場合、0 未満の数を返す', () => {
    test.each`
      a       | b
      ${0}    | ${1}
      ${0}    | ${0.1}
      ${-1}   | ${0}
      ${-1}   | ${1}
      ${-1}   | ${0.1}
      ${-1}   | ${-0.1}
      ${0.1}  | ${1}
      ${-0.1} | ${0}
      ${-0.1} | ${1}
      ${-0.1} | ${0.1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new Point(_a);
      const b = new Point(_b);

      expect(a.compareTo(b)).toBeLessThan(0);
    });
  });
});

describe('add メソッドが正しく加算をする', () => {
  test.each`
    a       | b       | expected
    ${0.1}  | ${0.2}  | ${0.3}
    ${0}    | ${0}    | ${0}
    ${0}    | ${1}    | ${1}
    ${0}    | ${-1}   | ${-1}
    ${0}    | ${0.1}  | ${0.1}
    ${0}    | ${-0.1} | ${-0.1}
    ${1}    | ${0}    | ${1}
    ${1}    | ${1}    | ${2}
    ${1}    | ${-1}   | ${0}
    ${1}    | ${0.1}  | ${1.1}
    ${1}    | ${-0.1} | ${0.9}
    ${-1}   | ${0}    | ${-1}
    ${-1}   | ${1}    | ${0}
    ${-1}   | ${-1}   | ${-2}
    ${-1}   | ${0.1}  | ${-0.9}
    ${-1}   | ${-0.1} | ${-1.1}
    ${0.1}  | ${0.1}  | ${0.2}
    ${0.1}  | ${0}    | ${0.1}
    ${0.1}  | ${1}    | ${1.1}
    ${0.1}  | ${-1}   | ${-0.9}
    ${0.1}  | ${0.1}  | ${0.2}
    ${0.1}  | ${-0.1} | ${0}
    ${-0.1} | ${0}    | ${-0.1}
    ${-0.1} | ${1}    | ${0.9}
    ${-0.1} | ${-1}   | ${-1.1}
    ${-0.1} | ${0.1}  | ${0}
    ${-0.1} | ${-0.1} | ${-0.2}
    ${0.5}  | ${0.5}  | ${1}
    ${-0.5} | ${-0.5} | ${-1}
  `(
    '$a + $b = $expected',
    ({ a, b, expected }: { a: number; b: number; expected: number }) => {
      const point = new Point(a);
      const addend = new Point(b);
      const result = point.add(addend);

      expect(result.toNumber()).toBe(expected);
    },
  );
});

describe('subtract メソッドが正しく減算をする', () => {
  test.each`
    a       | b       | expected
    ${0.3}  | ${0.2}  | ${0.1}
    ${0}    | ${0}    | ${0}
    ${0}    | ${1}    | ${-1}
    ${0}    | ${-1}   | ${1}
    ${0}    | ${0.1}  | ${-0.1}
    ${0}    | ${-0.1} | ${0.1}
    ${1}    | ${0}    | ${1}
    ${1}    | ${1}    | ${0}
    ${1}    | ${-1}   | ${2}
    ${1}    | ${0.1}  | ${0.9}
    ${1}    | ${-0.1} | ${1.1}
    ${-1}   | ${0}    | ${-1}
    ${-1}   | ${1}    | ${-2}
    ${-1}   | ${-1}   | ${0}
    ${-1}   | ${0.1}  | ${-1.1}
    ${-1}   | ${-0.1} | ${-0.9}
    ${0.1}  | ${0.1}  | ${0}
    ${0.1}  | ${0}    | ${0.1}
    ${0.1}  | ${1}    | ${-0.9}
    ${0.1}  | ${-1}   | ${1.1}
    ${0.1}  | ${0.1}  | ${0}
    ${0.1}  | ${-0.1} | ${0.2}
    ${-0.1} | ${0}    | ${-0.1}
    ${-0.1} | ${1}    | ${-1.1}
    ${-0.1} | ${-1}   | ${0.9}
    ${-0.1} | ${0.1}  | ${-0.2}
    ${-0.1} | ${-0.1} | ${0}
  `(
    '$a - $b = $expected',
    ({ a, b, expected }: { a: number; b: number; expected: number }) => {
      const point = new Point(a);
      const subtrahend = new Point(b);

      const result = point.subtract(subtrahend);

      expect(result.toNumber()).toBe(expected);
    },
  );
});
