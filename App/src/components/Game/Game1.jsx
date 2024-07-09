/* eslint-disable react/prop-types */
import Card from "../Card/Card";

import pokeball from "../../assets/pokebolas/padão.svg";
import great from "../../assets/pokebolas/greatBall.svg";
import ultra from "../../assets/pokebolas/ultraBall.svg";

const Game1 = ({ setStage, game, setBackground }) => {
  return (
    <>
      {!game && (
        <div className="cardHow">
          <Card Style={"Back"} />
        </div>
      )}
      {game && (
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
            <input type="text" className="Slackey" />
            <i class="fa-solid fa-play"></i>
          </div>
          <div className="trys">
            <div className="Box1">
              <span className="kanit white">Chances</span>
              <ul>
                <li>
                  <img src={pokeball} alt="" />
                </li>
                <li>
                  <img src={great} alt="" />
                </li>
                <li>
                  <img src={ultra} alt="" />
                </li>
              </ul>
            </div>
            <div className="Box2">
              <span className="kanit white">Dica</span>
              <div className="tip">
                <span className="Slackey white">{game.name}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Game1;
