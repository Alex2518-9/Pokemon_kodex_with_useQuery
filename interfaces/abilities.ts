export interface Abilities{
    
    abilities:[
        {
            ability: {
                name: string
            },
            is_hidden: boolean,
            slot: number
        }
    ]
}

export interface Sprites{
    front_default: string
}

export interface Stats{
    stats: [
        {
            base_stat: number,
            effort: number,
            stat:{
                name: string,
                url: string
            }
        }
    ]
}

export interface Types{
   types:[
    {
        slot: number,
        type:{
            name:string,
            url: string
        }
    }
   ]
}

export interface Pokemon{
    abilities: Abilities,
    sprites: Sprites,
    stats: Stats,
    types: Types,
    weight: number
}

export interface PokemonDetails {
    id: number,
    name: string,
    sprites: {
        front_default: string
    }
}