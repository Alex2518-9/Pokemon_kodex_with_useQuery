import Image from 'next/image'
import Link from 'next/link'
import { type } from 'os'
import React from 'react'
import styles from '../styles/PokemonCards.module.css'


interface pageProps{
    index: number,
    name: string,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    type: string
    
}



const PokemonCards = ({index, name, onClick, type}: pageProps) => {

    const pokeIndex = ('000' + (index +1)).slice(-3)

  return (
    <Link href={`/api/pokemon/${name}`}>
      <div className={styles.Card} onClick={onClick}>
        <span className={styles.Card_id}>#{pokeIndex}</span>
        <Image
          className={styles.Card_image}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`}
          alt={name}
          width={550}
          height={300}
        />
        <h1 className={styles.Card_name}>{name}</h1>
        <span className={styles.Card_details}>
            {type}
          {/* {result.results.types.map((poke: PokemonProps) => poke.type.name).join(", ")} */}
        </span>
      </div>
    </Link>
  );
}

export default PokemonCards