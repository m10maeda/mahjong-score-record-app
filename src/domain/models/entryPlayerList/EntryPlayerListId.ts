export default class EntryPlayerListId {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: EntryPlayerListId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') {
      throw new RangeError(`EntryPlayerListId must not be empty string.`);
    }

    this.value = value;
  }
}
