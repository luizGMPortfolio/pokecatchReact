/* eslint-disable react/prop-types */
import Card from "../Card/Card";

import pokeball from '../../assets/pokebolas/padão.svg'
import great from '../../assets/pokebolas/greatBall.svg'
import ultra from '../../assets/pokebolas/ultraBall.svg'

const Game1 = ({ setStage, pokemons, pokemon }) => {
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
          <div className="input">
          <input type="text" className="Slackey"/>
          <i class="fa-solid fa-play"></i>
          </div>
          <div className="trys">
            <ul>
                <li><img src={pokeball} alt="" /></li>
                <li><img src={great} alt="" /></li>
                <li><img src={ultra} alt="" /></li>
            </ul>
            <div className="tip"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Game1;
