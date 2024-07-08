import "./How.css";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { useFetchPokemons } from "../../hooks/useFetchPokemons";
import { useAuthValue } from "../../context/AuthContext";
import { useCloud } from "../../hooks/useCloud";

import Background from "../../components/Background/Background";
import Game from "../../components/Game/Game";

const How = () => {
  const { RandonHowPokemons } = useFetchPokemons();
  const { user } = useAuthValue();

  const [num, setNum] = useState();
  const [pokemon, setPokemon] = useState();
  const [pokemons, setPokemons] = useState();


  useEffect(() => {
    async function sla() {
      const data = await RandonHowPokemons();
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
        <Game />
      </div>
    </>
  );
};

export default How;
