import React, { useEffect, useState } from 'react';
import { getAllPokemon } from './utils/pokemon';
import { getPokemon } from './utils/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // get all pokemon data
      let res = await getAllPokemon(initialURL);
      // get detail pokemon data
      loadPokemon(res.results);
      // console.log(res.next);

      // holding next page url
      setNextURL(res.next);
      // holding previous page url
      setPrevURL(res.previous);

      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);
  
  const prevButtonHandler = async () => {
    if(!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  }

  const nextButtonHandler = async () => {
    setLoading(true);
    let data  = await getAllPokemon(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  }



  return (
    <>
      <Navbar/>
      <div className='App'>
        {loading ? (
          <h1>Now Loading...</h1>
        ) : (
          <div className='pokemonCardContainer'>
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}/>
            })}
          </div>
        )}
      </div>
      <div className='btn'>
        <button onClick={prevButtonHandler}>Prev</button>
        <button onClick={nextButtonHandler}>Next</button>
      </div>
    </>
  );


}
  


export default App;