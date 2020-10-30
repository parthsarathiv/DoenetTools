import React, { useState } from "react";
import { ReactQueryDevtools } from 'react-query-devtools'
import ReactDOM from "react-dom";
import axios from "axios";
import {
  useQuery,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
  useMutation,
} from "react-query";

import regeneratorRuntime from "regenerator-runtime";
import { SpriteText2D } from "three-text2d";

const queryCache = new QueryCache();

export default function PokemonInfo(){

  const [pokemonId, setPokemonId] = useState(-1)
  const [editFlag, setEditFlag] = useState(false)
  const [text, setText] = useState("")

  return (
    <ReactQueryCacheProvider queryCache = {queryCache}>
      <p>Here is a list of pokemons: </p>
      <Pokemons setPokemonId = {setPokemonId}/>
      {pokemonId !== -1 ? <Pokemon 
      pokemonId={pokemonId} 
      setPokemonId={setPokemonId} 
      editFlag = {editFlag} 
      setEditFlag = {setEditFlag} 
      text = {text} 
      setText = {setText}/> : null}
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  )
}


function usePokemons() {
  return useQuery("pokemons", async () => {
    const phpUrl = '/api/loadPokemons.php';
    const data = await axios.get(
      phpUrl
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
        {/* {console.log(data.data.map(pokemon => pokemon.name))} */}
        {data.data.map(pokemon => <li key = {pokemon.name}><a href = "#" onClick = {() => setPokemonId(pokemon.name)}>{pokemon.name}</a></li>)}
      </ul>
      }
    </div>
  )
}

const getPokemonById = async (key, id) => {
  const phpUrl = '/api/loadPokemon.php';
  const { data } = await axios.get(
    phpUrl,
    {params: {pokemonId: id}}
  );
  return data;
};

function usePokemon(pokemonId) {
  return useQuery(["pokemon", pokemonId], getPokemonById);
}

function Pokemon({ pokemonId, setPokemonId, editFlag, setEditFlag, text, setText }){
  console.log("pokemonId", pokemonId);
  const { status, data, error, isFetching } = usePokemon(pokemonId);

  const [mutate] = useMutation(
    ({pokemonId, newHP}) => {
    const url = '/api/savePokemon.php';
    axios.post(url, {pokemonId: pokemonId, newHP: newHP}).then((resp) => {
      console.log(resp.data); //var_dump shows here
    })
  });

  const handleSave = async e => {
    e.preventDefault();
    setEditFlag(false);

    try {
      console.log("text", text);
      await mutate({pokemonId: pokemonId, newHP: text})
      // Todo was successfully created
    } catch (error) {
      // Uh oh, something went wrong
    }

  }
  let hp_ = 0;
  let attack_ = 0;
  let defence_ = 0;
  let speed_ = 0;

  if(pokemonId && status !== 'error' && status !== 'loading'){
    hp_ = data.hp;
    attack_ = data.attack;
    defence_ = data.defence;
    speed_ = data.speed;
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
            <button onClick = {() => setEditFlag(true)}>Edit</button>
            {editFlag ? <div>
              <input value = {text} onChange = {(e) => setText(e.target.value)} />
              <button onClick = {handleSave}>Save</button>
            </div> : null}
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}


