/* eslint-disable no-case-declarations */
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
  const [array, setArray] = useState(["", "", "", "", "", "", "", ""]);
  const [trys, setTrys] = useState(3);
  const [Games, setGames] = useState();

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
      setGames(documents.Games);
    }
  }, [documents]);
  useEffect(() => {
    if (game != "Coletado" && game != "Sem vidas") {
      setPokemon(game[game[8]]);
      setPokemons(game);

      if (localStorage.getItem("Game2") == null) {
        let Game2 = [trys, array];
  
        // Converta o array para uma string JSON
        let arrayString = JSON.stringify(Game2);
  
        // Armazene a string no Local Storage
        localStorage.setItem("Game2", arrayString);
      } else {
        let arrayString = JSON.parse(localStorage.getItem("Game2"));
        setTrys(arrayString[0]);
        setArray(arrayString[1]);
  
  
        setTimeout(() => {
          if (arrayString[0] === 2) {
            let ultra = document.getElementsByClassName("ultra")[0];
            ultra.classList.add("invisibility");
          }
          if (arrayString[0] === 1) {
            setBackground("Errado");
            let ultra = document.getElementsByClassName("ultra")[0];
            let great = document.getElementsByClassName("great")[0];
            ultra.classList.add("invisibility");
            great.classList.add("invisibility");
  
            var items = document.querySelectorAll(".option");
  
            // Adiciona a classe 'new-class' a cada elemento selecionado
            items.forEach((item) => {
              item.classList.add("LastChance");
            });
          }
        }, [100]);
      }
    } else if (game === "Coletado") {
      setTimeout(() => {
        setBackground("Certo");
      }, 1000);
    } if (game == "Sem vidas") {
      setTimeout(() => {
        setBackground("Errado");
      }, 1000);
    }


  }, []);

  const CheckChoise = async (choise) => {
    if(array[choise] != 'errado'){
      if (pokemon.name === pokemons[choise].name) {
        const pokebola = await RandonPokeball();
  
        setBackground("Certo");
        setTimeout(() => {
          const NewRewards = {
            pokemon: pokemon,
            pokebolas: pokebola,
          };
  
          setRewards(NewRewards);
  
          const DataItens = {
            Games: {
              game1: Games.game1,
              game2: "Coletado",
              game3: Games.game3,
            },
          };
  
          UpdateDocuments("Configs", documents.id, DataItens);
        }, 400);

        localStorage.removeItem('Game2')
      } else {
        changeOption(choise);
  
        setTimeout(() => {
          setBackground("Errado");
        }, 300);
  
        switch (trys) {
          case 3:
            var ultra = document.getElementsByClassName("ultra")[0];
            ultra.classList.add("invisibility");
            setTrys(trys - 1);
            setTimeout(() => {
              setBackground("Who");
  
              let Game2 = [trys - 1, array];
  
              // Converta o array para uma string JSON
              let arrayString = JSON.stringify(Game2);
  
              // Armazene a string no Local Storage
              localStorage.setItem("Game2", arrayString);
            }, 2000);
            break;
          case 2:
            var great = document.getElementsByClassName("great")[0];
            great.classList.add("invisibility");
            setTrys(trys - 1);
            var items = document.querySelectorAll(".option");
  
            // Adiciona a classe 'new-class' a cada elemento selecionado
            items.forEach((item) => {
              item.classList.add("LastChance");
            });
  
            let Game2 = [trys - 1, array];
  
            // Converta o array para uma string JSON
            let arrayString = JSON.stringify(Game2);
  
            // Armazene a string no Local Storage
            localStorage.setItem("Game2", arrayString);
  
            break;
          case 1:
            var pokeball = document.getElementsByClassName("pokeball")[0];
            pokeball.classList.add("invisibility");
            setTrys(trys - 1);
  
            const DataItens = {
              Games: {
                game1: Games.game1,
                game2: "Sem vidas",
                game3: Games.game3,
              },
            };
  
            UpdateDocuments("Configs", documents.id, DataItens);

            localStorage.removeItem('Game2')

            break
        }
      }

    }

  };

  const changeOption = (option) => {
    var Array = array;
    Array[option] = "errado";
    setArray(Array);
  };

  const Slide = () => {
    setBackground("Who");
    var items = document.querySelectorAll(".SlideAnimationRight");
    // Adiciona a classe 'new-class' a cada elemento selecionado
    items.forEach((item) => {
      item.classList.add("SlideRight");
    });

    setTimeout(() => {
      setStage("inicial");
    }, 1000);
  };

  return (
    <>
      {game === "Coletado" && (
        <>
          <div className="cardHow SlideAnimationRight">
            <Card Style={"Back"} />
          </div>
          <h1 className="Slackey bold gray SlideAnimationRight">Coletado</h1>
        </>
      )}
      {game === "Sem vidas" && (
        <>
          <div className="cardHow SlideAnimationRight">
            <Card Style={"Back"} />
          </div>
          <h1 className="Slackey bold gray SlideAnimationRight">Sem vidas</h1>
        </>
      )}
      {game != "Coletado" && game != "Sem vidas" && (
        <>
          {pokemon && (
            <>
              <div className="cardHow SlideAnimationRight">
                <Card
                  name={pokemon.name}
                  img={pokemon.sprite.padrão}
                  types={pokemon.types}
                  num={pokemon.id}
                  Style={"Ocult"}
                />
              </div>
              <div className="trys Opacity">
                <div className="Box1">
                  <span className="kanit white">
                    {trys === 1 ? "Ultima Chance" : "Chances"}
                  </span>
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
              <div className="choises Opacity">
                <ul>
                  <li
                    className={`${array[0]} option`}
                    onClick={() => CheckChoise(0)}
                  >
                    {pokemons[0].name}
                  </li>
                  <li
                    className={`${array[1]} option`}
                    onClick={() => CheckChoise(1)}
                  >
                    {pokemons[1].name}
                  </li>
                  <li
                    className={`${array[2]} option`}
                    onClick={() => CheckChoise(2)}
                  >
                    {pokemons[2].name}
                  </li>
                  <li
                    className={`${array[3]} option`}
                    onClick={() => CheckChoise(3)}
                  >
                    {pokemons[3].name}
                  </li>
                  <li
                    className={`${array[4]} option`}
                    onClick={() => CheckChoise(4)}
                  >
                    {pokemons[4].name}
                  </li>
                  <li
                    className={`${array[5]} option`}
                    onClick={() => CheckChoise(5)}
                  >
                    {pokemons[5].name}
                  </li>
                  <li
                    className={`${array[6]} option`}
                    onClick={() => CheckChoise(6)}
                  >
                    {pokemons[6].name}
                  </li>
                  <li
                    className={`${array[7]} option`}
                    onClick={() => CheckChoise(7)}
                  >
                    {pokemons[7].name}
                  </li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
      <button
        className="btn-default Back-btn SlideAnimationRight"
        onClick={Slide}
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </>
  );
};

export default Game1;
