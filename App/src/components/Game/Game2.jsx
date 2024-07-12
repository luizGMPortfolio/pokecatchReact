/* eslint-disable react/prop-types */
import Card from "../Card/Card";

import { useState, useEffect } from "react";

import { useFetchPokemons } from "../../hooks/useFetchPokemons";
import { useCloud } from "../../hooks/useCloud";

import { useAuthValue } from "../../context/AuthContext";

import pokeball from "../../assets/pokebolas/padão.svg";
import great from "../../assets/pokebolas/greatBall.svg";
import ultra from "../../assets/pokebolas/ultraBall.svg";

const Game1 = ({ setStage, game, setBackground, setRewards }) => {

  const { RandonPokeball } = useFetchPokemons();
  const { user } = useAuthValue();
  const { documents, GetDocuments, UpdateDocuments } = useCloud();

  const [pokemon, setPokemon] = useState();
  const [pokemons, setPokemons] = useState();

  const [trys, setTrys] = useState(3);
  const [Games, setGames] = useState();

  useEffect(() => {
    if (game != "Coletado" && "Sem vidas") {
      setPokemon(game[game[8]])
      setPokemons(game)
    }
    else if(game === 'Coletado'){
      setBackground('Certo')
    }
    else if(game === 'Sem vidas'){
      setBackground('Errado')
    }
  }, [])

  useEffect(() => {

    async function LoadData() {
      await GetDocuments("Configs", user.uid);
    }
    if (user) {
      LoadData();
    }
  }, [user]);

  useEffect(() => {
    if (documents) {
      setGames(documents.Games)
    }
  }, [documents]);

  const CheckChoise = async (choise) => {
    if (pokemon.name === choise) {

      const pokebola = await RandonPokeball();

      setBackground('Certo')
      setTimeout(() => {
        const NewRewards = {
          pokemon: pokemon,
          pokebolas: pokebola
        }

        setRewards(NewRewards)

        const DataItens = {
          Games: {
            game1: Games.game1,
            game2: "Coletado",
            game3: Games.game3
          }
        };

        UpdateDocuments("Configs", documents.id, DataItens);

      }, 400)


    }
    else {
      var id = document.getElementsByClassName(choise)[0];
      id.classList.add('errado')

      setTimeout(() => {
        setBackground('Errado')
      }, 300)


      switch (trys) {
        case 3:
          var ultra = document.getElementsByClassName('ultra')[0];
          ultra.classList.add('invisibility')
          setTrys(trys - 1)
          setTimeout(() => {
            setBackground('Who')
          }, 2000)
          break
        case 2:
          var great = document.getElementsByClassName('great')[0];
          great.classList.add('invisibility')
          setTrys(trys - 1)
          var items = document.querySelectorAll('.option');

          // Adiciona a classe 'new-class' a cada elemento selecionado
          items.forEach(item => {
            item.classList.add('LastChance');
          });
          break
        case 1:
          var pokeball = document.getElementsByClassName('pokeball')[0];
          pokeball.classList.add('invisibility')
          setTrys(trys - 1)

          const DataItens = {
            Games: {
              game1: Games.game1,
              game2: "Sem vidas",
              game3: Games.game3
            }
          };

          UpdateDocuments("Configs", documents.id, DataItens);
      }

    }

  };

  return (
    <>
      {game === "Coletado" && (
        <>
        <div className="cardHow">
          <Card Style={"Back"} />
        </div>
        <h1 className="Slackey bold gray">Coletado</h1>
      </>
      )}
      {game === "Sem vidas" && (
        <>
          <div className="cardHow">
            <Card Style={"Back"} />
          </div>
          <h1 className="Slackey bold gray">Sem vidas</h1>
        </>
      )}
      {(game != "Coletado" && game != "Sem vidas") && (
        <>
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
              <div className="trys">
                <div className="Box1">
                  <span className="kanit white">{trys === 1 ? 'Ultima Chance' : 'Chances'}</span>
                  <ul>
                    <li className="pokeball">
                      <img src={pokeball} alt="" />
                    </li>
                    <li className="great">
                      <img src={great} alt="" />
                    </li>
                    <li className="ultra">
                      <img src={ultra} alt="" />
                    </li>
                  </ul>
                </div>

              </div>
              <div className="choises">
                <ul>
                  <li
                    className={`${pokemons[0].name} option`}
                    onClick={() => CheckChoise(pokemons[0].name)}
                  >
                    {pokemons[0].name}
                  </li>
                  <li
                    className={`${pokemons[1].name} option`}
                    onClick={() => CheckChoise(pokemons[1].name)}
                  >
                    {pokemons[1].name}
                  </li>
                  <li
                    className={`${pokemons[2].name} option`}
                    onClick={() => CheckChoise(pokemons[2].name)}
                  >
                    {pokemons[2].name}
                  </li>
                  <li
                    className={`${pokemons[3].name} option`}
                    onClick={() => CheckChoise(pokemons[3].name)}
                  >
                    {pokemons[3].name}
                  </li>
                  <li
                    className={`${pokemons[4].name} option`}
                    onClick={() => CheckChoise(pokemons[4].name)}
                  >
                    {pokemons[4].name}
                  </li>
                  <li
                    className={`${pokemons[5].name} option`}
                    onClick={() => CheckChoise(pokemons[5].name)}
                  >
                    {pokemons[5].name}
                  </li>
                  <li
                    className={`${pokemons[6].name} option`}
                    onClick={() => CheckChoise(pokemons[6].name)}
                  >
                    {pokemons[6].name}
                  </li>
                  <li
                    className={`${pokemons[7].name} option`}
                    onClick={() => CheckChoise(pokemons[7].name)}
                  >
                    {pokemons[7].name}
                  </li>
                </ul>
              </div>
            </>
          )}

        </>
      )}
    </>
  );
};

export default Game1;
