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
  const [Games, setGames] = useState()

  const {user} =useAuthValue()
  const { RandonPokeball } = useFetchPokemons();
  const { documents, GetDocuments, UpdateDocuments } = useCloud();

  useEffect(() => {

    async function LoadData() {
      await GetDocuments("Configs", user.uid);
    }
    if(user){
      LoadData();
    }
  }, [user]);

  useEffect(() => {
    if(documents){
      setGames(documents.Games)
    }
  }, [documents]);

  useEffect(() => {
    if(game != "Coletado" && game != "Sem vidas"){
      setTip(game.name.split(""))
      var Array = [];
  
      game.name.split("").map((item) => Array.push([item, "ContentInvisibility"]));
  
      setArray(Array);
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
            game3: Games.game3
          }
        };
    
        UpdateDocuments("Configs", documents.id, DataItens);


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


            for (let index = 0; index < Math.floor(array.length/3); index++) {
              var num = Math.floor(Math.random() * array.length)
              var igual = true
              while(igual){
                num = Math.floor(Math.random() * array.length)
                igual = false
                nuns.map((item) => {
                  if(num === item ){
                    igual = true
                  }
                })
              }

              nuns.push(Math.floor(Math.random() * array.length));
            }

            Array.map((item, index) =>
              nuns.map((num) => {
                if (index === num) {

                  item[1] = "";
                }
              })
            );
            setArray(Array);

          }, 2000);
          break;
        case 2:
          setTimeout(() => {
            setBackground("Errado");
          }, 300);
          setTimeout(() => {
            var great = document.getElementsByClassName("great")[0];
            great.classList.add("invisibility");
            setTrys(trys - 1);
            var items = document.querySelectorAll(".option");
            // Adiciona a classe 'new-class' a cada elemento selecionado
            items.forEach((item) => {
              item.classList.add("LastChance");
            });


            for (let index = 0; index < Math.floor(array.length/2); index++) {
              var num = Math.floor(Math.random() * array.length)
              var igual = true
              while(igual){
                num = Math.floor(Math.random() * array.length)
                igual = false
                nuns.map((item) => {
                  if(num === item ){
                    igual = true
                  }
                })
              }

              nuns.push(Math.floor(Math.random() * array.length));
            }

            Array.map((item, index) =>
              nuns.map((num) => {
                if (index === num) {

                  item[1] = "";
                }
              })
            );
            setArray(Array);


          }, 2000);

          break;
        case 1:
          var pokeball = document.getElementsByClassName("pokeball")[0];
          pokeball.classList.add("invisibility");
          setTrys(trys - 1);

          const DataItens = {
            Games: {
              game1: "Sem vidas",
              game2: Games.game2,
              game3: Games.game3
            }
          };
      
          UpdateDocuments("Configs", documents.id, DataItens);
    }

    }
  };


  return (
    <>
      {(game === 'Coletado' || game === "Sem vidas") && (
        <div className="cardHow">
          <Card Style={"Back"} />
        </div>
      )}
      {(game != "Sem vidas" && game != 'Coletado') && (
        <>
          <div className="cardHow">
            <Card
              name={game.name}
              img={game.sprite.padrão}
              types={game.types}
              num={game.id}
              Style={"Ocult"}
            />
          </div>
          <div className="input">
            <input
              type="text"
              className="Slackey option"
              onChange={(e) => setName(e.target.value)}
            />
            <i onClick={CheckChoise} class="fa-solid fa-play option"></i>
          </div>
          <div className="trys G1">
            <div className="Box1">
              <span className="kanit white">{trys === 1 ?'Ultima Chance':'Chances'}</span>
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
    </>
  );
};

export default Game1;
