/* eslint-disable react/prop-types */
import Card from "../Card/Card";

import { useState } from "react";

const Game1 = ({ setStage, game }) => {

  const [pokemon, setPokemon] = useState(game[game[8]]);
  const [pokemons, setPokemons] = useState(game);

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
              Style={"Ocult type"}
            />
          </div>
          <div className="choises">
            <ul>
              <li
                className={pokemons[0].name}
                onClick={() => CheckChoise(pokemons[0].name)}
              >
                <img src={pokemons[0].sprite.padrão} alt="" />
              </li>
              <li
                className={pokemons[1].name}
                onClick={() => CheckChoise(pokemons[1].name)}
              >
                <img src={pokemons[1].sprite.padrão} alt="" />
              </li>
              <li
                className={pokemons[2].name}
                onClick={() => CheckChoise(pokemons[2].name)}
              >
                <img src={pokemons[2].sprite.padrão} alt="" />
              </li>
              <li
                className={pokemons[3].name}
                onClick={() => CheckChoise(pokemons[3].name)}
              >
                <img src={pokemons[3].sprite.padrão} alt="" />
              </li>
              <li
                className={pokemons[4].name}
                onClick={() => CheckChoise(pokemons[4].name)}
              >
                <img src={pokemons[4].sprite.padrão} alt="" />
              </li>
              <li
                className={pokemons[5].name}
                onClick={() => CheckChoise(pokemons[5].name)}
              >
                <img src={pokemons[5].sprite.padrão} alt="" />
              </li>
              <li
                className={pokemons[6].name}
                onClick={() => CheckChoise(pokemons[6].name)}
              >
                <img src={pokemons[6].sprite.padrão} alt="" />
              </li>
              <li
                className={pokemons[7].name}
                onClick={() => CheckChoise(pokemons[7].name)}
              >
                <img src={pokemons[7].sprite.padrão} alt="" />
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Game1;
