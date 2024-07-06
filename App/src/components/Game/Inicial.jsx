/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./Game.css";

import { useState } from "react";

const Inicial = ({setStage}) => {
  const [jogado, setJogado] = useState(false);
  return (
    <div className="Inicial">
      <div className="container">
        <ul>
          <li className="Slackey white font-30" onClick={() => setStage('Game1')}>
            {jogado && <i class="fa-solid fa-check"></i>}
            <span>Digite o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => setStage('Game2')}>
            {jogado && <i class="fa-solid fa-check"></i>}
            <span>Acerte o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => setStage('Game3')}>
            {jogado && <i class="fa-solid fa-check"></i>}
            <span>Acerte pelo tipo</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Inicial;
