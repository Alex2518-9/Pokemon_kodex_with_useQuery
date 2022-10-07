import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchPokemonDetails } from "./api/getPokemons";
import { Pokemon, PokemonDetails } from "../interfaces/abilities";
import PokemonCards from "../components/PokemonCards";
import axios from "axios";

interface Result {
  name: string;
  url: string;
}
interface allPokemonData {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<allPokemonData>("pokemon", getPokemonData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const getPokemonData = async () =>
  await (await fetch("https://pokeapi.co/api/v2/pokemon?limit=50")).json();

const Home: NextPage = () => {
  const { data, isLoading, isFetching } = useQuery<allPokemonData>(
    "pokemon",
    getPokemonData
  );

  const [pokemon, setPokemon] = useState<allPokemonData | undefined>(data);
  const [details, setDetails] = useState<Pokemon>();
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState<string[]>([]);
  console.log(pokemon);
  if (!pokemon) return null;

  // useEffect(() => {
  //   const getPokemons = async () => {
  //     const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
  //     // setNextUrl(res.data.next);
  //     res.data.results.forEach(async (pokemon: Result) => {
  //       const poke = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
  //       );
  //       setPokemon((p) => [...p, poke.data]);
  //       // setLoading(false);
  //     });
  //   };
  //   getPokemons();
  // }, []);

  const searchedPokemon = [...pokemon.results].filter((data) => {
    return search.length === 0
      ? true
      : search.every((characters: string) =>
          data.name.toLowerCase().includes(characters.toLowerCase())
        );
  });

  const pokemonDetails = async (name: string) => {
    const datas = await fetchPokemonDetails(name);
    const result = await datas.json();
    setDetails(result);
    // console.log(result);
  };

  const onChangePage = async (url: string, next: boolean) => {
    const response = await fetch(url);
    const nextPokemon = await response.json();
    setOffset(next ? offset + 50 : offset - 50);
    setPokemon(nextPokemon);
  };

  //  const getPokemonType = fetchPokemonDetails(pokemon.results.name).then((res) => res.json().then((pok) => pok.forEach(())))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Pokemon kodex</h1>
        <input
          type="text"
          placeholder="Search pokemon..."
          onChange={(e) =>
            setSearch(
              e.target.value.trim() ? e.target.value.trim().split(" ") : []
            )
          }
        />
      </div>
      <div>
        {searchedPokemon.map((poke, index) => (
          <PokemonCards
            onClick={() => pokemonDetails(poke.name)}
            index={index + offset}
            name={poke.name}
            key={index}
            type={""}
          />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <button
          disabled={!pokemon?.previous}
          className={styles.btn}
          onClick={() => onChangePage(pokemon.previous, false)}
        >
          Prev
        </button>
        <button
          disabled={!pokemon?.next}
          className={styles.btn}
          onClick={() => onChangePage(pokemon.next, true)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
