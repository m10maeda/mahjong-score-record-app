import PlayerName from './PlayerName';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test.each`
    value | description
    ${''} | ${'空文字（`""`）'}
  `('$description', ({ value }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new PlayerName(value);
    }).toThrowError();
  });
});

test('toString メソッドが期待した文字列を返す', () => {
  const value = 'Alice';
  const name = new PlayerName(value);

  expect(name.toString()).toBe(value);
});

describe('equals メソッドが正しく比較する', () => {
  test.each`
    a          | b          | expected
    ${'Alice'} | ${'Alice'} | ${true}
    ${'Alice'} | ${'Bob'}   | ${false}
    ${'Bob'}   | ${'Alice'} | ${false}
  `('$a equals $b is $expected', ({ a: _a, b: _b, expected }) => {
    const a = new PlayerName(_a);
    const b = new PlayerName(_b);

    expect(a.equals(b)).toBe(expected);
  });
});
