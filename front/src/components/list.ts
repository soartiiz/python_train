import { PokemonDTO } from "../dto/pokemon";
import { IObserver } from "../observer";
import { Pokemon } from "./pokemon";
import { Element } from "./element";

export class List extends Element implements IObserver {
  public id: number = -1
  private pokemons: Pokemon[] = []

  constructor() {
    super(document.createElement('section'))

    this.fetchPokemons().then((pokemons) => {
      pokemons.forEach((p: PokemonDTO) => {
        const pokemon = new Pokemon(p.name, p.description)
        this.pokemons.push(pokemon)
        this.element.appendChild(pokemon.render())
      })
    })
  }

  public update(value: string): void {
    this.handleFilter(value)
  }

  private async fetchPokemons(): Promise<PokemonDTO[]> {
    const request = await fetch('http://localhost:5000', { method: 'GET' })
    return await request.json()
  }

  private removeAllElement() {
    while (this.element.firstChild) { this.element.removeChild(this.element.firstChild); }
  }

  private handleFilter(value: string) {
    const elements = this.pokemons.filter(p => {
      const nameFormatted = p.getName().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      const valueFormatted = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      return nameFormatted.includes(valueFormatted)
    })

    // REMOVE ALL CHILDS OF ELEMENTS
    this.removeAllElement()
    // APPEND NEW CHILDS
    elements.forEach(element => { this.element.appendChild(element.render()) });
  }
}