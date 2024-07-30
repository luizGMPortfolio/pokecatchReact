/* eslint-disable react/prop-types */
import Card from "../Card/Card";

import pokeball from "../../assets/pokebolas/padão.svg";
import great from "../../assets/pokebolas/greatBall.svg";
import ultra from "../../assets/pokebolas/ultraBall.svg";
import { useEffect, useState } from "react";

import { useFetchPokemons } from "../../hooks/useFetchPokemons";
import { useCloud } from "../../hooks/useCloud";

import { useAuthValue } from "../../context/AuthContext";

const Game1 = ({ setStage, game, setBackground, setRewards }) => {
  const [name, setName] = useState("");
  const [trys, setTrys] = useState(3);
  const [tip, setTip] = useState();
  const [array, setArray] = useState([]);
  const [Games, setGames] = useState();

  const { user } = useAuthValue();
  const { RandonPokeball } = useFetchPokemons();
  const { documents, GetDocuments, UpdateDocuments } = useCloud();

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
      setTip(game.name.split(""));
      var Array = [];

      game.name
        .split("")
        .map((item) => Array.push([item, "ContentInvisibility"]));

      setArray(Array);

      if (localStorage.getItem("Game1") == null) {
        let Game1 = [trys, Array];
  
        // Converta o array para uma string JSON
        let arrayString = JSON.stringify(Game1);
  
        // Armazene a string no Local Storage
        localStorage.setItem("Game1", arrayString);
      }else{
        let arrayString = JSON.parse(localStorage.getItem("Game1"));
        setTrys(arrayString[0])
        setArray(arrayString[1])
  
        var ultra = document.getElementsByClassName("ultra")[0];
        var great = document.getElementsByClassName("great")[0];
        var pokeball = document.getElementsByClassName("pokeball")[0];
  
        if(arrayString[0] === 2){
          ultra.classList.add("invisibility");
        }
        if(arrayString[0] === 1){
          ultra.classList.add("invisibility");
          great.classList.add("invisibility");
        }
        if(arrayString[0] === 0){
          setBackground('Errado')
          ultra.classList.add("invisibility");
          great.classList.add("invisibility");
          pokeball.classList.add("invisibility");
        }
      }

    } else if (game === "Coletado") {
      setTimeout(() => {
        setBackground("Certo");
      }, 1000);
    } else if (game === "Sem vidas") {
      setTimeout(() => {
        setBackground("Errado");
      }, 1000);
    }


  }, []);

  const CheckChoise = async (e) => {
    e.preventDefault();

    var Array = array;
    var nuns = [];

    if (game.name === name) {
      const pokebola = await RandonPokeball();

      

      setBackground("Certo");
      setTimeout(() => {
        const NewRewards = {
          pokemon: game,
          pokebolas: pokebola,
        };

        setRewards(NewRewards);

        const DataItens = {
          Games: {
            game1: "Coletado",
            game2: Games.game2,
            game3: Games.game3,
          },
        };

        UpdateDocuments("Configs", documents.id, DataItens);

        localStorage.removeItem('Game1')
      }, 400);
    } else {
      switch (trys) {
        case 3:
          setTimeout(() => {
            setBackground("Errado");
          }, 300);

          setTimeout(() => {
            setBackground("Who");
            var ultra = document.getElementsByClassName("ultra")[0];
            ultra.classList.add("invisibility");
            setTrys(trys - 1);

            for (let index = 0; index < Math.ceil(array.length / 3); index++) {
              var num = Math.ceil(Math.random() * array.length);
              var igual = true;
              while (igual) {
                num = Math.ceil(Math.random() * array.length);
                igual = false;
                nuns.map((item) => {
                  if (num === item) {
                    igual = true;
                  }
                });
              }

              nuns.push(Math.ceil(Math.random() * array.length));
            }
            Array.map((item, index) =>
              nuns.map((num) => {
                if (index === num) {
                  item[1] = "";
                }
              })
            );
            setArray(Array);

            let Game1 = [trys-1, Array];

            // Converta o array para uma string JSON
            let arrayString = JSON.stringify(Game1);
      
            // Armazene a string no Local Storage
            localStorage.setItem("Game1", arrayString);

          }, 2000);
          break;
        case 2:
          setTimeout(() => {
            setBackground("Errado");
          }, 300);
          setTimeout(() => {
            setBackground("Who");
            var great = document.getElementsByClassName("great")[0];
            great.classList.add("invisibility");
            setTrys(trys - 1);

            for (let index = 0; index < Math.ceil(array.length / 2); index++) {
              var num = Math.ceil(Math.random() * array.length);
              var igual = true;
              while (igual) {
                num = Math.ceil(Math.random() * array.length);
                igual = false;
                nuns.map((item) => {
                  if (num === item) {
                    igual = true;
                  }
                });
              }

              nuns.push(Math.ceil(Math.random() * array.length));
            }

            Array.map((item, index) =>
              nuns.map((num) => {
                if (index === num) {
                  item[1] = "";
                }
              })
            );
            setArray(Array);


            let Game1 = [trys-1, Array];

            // Converta o array para uma string JSON
            let arrayString = JSON.stringify(Game1);
      
            // Armazene a string no Local Storage
            localStorage.setItem("Game1", arrayString);
          }, 2000);

          break;
        case 1:
          setTimeout(() => {
            setBackground("Errado");
          }, 300);

          setTimeout(() => {
            var pokeball = document.getElementsByClassName("pokeball")[0];
            pokeball.classList.add("invisibility");
            setTrys(trys - 1);

            var items = document.querySelectorAll(".option");
            // Adiciona a classe 'new-class' a cada elemento selecionado
            items.forEach((item) => {
              item.classList.add("LastChance");
            });

            for (let index = 0; index < Math.ceil(array.length / 2); index++) {
              var num = Math.ceil(Math.random() * array.length);
              var igual = true;
              while (igual) {
                num = Math.ceil(Math.random() * array.length);
                igual = false;
                nuns.map((item) => {
                  if (num === item) {
                    igual = true;
                  }
                });
              }

              nuns.push(Math.ceil(Math.random() * array.length));
            }

            Array.map((item, index) =>
              nuns.map((num) => {
                if (index === num) {
                  item[1] = "";
                }
              })
            );
            setArray(Array);

            let Game1 = [trys-1, Array];

            // Converta o array para uma string JSON
            let arrayString = JSON.stringify(Game1);
      
            // Armazene a string no Local Storage
            localStorage.setItem("Game1", arrayString);

          }, 2000);

          break;
        case 0:
          setTrys(trys - 1);
          // eslint-disable-next-line no-case-declarations
          const DataItens = {
            Games: {
              game1: "Sem vidas",
              game2: Games.game2,
              game3: Games.game3,
            },
          };

          UpdateDocuments("Configs", documents.id, DataItens);

          localStorage.removeItem('Game1')

          break
      }


    }
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
      {game != "Sem vidas" && game != "Coletado" && (
        <>
          <div className="cardHow SlideAnimationRight">
            <Card
              name={game.name}
              img={game.sprite.padrão}
              types={game.types}
              num={game.id}
              Style={"Ocult"}
            />
          </div>
          <div className="input Opacity">
            <input
              type="text"
              className="Slackey option Opacity"
              onChange={(e) => setName(e.target.value)}
            />
            <i onClick={CheckChoise} class="fa-solid fa-play option"></i>
          </div>
          <div className="trys G1 Opacity">
            <div className="Box1">
              <span className="kanit white">
                {trys === 0 ? "Ultima Chance" : "Chances"}
              </span>
              <ul>
                <li>
                  <img src={pokeball} alt="" className="pokeball" />
                </li>
                <li>
                  <img src={great} alt="" className="great" />
                </li>
                <li>
                  <img src={ultra} alt="" className="ultra" />
                </li>
              </ul>
            </div>
            <div className="Box2">
              <span className="kanit white">Dica</span>
              <div className="tip">
                <ul className="Slackey white TipBox">
                  {array.map((item, index) => (
                    <li className={`${index} ${item[1]}`}>{item[0]}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
