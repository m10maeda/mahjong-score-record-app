import Place from './Place';

describe('toNumber メソッドが期待した値を返す', () => {
  test.each`
    place           | expected | description
    ${Place.First}  | ${1}     | ${'First'}
    ${Place.Second} | ${2}     | ${'Second'}
    ${Place.Third}  | ${3}     | ${'Third'}
    ${Place.Fourth} | ${4}     | ${'Fourth'}
  `(
    '$description',
    ({ place, expected }: { place: Place; expected: number }) => {
      expect(place.toNumber()).toBe(expected);
    },
  );
});

describe('equals メソッドが正しく比較をする', () => {
  test.each`
    a               | b               | expected | description
    ${Place.First}  | ${Place.First}  | ${true}  | ${'First : First'}
    ${Place.First}  | ${Place.Second} | ${false} | ${'First : Second'}
    ${Place.First}  | ${Place.Third}  | ${false} | ${'First : Third'}
    ${Place.First}  | ${Place.Fourth} | ${false} | ${'First : Fourth'}
    ${Place.Second} | ${Place.First}  | ${false} | ${'Second : First'}
    ${Place.Second} | ${Place.Second} | ${true}  | ${'Second : Second'}
    ${Place.Second} | ${Place.Third}  | ${false} | ${'Second : Third'}
    ${Place.Second} | ${Place.Fourth} | ${false} | ${'Second : Fourth'}
    ${Place.Third}  | ${Place.First}  | ${false} | ${'Third : First'}
    ${Place.Third}  | ${Place.Second} | ${false} | ${'Third : Second'}
    ${Place.Third}  | ${Place.Third}  | ${true}  | ${'Third : Third'}
    ${Place.Third}  | ${Place.Fourth} | ${false} | ${'Third : Fourth'}
    ${Place.Fourth} | ${Place.First}  | ${false} | ${'Fourth : First'}
    ${Place.Fourth} | ${Place.Second} | ${false} | ${'Fourth : Second'}
    ${Place.Fourth} | ${Place.Third}  | ${false} | ${'Fourth : Third'}
    ${Place.Fourth} | ${Place.Fourth} | ${true}  | ${'Fourth : Fourth'}
  `(
    '$description',
    ({ a, b, expected }: { a: Place; b: Place; expected: boolean }) => {
      expect(a.equals(b)).toBe(expected);
    },
  );
});

describe('compareTo メソッドが正しく比較をする', () => {
  describe('比較対象と同じ値の場合、0 を返す', () => {
    test.each`
      a               | b               | description
      ${Place.First}  | ${Place.First}  | ${'First : First'}
      ${Place.Second} | ${Place.Second} | ${'Second : Second'}
      ${Place.Third}  | ${Place.Third}  | ${'Third : Third'}
      ${Place.Fourth} | ${Place.Fourth} | ${'Fourth : Fourth'}
    `('$description', ({ a, b }: { a: Place; b: Place }) => {
      expect(a.compareTo(b)).toBe(0);
    });
  });

  describe('比較対象より大きい場合、0 より大きい数を返す', () => {
    test.each`
      a               | b               | description
      ${Place.First}  | ${Place.Second} | ${'First : Second'}
      ${Place.First}  | ${Place.Third}  | ${'First : Third'}
      ${Place.First}  | ${Place.Fourth} | ${'First : Fourth'}
      ${Place.Second} | ${Place.Third}  | ${'Second : Third'}
      ${Place.Second} | ${Place.Fourth} | ${'Second : Fourth'}
      ${Place.Third}  | ${Place.Fourth} | ${'Third : Fourth'}
    `('$description', ({ a, b }: { a: Place; b: Place }) => {
      expect(a.compareTo(b)).toBeGreaterThan(0);
    });
  });

  describe('比較対象より小さい場合、0 未満の数を返す', () => {
    test.each`
      a               | b               | description
      ${Place.Second} | ${Place.First}  | ${'Second : First'}
      ${Place.Third}  | ${Place.First}  | ${'Third : First'}
      ${Place.Third}  | ${Place.Second} | ${'Third : Second'}
      ${Place.Fourth} | ${Place.First}  | ${'Fourth : First'}
      ${Place.Fourth} | ${Place.Second} | ${'Fourth : Second'}
      ${Place.Fourth} | ${Place.Third}  | ${'Fourth : Third'}
    `('$description', ({ a, b }: { a: Place; b: Place }) => {
      expect(a.compareTo(b)).toBeLessThan(0);
    });
  });
});
