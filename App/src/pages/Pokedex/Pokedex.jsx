//css
import "./Pokedex.css";

//context
import { useAuthValue } from "../../context/AuthContext";
//hooks
import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { useCloud } from "../../hooks/useCloud";

//components

import Navbar from "../../components/Navbar/Navbar";
import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Info from "../../components/Info/Info";
//context

function Pokedex() {
  const [aba, setAba] = useState("seus");
  const [info, setInfo] = useState(null);

  const [pokemons, setPokemons] = useState();
  const [cards, setCards] = useState([]);

  const { LoadDatabase } = useDatabase();
  const { documents, GetDocuments } = useCloud();
  const { user } = useAuthValue();

  useEffect(() => {
    async function LoadData() {
      setPokemons(await LoadDatabase("pokemons"));
      await GetDocuments("itens", user.uid);
    }
    LoadData();
  }, [user]);
  useEffect(() => {
    if (documents) {
      setCards(documents.cards);
    }
  }, [documents]);

  function VerifyPokemon(id) {
    var igual = false;
    cards.map((card) => {
      if (card.id === id) {
        igual = true;
      }
    });
    return igual;
  }

  if (info) {
    return <Info num={info} setInfo={setInfo} />;
  }

  return (
    <>
      <Background type={"Pokedex"} />
      <Navbar />
      <div className="pokedex">
        {cards && pokemons ? (
          <div className="collection">
            <span>{`${cards.length}/${pokemons.length}`}</span>
          </div>
        ) : (
          <div className="collection">
            <span className="flex-center">
              <div className="blur"></div>/<div className="blur"></div>
            </span>
          </div>
        )}
        <div className="list">
          <div className="abas">
            <div
              className={`seus ${aba === "seus" ? "activeAba" : ""}`}
              onClick={() => setAba("seus")}
            >
              <h2>Seus Pokemons</h2>
            </div>
            <div
              className={`all ${aba === "all" ? "activeAba" : ""}`}
              onClick={() => setAba("all")}
            >
              <h2>Todos</h2>
            </div>
          </div>
          <div className="cards">
            <>
              {pokemons &&
                pokemons.map((pokemon) => (
                  <>
                    {aba === "all" && (
                      <>
                        {VerifyPokemon(pokemon.id) ? (
                          <Card
                            name={pokemon.name}
                            img={pokemon.sprite.padrão}
                            types={pokemon.types}
                            num={pokemon.id}
                            setInfo={setInfo}
                          />
                        ) : (
                          <Card
                            name={pokemon.name}
                            img={pokemon.sprite.padrão}
                            types={pokemon.types}
                            num={pokemon.id}
                            Style={"Uncatch"}
                          />
                        )}
                      </>
                    )}
                    {aba === "seus" &&
                      cards.map((card) => (
                        <>
                          {card.id === pokemon.id && (
                            <>
                              {cards && (
                                <Card
                                  name={card.name}
                                  img={card.sprite.padrão}
                                  types={card.types}
                                  num={card.id}
                                  setInfo={setInfo}
                                />
                              )}
                            </>
                          )}
                        </>
                      ))}
                  </>
                ))}
              {!pokemons && (
                <>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                  <Card Style={'blur'}/>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokedex;
