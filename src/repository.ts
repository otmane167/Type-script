import type { Wizard, NewWizard, Spell } from "./types";
import { ValidateSpellPower } from "./decorators";

interface HasId {
  id: number;
}

export class Repository<T extends HasId> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

export class SpellRepository extends Repository<Spell> {
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}

export class WizardRepository {
  private wizards: Wizard[] = [];
  private nextId = 1;

  getAll(): Wizard[] {
    return this.wizards;
  }

  public register(data: NewWizard): Wizard {
    const wizard: Wizard = { ...data, id: this.nextId };
    this.wizards.push(wizard);
    this.nextId++;
    return wizard;
  }

  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.wizards.filter(wizard => wizard.house === house);
  }
}