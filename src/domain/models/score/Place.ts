type PlaceValue = 1 | 2 | 3 | 4;

export default class Place {
  private readonly value: PlaceValue;

  public toString(): string {
    return this.value.toString();
  }

  public toNumber(): number {
    return this.value;
  }

  public equals(other: Place): boolean {
    return this.value === other.value;
  }

  public compareTo(other: Place): number {
    return other.value - this.value;
  }

  private constructor(value: PlaceValue) {
    this.value = value;
  }

  public static readonly First = new Place(1);

  public static readonly Second = new Place(2);

  public static readonly Third = new Place(3);

  public static readonly Fourth = new Place(4);

  public static valueOf(value: number): Place {
    if (value === 1 || value === 2 || value === 3 || value === 4) {
      return new Place(value);
    }

    throw new RangeError(`Value(${value}) must be 1, 2, 3 or 4`);
  }
}
