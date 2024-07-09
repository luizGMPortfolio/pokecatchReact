/* eslint-disable react/prop-types */
import "./Background.css";

import Who from "../../assets/Backgrounds/Who.jpg";
import Errado from "../../assets/Backgrounds/Errado7.jpg";
import Certo from "../../assets/Backgrounds/Certo.jpg";
import red from '../../assets/Backgrounds/BackgroundPokedex.jpg'

const Background = ({ type }) => {
  return (
    <>
      {type === "Who" && <img src={Who} alt="" className="back" />}
      {type === "Errado" && <img src={Errado} alt="" className="back" />}
      {type === "Certo" && <img src={Certo} alt="" className="back" />}
      {type === "Pokedex" && <img src={red} alt="" className="back" />}
    </>
  );
};

export default Background;
