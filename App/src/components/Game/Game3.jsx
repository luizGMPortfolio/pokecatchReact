/* eslint-disable react/prop-types */
import Card from "../Card/Card";

import { useState } from "react";
import { useFetchPokemons } from "../../hooks/useFetchPokemons";

import pokeball from "../../assets/pokebolas/padão.svg";
import great from "../../assets/pokebolas/greatBall.svg";
import ultra from "../../assets/pokebolas/ultraBall.svg";

const Game1 = ({ setStage, game, setBackground, setRewards }) => {

  const {RandonPokeball} = useFetchPokemons()

  const [pokemon] = useState(game[game[8]]);
  const [pokemons] = useState(game);

  const [trys, setTrys] =useState(3);

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
      },400)


    }
    else{
      var id = document.getElementsByClassName(choise)[0];
      id.classList.add('errado')

      setTimeout(() => {
        setBackground('Errado')
      },300)


      switch(trys){
        case 3 :
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
      }

    }
    
  };

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
          <div className="trys">
            <div className="Box1">
              <span className="kanit white">{trys === 1 ?'Ultima Chance':'Chances'}</span>
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
                <img src={pokemons[0].sprite.padrão} alt="" />
              </li>
              <li
                className={`${pokemons[1].name} option`}
                onClick={() => CheckChoise(pokemons[1].name)}
              >
                <img src={pokemons[1].sprite.padrão} alt="" />
              </li>
              <li
                className={`${pokemons[2].name} option`}
                onClick={() => CheckChoise(pokemons[2].name)}
              >
                <img src={pokemons[2].sprite.padrão} alt="" />
              </li>
              <li
                className={`${pokemons[3].name} option`}
                onClick={() => CheckChoise(pokemons[3].name)}
              >
                <img src={pokemons[3].sprite.padrão} alt="" />
              </li>
              <li
                className={`${pokemons[4].name} option`}
                onClick={() => CheckChoise(pokemons[4].name)}
              >
                <img src={pokemons[4].sprite.padrão} alt="" />
              </li>
              <li
                className={`${pokemons[5].name} option`}
                onClick={() => CheckChoise(pokemons[5].name)}
              >
                <img src={pokemons[5].sprite.padrão} alt="" />
              </li>
              <li
                className={`${pokemons[6].name} option`}
                onClick={() => CheckChoise(pokemons[6].name)}
              >
                <img src={pokemons[6].sprite.padrão} alt="" />
              </li>
              <li
                className={`${pokemons[7].name} option`}
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
