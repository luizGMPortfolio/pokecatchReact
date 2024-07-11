/* eslint-disable react/prop-types */
//css
import "./Rewards.css";

//hooks

import { useCloud } from "../../hooks/useCloud";
import { useState, useEffect } from "react";

//components
import Card from "../Card/Card";

// eslint-disable-next-line react/prop-types
const Rewards = ({ rewards, setRewards, user }) => {
  const { documents, GetDocuments, UpdateDocuments } = useCloud();

  const [pokemons, setPokemons] = useState([]);
  const [pokebolas, setPokebolas] = useState({});
  const [time, setTime] = useState([]);
  const [species, setSpecies] = useState(null);
  const [cards, setCards] = useState(0);
  const [legendary, setLegendary] = useState(0);

  useEffect(() => {
    async function LoadData() {
      await GetDocuments("itens", user.uid);
    }
    LoadData();
  }, [user]);

  useEffect(() => {
    if (documents) {
      setCards([...documents.cards, rewards.pokemon]);
      setPokebolas({
        pokebola:
          documents.pokebolas.pokebola + rewards.pokebolas.pokebolas.pokebola,
        great: documents.pokebolas.great + rewards.pokebolas.pokebolas.great,
        ultra: documents.pokebolas.ultra + rewards.pokebolas.pokebolas.ultra,
        master: documents.pokebolas.master + rewards.pokebolas.pokebolas.master,
      });
    }
  }, [documents]);

  const handleUpdate = () => {
    const DataItens = {
      cards,
      pokebolas,
    };

    UpdateDocuments("itens", documents.id, DataItens);

    setRewards(null);
  };

  return (
    <div className="inicial">
      {rewards && (
        <div className="title">
          <h3>Catch</h3>
          <h1>{rewards.pokemon.name}</h1>
        </div>
      )}
      <div>
        {!rewards && <Card Style={"Back"} />}
        {rewards && (
          <Card
            name={rewards.pokemon.name}
            img={rewards.pokemon.sprite.padrão}
            types={rewards.pokemon.types}
            num={rewards.pokemon.id}
          />
        )}
        <footer className="kanit white">
          <span>+</span>
          {rewards.pokebolas.imagem && (
            <div className="items">
              <img src={rewards.pokebolas.imagem} alt="" />
              <span>x{rewards.pokebolas.quantidade}</span>
            </div>
          )}
        </footer>
      </div>
      <div className="ButtonContainer">
        <button onClick={handleUpdate} className="btn-default kanit">OK</button>
      </div>
    </div>
  );
};

export default Rewards;
