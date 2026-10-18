import { WizardRepository, SpellRepository } from "./repository";
import { Cache } from "./decorators";
import type { SpellCastEvent, House, Wizard } from "./types";

// Exercises 1 and 2
const repo = new WizardRepository();
repo.register({ name: "Harry Potter", house: "Gryffindor", level: 5, active: true });
repo.register({ name: "Draco Malfoy", house: "Slytherin", level: 4, active: true });
repo.register({ name: "Hermione Granger", house: "Gryffindor", level: 6, active: true });
console.log(repo.findByHouse("Gryffindor").map(w => w.name));

// Exercise 3
function handleSpellCast(event: SpellCastEvent): void {
  console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}
handleSpellCast({ type: "spell-cast", wizardId: 1, spellName: "Expelliarmus" });

// Exercise 4
const spells = new SpellRepository();
spells.add({ id: 102, name: "Protego", category: "defense", power: 50 });
try {
  spells.add({ id: 103, name: "Invalid Spell", category: "attack", power: -10 });
} catch (e) {
  console.log("Rejected:", (e as Error).message);
}
console.log(spells.getAll().length); 

// Exercise 5
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}
const calculator = new SpellCalculator();
console.log(calculator.calculatePower(10, 3)); 
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));  

const calc2 = new SpellCalculator();
console.log(calc2.calculatePower(10, 3));     

// Exercise 6
const validHouses: readonly House[] = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

function isHouse(value: unknown): value is House {
  return typeof value === "string" && validHouses.some(house => house === value);
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

const validData: unknown = { id: 1, name: "Harry Potter", house: "Gryffindor", level: 5, active: true };
const invalidData: unknown = { id: 2, name: "Viktor", house: "Durmstrang", level: 5, active: true };

console.log(isWizard(validData));   
console.log(isWizard(invalidData)); 

if (isWizard(validData)) {
  console.log(validData.house); 
}