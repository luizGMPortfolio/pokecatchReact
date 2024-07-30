/* eslint-disable react/prop-types */
import "./Background.css";

import Who from "../../assets/Backgrounds/Who.jpg";
import Errado from "../../assets/Backgrounds/Errado7.jpg";
import Certo from "../../assets/Backgrounds/Certo.jpg";
import red from '../../assets/Backgrounds/BackgroundPokedex2.jpg'
import { useEffect } from "react";



const Background = ({ type }) => {

  
  return (
    <div className="Background">
      {type === "Who" && <img src={Who} alt="" className="back who" />}
      {type === "Errado" && <img src={Errado} alt="" className="back" />}
      {type === "Certo" && <img src={Certo} alt="" className="back" />}
      {type === "Pokedex" && <div className="red"></div>}
    </div>
  );
};

export default Background;
