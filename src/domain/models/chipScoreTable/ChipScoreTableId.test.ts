import ChipScoreTableId from './ChipScoreTableId';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test.each`
    value | description
    ${''} | ${'空文字（`""`）'}
  `('$description', ({ value }: { value: string }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new ChipScoreTableId(value);
    }).toThrowError();
  });
});

test('toString メソッドが期待した文字列を返す', () => {
  const value = '1234567890';
  const id = new ChipScoreTableId(value);

  expect(id.toString()).toBe(value);
});

describe('equals メソッドが正しく比較する', () => {
  test.each`
    a      | b      | expected
    ${'0'} | ${'0'} | ${true}
    ${'0'} | ${'1'} | ${false}
    ${'1'} | ${'0'} | ${false}
  `(
    '$a equals $b is $expected',
    ({
      a: _a,
      b: _b,
      expected,
    }: {
      a: string;
      b: string;
      expected: boolean;
    }) => {
      const a = new ChipScoreTableId(_a);
      const b = new ChipScoreTableId(_b);

      expect(a.equals(b)).toBe(expected);
    },
  );
});
