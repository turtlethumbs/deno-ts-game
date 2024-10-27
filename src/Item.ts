export class Item {
  public name: string;
  public type: string; // Type of the item (e.g., "healing", "mana")

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}
