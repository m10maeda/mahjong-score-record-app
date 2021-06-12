import { PlayerId } from '../player';
import GameResult from './GameResult';
import PlayerGameScore from './PlayerGameScore';
import WatchingPlayers from './WatchingPlayers';

export default class GameDetail {
  private readonly result: GameResult;

  private readonly watchingPlayers: WatchingPlayers;

  public get scoredPlayerIds(): Iterable<PlayerId> {
    return this.result.scoredPlayerIds;
  }

  public get watchingPlayerIds(): Iterable<PlayerId> {
    return this.watchingPlayers;
  }

  public getPlayerGameScoreBy(playerId: PlayerId): PlayerGameScore | undefined {
    return this.result.getPlayerGameScoreBy(playerId);
  }

  public constructor(result: GameResult, watchingPlayers: WatchingPlayers) {
    const { scoredPlayerIds } = result;

    if (
      Array.from(scoredPlayerIds).some((playerId) =>
        watchingPlayers.contains(playerId),
      )
    ) {
      throw new RangeError(
        'Scored player must not contained watching player list.',
      );
    }

    this.result = result;
    this.watchingPlayers = watchingPlayers;
  }
}
