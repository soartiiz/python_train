import { IObserver } from './observer'
import { PokemonDTO } from './dto/pokemon'
import { Search } from './search'
import { Pokemon } from './pokemon'

export class View implements IObserver {
  private mainContainer: HTMLElement | null
  private pokemons: PokemonDTO[] = []
  public id: number = -1
  private search: Search

  constructor() {
    this.mainContainer = document.getElementById('main-container')
    this.search = new Search(true)
    this.search.subscribe(this)
    this.mainContainer?.appendChild(this.search.render())

    this.fetchPokemons().then((value) => {
      this.pokemons = value

      this.pokemons.forEach((p: PokemonDTO) => {
        const pokemon = new Pokemon(p.name, p.description)
        this.mainContainer?.appendChild(pokemon.render())
      })
    })
  }

  public update(value: string): void {
    console.log(value)
  }

  public getPokemons() {
    return this.pokemons
  }

  public render() {
    return this.mainContainer
  }

  private async fetchPokemons(): Promise<PokemonDTO[]> {
    const request = await fetch('http://localhost:5000', { method: 'GET' })
    return await request.json()
  }
}