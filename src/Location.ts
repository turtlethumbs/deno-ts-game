import { Player } from "./Player.ts";
import { Enemy } from "./Enemy.ts";
import { Item } from "./Item.ts";

export class Location {
  private name: string;
  private returnLocation: Location | null;

  constructor(name: string, returnLocation: Location | null = null) {
    this.name = name;
    this.returnLocation = returnLocation;
  }

  public getName() {
    return this.name;
  }

  public returnToCrossroads(): string {
    return this.returnLocation ? `Returning to the ${this.returnLocation.getName()}.` : "No return location set.";
  }

  public async explore(player: Player): Promise<void> {
    const encounterChance = Math.random();

    if (this.name === "forest") {
      if (encounterChance < 0.5) { // 50% chance to encounter an enemy
        const enemy = new Enemy("Goblin", 30);
        console.log(`You encountered a ${enemy.name}!`);
        await this.fight(player, enemy);
      } else {
        const foundItem = this.findItem();
        player.addItem(foundItem); // Add the found item to the player's inventory
        console.log(`You found a ${foundItem.name} in the forest!`);
      }
    } else {
      console.log("Nothing special here.");
    }
  }

  private findItem(): Item {
    const items = [new Item("Healing Potion", "healing"), new Item("Mana Potion", "mana"), new Item("Food", "healing")];
    return items[Math.floor(Math.random() * items.length)];
  }

  private async fight(player: Player, enemy: Enemy): Promise<void> {
    while (player.health > 0 && enemy.health > 0) {
      const playerDamage = 10; // Fixed damage for simplicity
      enemy.takeDamage(playerDamage);

      if (enemy.health > 0) {
        const enemyDamage = 5; // Fixed damage for simplicity
        player.takeDamage(enemyDamage);
      }

      // Simulate waiting for player's turn (you can implement a more interactive system)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (player.health > 0) {
      console.log(`You defeated the ${enemy.name}!`);
    } else {
      console.log("You have been defeated...");
    }
  }
}
