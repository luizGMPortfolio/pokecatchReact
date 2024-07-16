import "./How.css";

import { useEffect, useState } from "react";

import { Time } from "../../hooks/useTime";

import Background from "../../components/Background/Background";
import Game from "../../components/Game/Game";
import Navbar from "../../components/Navbar/Navbar";

const How = ({ setRewards }) => {
  const { horarioAtual } = Time();

  const [background, setBackground] = useState("Who");
  const [Stage, setStage] = useState("inicial");

  return (
    <>
      <Background type={background} />
      <Navbar />
      <div className="How">
        <div className="title">
          <h3>Quem é esse</h3>
          <h1>Pokemon?</h1>
        </div>
        <Game
          setBackground={setBackground}
          setRewards={setRewards}
          setStage={setStage}
          Stage={Stage}
        />
        {Stage === "inicial" && (
          <div className="alert hub SlideAnimationLeft">
            <span>{horarioAtual}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default How;
