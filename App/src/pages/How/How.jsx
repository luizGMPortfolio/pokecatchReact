import "./How.css";

import { useEffect, useState } from "react";


import { useFetchPokemons } from "../../hooks/useFetchPokemons";


import Background from "../../components/Background/Background";
import Game from "../../components/Game/Game";
import Navbar from "../../components/Navbar/Navbar";



const How = () => {
  const { RandonHowPokemons } = useFetchPokemons();

  const [num, setNum] = useState();
  const [pokemon, setPokemon] = useState();
  const [pokemons, setPokemons] = useState();

  const [background, setBackground] = useState('Who')


  useEffect(() => {
    async function sla() {
      const data = await RandonHowPokemons();
      setNum(data[4]);
      setPokemon(data[data[4]]);
      setPokemons(data);
    }
    sla();
  }, []);



  return (
    <>
      <Background type={background} />
      <Navbar />
      <div className="How">
        <div className="title">
          <h3>Quem é esse</h3>
          <h1>Pokemon?</h1>
        </div>
        <Game setBackground={setBackground}/>
      </div>
    </>
  );
};

export default How;
