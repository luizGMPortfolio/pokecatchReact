/* eslint-disable react/prop-types */
import Card from "../Card/Card";

import { useState } from "react";

const Game1 = ({ setStage, game }) => {

  const [pokemon] = useState(game[game[8]]);
  const [pokemons] = useState(game);


  return (
    <>
      {!pokemons && (
        <div className="cardHow">
          <Card Style={"Back"} />
        </div>
      )}
      {pokemon && (
        <>
          <div className="cardHow">
            <Card
              name={pokemon.name}
              img={pokemon.sprite.padrão}
              types={pokemon.types}
              num={pokemon.id}
              Style={"Ocult"}
            />
          </div>
          <div className="choises">
            <ul>
              <li
                className={pokemons[0].name}
                onClick={() => CheckChoise(pokemons[0].name)}
              >
                {pokemons[0].name}
              </li>
              <li
                className={pokemons[1].name}
                onClick={() => CheckChoise(pokemons[1].name)}
              >
                {pokemons[1].name}
              </li>
              <li
                className={pokemons[2].name}
                onClick={() => CheckChoise(pokemons[2].name)}
              >
                {pokemons[2].name}
              </li>
              <li
                className={pokemons[3].name}
                onClick={() => CheckChoise(pokemons[3].name)}
              >
                {pokemons[3].name}
              </li>
              <li
                className={pokemons[4].name}
                onClick={() => CheckChoise(pokemons[4].name)}
              >
                {pokemons[4].name}
              </li>
              <li
                className={pokemons[5].name}
                onClick={() => CheckChoise(pokemons[5].name)}
              >
                {pokemons[5].name}
              </li>
              <li
                className={pokemons[6].name}
                onClick={() => CheckChoise(pokemons[6].name)}
              >
                {pokemons[6].name}
              </li>
              <li
                className={pokemons[7].name}
                onClick={() => CheckChoise(pokemons[7].name)}
              >
                {pokemons[7].name}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Game1;
