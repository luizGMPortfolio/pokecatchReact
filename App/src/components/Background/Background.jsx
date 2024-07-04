/* eslint-disable react/prop-types */
import "./Background.css";

import Who from "../../assets/Backgrounds/Who.jpg";


const Background = ({type}) => {


  return (
    <>
    {type === 'How' &&
        <img src={Who} alt="" className="back" />
    }
    {type === 'Pokedex' &&
        <div className="red"></div>
    }
    </>
  );
};

export default Background;
