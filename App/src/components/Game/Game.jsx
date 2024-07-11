/* eslint-disable react/prop-types */
import "./Game.css";

import { useEffect, useState } from "react";

import { useAuthValue } from "../../context/AuthContext";
import { useCloud } from "../../hooks/useCloud";

import Inicial from "./Inicial";
import Game2 from "./Game2";
import Game1 from "./Game1";
import Game3 from "./Game3";


const Game = ({setBackground, setRewards}) => {
  const { documents, GetDocuments } = useCloud();
  const { user } = useAuthValue();

  const [Stage, setStage] = useState("inicial");
  const [Configs, setConfigs] = useState();

  useEffect(() => {
    async function LoadData() {
      await GetDocuments("Configs", user.uid);
    }
    LoadData();
  }, [user]);
  useEffect(() => {
    if(documents){
      setConfigs(documents.Games);
    }

  }, [documents]);

  return (
    <>
      {Configs && (
        <>
          {Stage === "inicial" && <Inicial setStage={setStage} />}
          {Stage === "Game1" && (
            <Game1
              setStage={setStage}
              game={Configs.game1}
              setBackground={setBackground}
              setRewards={setRewards}
            />
          )}
          {Stage === "Game2" && (
            <Game2 setStage={setStage} game={Configs.game2} setBackground={setBackground} setRewards={setRewards}/>
          )}
          {Stage === "Game3" && (
            <Game3 setStage={setStage} game={Configs.game3} setBackground={setBackground} setRewards={setRewards}/>
          )}
        </>
      )}
    </>
  );
};

export default Game;
