/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./Game.css";

import { useState, useEffect } from "react";

const Inicial = ({setStage, games}) => {
  const [jogado, setJogado] = useState(false);

  useEffect(() => {

  }, [games])
  return (
    <div className="Inicial">
      <div className="container">
        <ul>
          <li className="Slackey white font-30" onClick={() => setStage('Game1')}>
            {games.game1 === 'Coletado' && <i class="fa-solid fa-check"></i>}
            <span>Digite o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => setStage('Game2')}>
            {games.game1 === 'Coletado' && <i class="fa-solid fa-check"></i>}
            <span>Acerte o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => setStage('Game3')}>
            {games.game1 === 'Coletado' && <i class="fa-solid fa-check"></i>}
            <span> Acerte pelo tipo</span>
          </li>
          <li className="Slackey white font-30 disable">
          <span>Comming soon</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Inicial;
