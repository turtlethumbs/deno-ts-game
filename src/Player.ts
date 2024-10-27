import { Item } from "./Item.ts";

export class Player {
  public name: string;
  public health: number;
  public inventory: Item[];

  constructor(name: string) {
    this.name = name;
    this.health = 100; // Default health
    this.inventory = []; // Initialize an empty inventory
  }

  public heal(amount: number) {
    this.health += amount;
    this.health = Math.min(100, this.health);
    console.log(`${this.name} heals for ${amount} health. Current health: ${this.health}`);
  }

  public takeDamage(amount: number) {
    this.health -= amount;
    console.log(`${this.name} takes ${amount} damage. Current health: ${this.health}`);
  }

  public checkHealth() {
    console.log(`${this.name}'s current health: ${this.health}`);
  }

  public addItem(item: Item) {
    this.inventory.push(item);
    console.log(`${this.name} has added a ${item.name} to the inventory.`);
  }

  public checkInventory() {
    if (this.inventory.length === 0) {
      console.log("Inventory is empty.");
    } else {
      console.log("Inventory:");
      this.inventory.forEach((item, index) => {
        console.log(`${index + 1}: ${item.name}`);
      });
    }
  }

  public useItem(index: number) {
    if (index < 0 || index >= this.inventory.length) {
      console.log("Invalid item index.");
      return;
    }

    const item = this.inventory[index];
    if (item.type === "healing") {
      this.heal(20); // Heal the player for 20 health
      console.log(`${this.name} used a ${item.name}.`);
      this.inventory.splice(index, 1); // Remove the item from the inventory
    } else {
      console.log(`You cannot use the ${item.name}.`);
    }
  }
}
