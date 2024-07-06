/* eslint-disable react/prop-types */
import "./Game.css";

import { useState } from "react";


import Inicial from "./Inicial";
import Game2 from "./Game2";
import Game1 from "./Game1";
import Game3 from './Game3'

const Game = ({ pokemons, pokemon }) => {
  const [Stage, setStage] = useState('inicial');

  return (
    <>
      {Stage === "inicial" && <Inicial setStage={setStage}/>}
      {Stage === "Game1" && <Game1 setStage={setStage} pokemons={pokemons} pokemon={pokemon}/>}
      {Stage === "Game2" && <Game2 setStage={setStage} pokemons={pokemons} pokemon={pokemon}/>}
      {Stage === "Game3" && <Game3 setStage={setStage} pokemons={pokemons} pokemon={pokemon}/>}
    </>
  );
};

export default Game;
