export class Enemy {
    public name: string;
    public health: number;
  
    constructor(name: string, health: number) {
      this.name = name;
      this.health = health;
    }
  
    public takeDamage(amount: number) {
      this.health -= amount;
      console.log(`${this.name} takes ${amount} damage. Remaining health: ${this.health}`);
    }
  }
  