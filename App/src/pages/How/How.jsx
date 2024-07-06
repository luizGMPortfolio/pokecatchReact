
import "./How.css";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { useFetchPokemons } from "../../hooks/useFetchPokemons";

import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Game from "../../components/Game/Game";

const How = () => {
  const { RandonHowPokemons } = useFetchPokemons();
  const [num, setNum] = useState();
  const [pokemon, setPokemon] = useState();
  const [pokemons, setPokemons] = useState();
  const [Stage, setStage] = useState();

  useEffect(() => {
    async function sla() {
      const data = await RandonHowPokemons();
      console.log(data[4]);
      setNum(data[4]);
      setPokemon(data[data[4]]);
      setPokemons(data);
    }
    sla();
  }, []);

  const CheckChoise = (choise) => {};

  return (
    <>
      <Background type={"How"} />
      <Navbar />
      <div className="How">
        <div className="title">
          <h3>Quem é esse</h3>
          <h1>Pokemon?</h1>
        </div>
        <Game pokemons={pokemons} pokemon={pokemon}/>
      </div>
    </>
  );
};

export default How;
