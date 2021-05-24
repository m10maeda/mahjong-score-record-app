export default class PlayerId {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: PlayerId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') {
      throw new RangeError(`PlayerId must not be empty string.`);
    }

    this.value = value;
  }
}
