import PlayerId from './PlayerId';
import PlayerName from './PlayerName';

export default class Player {
  public readonly id: PlayerId;

  private _name: PlayerName;

  public get name(): PlayerName {
    return this._name;
  }

  public equals(other: Player): boolean {
    return this.id.equals(other.id);
  }

  public renameTo(name: PlayerName): void {
    this._name = name;
  }

  public constructor(id: PlayerId, name: PlayerName) {
    this.id = id;
    this._name = name;
  }
}
