import './style.css'
import { Pokemon } from './pokemon'
import { PokemonDTO } from './dto/pokemon'

const mainContainer = document.getElementById('main-container')

const handlePokemons = async (): Promise<PokemonDTO[]> => {
  const request = await fetch('http://localhost:5000', { method: 'GET' })
  return request.json()
}

const pokemons = await handlePokemons()

pokemons.forEach((p: PokemonDTO) => {
  const pokemon = new Pokemon(p.name, p.description)
  mainContainer?.appendChild(pokemon.render())
});

