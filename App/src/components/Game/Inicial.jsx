/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./Game.css";

import { useState, useEffect } from "react";

const Inicial = ({setStage, games}) => {

  const Slide = (game) => {
    var items = document.querySelectorAll(".hub");
    // Adiciona a classe 'new-class' a cada elemento selecionado
    items.forEach((item) => {
      item.classList.add("SlideLeft");
    });

    setTimeout(() => {
      setStage(game)
    }, 1000)
  }


  return (
    <div className="Inicial hub SlideAnimationLeft" id="inicial">
      <div className="container">
        <ul>
          <li className="Slackey white font-30" onClick={() => Slide('Game1')} id="Game1">
            {games.game1 === 'Coletado' && <i class="fa-solid fa-check light-green"></i>}
            {games.game1 === 'Sem vidas' && <i class="fa-solid fa-x" style={{color: '#db1414'}}></i>}
            <span>Digite o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => Slide('Game2')} id="Game2">
            {games.game2 === 'Coletado' && <i class="fa-solid fa-check"></i>}
            {games.game2 === 'Sem vidas' && <i class="fa-solid fa-x" style={{color: '#db1414'}}></i>}
            <span>Acerte o nome</span>
          </li>
          <li className="Slackey white font-30" onClick={() => Slide('Game3')} id="Game3">
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
