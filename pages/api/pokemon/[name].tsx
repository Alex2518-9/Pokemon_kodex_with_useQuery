import React from 'react'
import { fetchPokemonDetails } from '../getPokemons';


export async function getServerSideProps(context: any) {
  const response = await fetchPokemonDetails(context.query.name);
  const onePokemon = await response.json();
  return {
    props: {
      onePokemon
    },
  };
}


const PokemonStats = () => {
  return (
    <div>hello</div>
  )
}

export default PokemonStats