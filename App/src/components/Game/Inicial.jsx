/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./Game.css";

import { useState, useEffect } from "react";

const Inicial = ({setStage, games}) => {


  return (
    <div className="Inicial">
      <div className="container">
        <ul>
          <li className="Slackey white font-30" onClick={() => setStage('Game1')}>
            {games.game1 === 'Coletado' && <i class="fa-solid fa-check light-green"></i>}
            {games.game1 === 'Sem vidas' && <i class="fa-solid fa-x" style={{color: '#db1414'}}></i>}
            <span>Digite o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => setStage('Game2')}>
            {games.game2 === 'Coletado' && <i class="fa-solid fa-check"></i>}
            {games.game2 === 'Sem vidas' && <i class="fa-solid fa-x" style={{color: '#db1414'}}></i>}
            <span>Acerte o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => setStage('Game3')}>
            {games.game3 === 'Coletado' && <i class="fa-solid fa-check"></i>}
            {games.game3 === 'Sem vidas' && <i class="fa-solid fa-x" style={{color: '#db1414'}}></i>}
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
