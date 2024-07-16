/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import "./Card.css";
import Backcard from "../../assets/Backgrounds/pokecatchBackcard.png";

function Card({ name, img, types, num, Style, setInfo, quantidade, backcard }) {

  function Rederect() {
    setInfo(num);
  }

  return (
    <>
      {!Style && (
        <div className="card" onClick={Rederect}>
          <div className="name">
            <h3 style={{ fontSize: `${name.lenght > 12 ? "11px" : "15px"}` }}>
              {name}
            </h3>
          </div>
          <div className="img">
            <img src={img} alt="" />
          </div>
          <div className="types">
            {types &&
              types.map((type) => (
                <div className={`type1 ${type}`}>
                  <span>{type}</span>
                </div>
              ))}
          </div>
          <div className="num">
            <span>N°{num}</span>
          </div>
          {quantidade && (
            <div className="duplicate">
              <span>{quantidade}x</span>
            </div>
          )}
        </div>
      )}
      {Style == "Uncatch" && (
        <div className="card ocult">
          <div className="name">
            <h3>?????</h3>
          </div>
          <div className="img">
            <img src={img} alt="" className="ocultImg" />
          </div>
          <div className="types">
            {types &&
              types.map((type) => (
                <div className={`type1 ${type}`}>
                  <span>{type}</span>
                </div>
              ))}
          </div>
          <div className="num">
            <span>N°{num}</span>
          </div>
        </div>
      )}
      {Style === "Ocult" && (
        <div className="card ocult">
          <div className="name">
            <h3>?????</h3>
          </div>
          <div className="img">
            <img src={img} alt="" className="ocultImg" />
          </div>
          <div className="types">
            {types &&
              types.map((type) => (
                <div className={`type1`}>
                  <span>?????</span>
                </div>
              ))}
          </div>
          <div className="num">
            <span>N°?</span>
          </div>
        </div>
      )}
      {Style === "Ocult type" && (
        <div className="card ocult">
          <div className="name">
            <h3>?????</h3>
          </div>
          <div className="img">
            <h1 className="Slackey">?</h1>
          </div>
          <div className="types">
            {types &&
              types.map((type) => (
                <div className={`type1 ${type}`}>
                  <span>{type}</span>
                </div>
              ))}
          </div>
          <div className="num">
            <span>N°?</span>
          </div>
        </div>
      )}
      {Style === "Back" && (
        <div className="backcard">
          <img src={Backcard} alt="" />
        </div>
      )}
      {Style === "List" && (
        <div className="backcard">
          <img src={img} alt="" />
        </div>
      )}
    </>
  );
}

export default Card;
