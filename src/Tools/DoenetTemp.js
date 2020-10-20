import React, { useState } from "react";
import { ReactQueryDevtools } from 'react-query-devtools'
import ReactDOM from "react-dom";
import axios from "axios";
import {
  useQuery,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

import regeneratorRuntime from "regenerator-runtime";



const queryCache = new QueryCache();

export default function PokemonInfo(){

  const [pokemonId, setPokemonId] = useState(-1)
  
  return (
    <ReactQueryCacheProvider queryCache = {queryCache}>
      <p>Here is a list of pokemons: </p>
      <Pokemons setPokemonId = {setPokemonId}/>
      {pokemonId !== -1 ? <Pokemon pokemonId={pokemonId} setPokemonId={setPokemonId} /> : null}
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  )
}


function usePokemons() {
  return useQuery("pokemons", async () => {
    const data = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
    );
    return data;
  });
}

function Pokemons ({setPokemonId}){
  const { status, data, error, isFetching } = usePokemons();
  return(
    <div>
      {status === "loading" ? "Loading..." : status === "error" ? <span>Error: {error.message}</span> : 
      <ul>
        {data.data["results"].map(pokemon => <li key = {pokemon.name}><a href = "#" onClick = {() => setPokemonId(pokemon.name)}>{pokemon.name}</a></li>)}
      </ul>
      }
    </div>
  )
}

const getPokemonById = async (key, id) => {

  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );
  return data;
};

function usePokemon(pokemonId) {
  return useQuery(["pokemon", pokemonId], getPokemonById);
}

function Pokemon({ pokemonId, setPokemonId }){
  console.log("pokemonId", pokemonId);
  const { status, data, error, isFetching } = usePokemon(pokemonId);

  let hp_ = 0;
  let attack_ = 0;
  let defence_ = 0;
  let speed_ = 0;

  if(pokemonId && status !== 'error' && status !== 'loading'){
    console.log("data", data);
    data.stats.map(
      stat => {
        switch(stat.stat.name) {
          case 'hp':
            hp_ = stat.base_stat;
            break;
          case 'attack':
            attack_ = stat.base_stat;
            break;
          case 'defense':
            defence_ = stat.base_stat;
            break;
          case 'speed':
            speed_ = stat.base_stat;
            break;
          default:
            hp_ = 100;
            break;
        }
      }
    );
    console.log("hp", hp_);
  }

  return (
    <div>
      <div>
        <a onClick={() => setPokemonId(-1)} href="#">
          Back
        </a>
      </div>
      {!pokemonId || status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{pokemonId}</h1>
          <div>
            <p>HP: {hp_}</p>
            <p>Defense: {defence_}</p>
            <p>Speed: {speed_}</p>
            <p>Attack: {attack_}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}