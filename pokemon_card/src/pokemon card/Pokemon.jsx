import { useEffect, useState } from 'react'
import './Pokemon.css'
import './media.css'
import { PokemonCards } from './PokemonCards'
export const Pokemon = () =>{
    const [pokemon,setPokemon] = useState([])
    const [loading,setLoagin] = useState(true)
    const [search,setSearch] = useState("")
    const API = "https://pokeapi.co/api/v2/pokemon?limit=800"
    const fetchPokemon = async()=>{
        try {
            const res = await fetch(API)
            const data = await res.json();
            setLoagin(false)
            // console.log(data)
            const detailPokemondata = data.results.map(async(curPokemon)=>{
                const res = await fetch(curPokemon.url)
                const data =  await res.json()
                return data
               
            })
            const detailResponsedat = await Promise.all(detailPokemondata);
            // console.log(detailResponsedat)
            setPokemon(detailResponsedat)

        } catch (error) {
            console.log(error);
            setLoagin(false)
        }
    } 
    useEffect(()=>{
        fetchPokemon()
    },[])
    //search function
    const searchdata = pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLocaleLowerCase()))
    if(loading){
        return(<>
        <div>
            <h1>Loding...</h1>
        </div>
        </>)
     }

    return(<>
    <section className='container'>
            <header>
                <h1>Lets Catch Pokemon</h1>
                <div className="pokemon-search">
                    <input type="text" placeholder='Search Pokemon' value={search} onChange={(e)=>setSearch(e.target.value)} />
                </div>
            </header>
            <ul  className='cards'>
               {
                searchdata.map((poke) =>{
                    return <PokemonCards key ={poke.id} pokemonData = {poke} />
                })
               }
            </ul>
        </section>
    </>)
} 