const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemonDetails(name: string) {
    return fetch(`${API_URL}/${name}`);
}