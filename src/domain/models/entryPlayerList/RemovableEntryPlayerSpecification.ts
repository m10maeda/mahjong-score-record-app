import { Player } from '../player';
import ScoredPlayers from './ScoredPlayers';

export default class RemovableEntryPlayerSpecification {
  private readonly scoredPlayers: ScoredPlayers;

  public isSatisfiedBy(player: Player): boolean {
    return !this.scoredPlayers.contains(player);
  }

  public constructor(scoredPlayers: ScoredPlayers) {
    this.scoredPlayers = scoredPlayers;
  }
}
