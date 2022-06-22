import './style.css'
import { Pokemon } from './pokemon'
import { PokemonDTO } from './dto/pokemon'

// const app = document.querySelector<HTMLDivElement>('#app')!

const handlePokemons = async (): Promise<PokemonDTO[]> => {
  const request = await fetch('http://localhost:5000', { method: 'GET' })
  return request.json()
}

const pokemons = await handlePokemons()
console.log(pokemons)

const mainContainer = document.getElementById('main-container')

pokemons.forEach((p: PokemonDTO) => {
  const pokemon = new Pokemon(p.name, p.description)
  mainContainer?.appendChild(pokemon.render())
});

