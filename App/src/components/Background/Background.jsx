/* eslint-disable react/prop-types */
import "./Background.css";

import Who from "../../assets/Backgrounds/Who.jpg";
import Errado from '../../assets/Backgrounds/Errado4.png'

const Background = ({type}) => {


  return (
    <>
    {type === 'How' &&
        <img src={Who} alt="" className="back" />
    }
      {type === 'Errado' &&
        <img src={Errado} alt="" className="back" />
    }
    {type === 'Pokedex' &&
        <div className="red"></div>
    }
    </>
  );
};

export default Background;
