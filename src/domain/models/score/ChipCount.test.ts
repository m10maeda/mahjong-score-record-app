import ChipCount from './ChipCount';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test.each`
    value       | description
    ${0.1}      | ${'正の少数'}
    ${-0.1}     | ${'負の少数'}
    ${Infinity} | ${'Infinity'}
    ${NaN}      | ${'NaN'}
  `('$description', ({ value }: { value: number }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new ChipCount(value);
    }).toThrowError();
  });
});

describe('toNumber メソッドが期待した値を返す', () => {
  test.each`
    value   | expected | description
    ${0}    | ${0}     | ${'0'}
    ${-0}   | ${0}     | ${'-0'}
    ${1}    | ${1}     | ${'正の整数'}
    ${-1}   | ${-1}    | ${'負の整数'}
    ${1e1}  | ${10}    | ${'指数表記の正の整数'}
    ${-1e1} | ${-10}   | ${'指数表記の負の整数'}
  `(
    '$description',
    ({ value, expected }: { value: number; expected: number }) => {
      expect(new ChipCount(value).toNumber()).toBe(expected);
    },
  );
});

describe('equals メソッドが正しく比較をする', () => {
  test.each`
    a     | b     | expected
    ${0}  | ${0}  | ${true}
    ${0}  | ${1}  | ${false}
    ${0}  | ${-1} | ${false}
    ${1}  | ${0}  | ${false}
    ${1}  | ${1}  | ${true}
    ${1}  | ${-1} | ${false}
    ${-1} | ${0}  | ${false}
    ${-1} | ${1}  | ${false}
    ${-1} | ${-1} | ${true}
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
      const a = new ChipCount(_a);
      const b = new ChipCount(_b);

      expect(a.equals(b)).toBe(expected);
    },
  );
});

describe('compareTo メソッドが正しく比較をする', () => {
  describe('比較対象と同じ値の場合、0 を返す', () => {
    test.each`
      a     | b
      ${0}  | ${0}
      ${1}  | ${1}
      ${-1} | ${-1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new ChipCount(_a);
      const b = new ChipCount(_b);

      expect(a.compareTo(b)).toBe(0);
    });
  });

  describe('比較対象より大きい場合、0 より大きい数を返す', () => {
    test.each`
      a    | b
      ${0} | ${-1}
      ${1} | ${0}
      ${1} | ${-1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new ChipCount(_a);
      const b = new ChipCount(_b);

      expect(a.compareTo(b)).toBeGreaterThan(0);
    });
  });

  describe('比較対象より小さい場合、0 未満の数を返す', () => {
    test.each`
      a     | b
      ${0}  | ${1}
      ${-1} | ${0}
      ${-1} | ${1}
    `('$a : $b', ({ a: _a, b: _b }: { a: number; b: number }) => {
      const a = new ChipCount(_a);
      const b = new ChipCount(_b);

      expect(a.compareTo(b)).toBeLessThan(0);
    });
  });
});

describe('add メソッドが正しく加算をする', () => {
  test.each`
    a     | b     | expected
    ${0}  | ${0}  | ${0}
    ${0}  | ${1}  | ${1}
    ${0}  | ${-1} | ${-1}
    ${1}  | ${0}  | ${1}
    ${1}  | ${1}  | ${2}
    ${1}  | ${-1} | ${0}
    ${-1} | ${0}  | ${-1}
    ${-1} | ${1}  | ${0}
    ${-1} | ${-1} | ${-2}
  `(
    '$a + $b = $expected',
    ({ a, b, expected }: { a: number; b: number; expected: number }) => {
      const point = new ChipCount(a);
      const addend = new ChipCount(b);
      const result = point.add(addend);

      expect(result.toNumber()).toBe(expected);
    },
  );
});

describe('subtract メソッドが正しく減算をする', () => {
  test.each`
    a     | b     | expected
    ${0}  | ${0}  | ${0}
    ${0}  | ${1}  | ${-1}
    ${0}  | ${-1} | ${1}
    ${1}  | ${0}  | ${1}
    ${1}  | ${1}  | ${0}
    ${1}  | ${-1} | ${2}
    ${-1} | ${0}  | ${-1}
    ${-1} | ${1}  | ${-2}
    ${-1} | ${-1} | ${0}
  `(
    '$a - $b = $expected',
    ({ a, b, expected }: { a: number; b: number; expected: number }) => {
      const point = new ChipCount(a);
      const subtrahend = new ChipCount(b);

      const result = point.subtract(subtrahend);

      expect(result.toNumber()).toBe(expected);
    },
  );
});