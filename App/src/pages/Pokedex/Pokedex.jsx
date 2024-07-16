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

//context

function Pokedex() {
  const [show, setShow] = useState("");
  const [type, setType] = useState("type");
  const [Gen, setGen] = useState("Generations");
  const [Region, setRegion] = useState("Region");
  const [aba, setAba] = useState("seus");

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

  return (
    <>
      <Background type={"Pokedex"} />
      <Navbar />
      <div className="pokedex">
        <div className="filters">
          <div className="Search">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        {cards && pokemons && (
          <div className="collection">
            <span>{`${cards.length}/${pokemons.length}`}</span>
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
                                />
                              )}
                            </>
                          )}
                        </>
                      ))}
                  </>
                ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokedex;
