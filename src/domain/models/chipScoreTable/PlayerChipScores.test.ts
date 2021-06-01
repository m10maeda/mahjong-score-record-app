import { PlayerId } from '../player';
import { ChipCount } from '../score';
import PlayerChipScore from './PlayerChipScore';
import PlayerChipScores from './PlayerChipScores';

describe('不正な値で生成しようとするとエラーを投げる', () => {
  test('合計チップ枚数が 0 にならない場合', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new PlayerChipScores([
        new PlayerChipScore(new PlayerId('0'), new ChipCount(10)),
        new PlayerChipScore(new PlayerId('1'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('2'), new ChipCount(0)),
        new PlayerChipScore(new PlayerId('3'), new ChipCount(0)),
      ]);
    }).toThrowError();
  });
});
