//css
import "./Pokedex.css";
//hooks
import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";

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

  const { LoadDatabase } = useDatabase();

  useEffect(() => {
    async function GetData(){
      setPokemons(await LoadDatabase('pokemons'))
    }
    GetData()
  },);

  return (
    <>
      <Background type={"Pokedex"} />
      <Navbar />
      <div className="pokedex">
        <div className="filters">
          <div className="Search">
            <input type="text" placeholder="Search" />
          </div>

          <div className="filter">
            <div
              className="f-types"
              onMouseMove={() => setShow("type")}
              onMouseLeave={() => setShow("")}
            >
              <div className={`select ${type != "type" ? type : "type"}`}>
                <h4>{type}</h4>
              </div>
              <ul
                name="options"
                id="options"
                className={`options ${show === "type" ? "show" : ""}`}
              >
                <li
                  value="water"
                  onClick={() => setType("type")}
                  className="type"
                >
                  type
                </li>
                <li
                  value="water"
                  onClick={() => setType("water")}
                  className="water"
                >
                  water
                </li>
                <li
                  value="glass"
                  onClick={() => setType("grass")}
                  className="grass"
                >
                  grass
                </li>
                <li
                  value="fire"
                  onClick={() => setType("fire")}
                  className="fire"
                >
                  fire
                </li>
                <li
                  value="fire"
                  onClick={() => setType("electric")}
                  className="electric"
                >
                  electric
                </li>
                <li
                  value="Flying"
                  onClick={() => setType("flying")}
                  className="flying"
                >
                  Flying
                </li>
                <li
                  value="Fighting"
                  onClick={() => setType("fighting")}
                  className="fighting"
                >
                  Fighting
                </li>
                <li
                  value="Poison"
                  onClick={() => setType("poison")}
                  className="poison"
                >
                  Poison
                </li>
                <li
                  value="Ground"
                  onClick={() => setType("ground")}
                  className="ground"
                >
                  Ground
                </li>
                <li
                  value="Rock"
                  onClick={() => setType("rock")}
                  className="rock"
                >
                  Rock
                </li>
                <li
                  value="Psychic"
                  onClick={() => setType("psychic")}
                  className="psychic"
                >
                  Psychic
                </li>
                <li value="Ice" onClick={() => setType("ice")} className="ice">
                  Ice
                </li>
                <li value="Bug" onClick={() => setType("bug")} className="bug">
                  Bug
                </li>
                <li
                  value="Ghost"
                  onClick={() => setType("ghost")}
                  className="ghost"
                >
                  Ghost
                </li>
                <li
                  value="Steel"
                  onClick={() => setType("steel")}
                  className="steel"
                >
                  Steel
                </li>
                <li
                  value="Dragon"
                  onClick={() => setType("dragon")}
                  className="dragon"
                >
                  Dragon
                </li>
                <li
                  value="Dark"
                  onClick={() => setType("dark")}
                  className="dark"
                >
                  Dark
                </li>
                <li
                  value="Fairy"
                  onClick={() => setType("fairy")}
                  className="fairy"
                >
                  Fairy{" "}
                </li>
              </ul>
            </div>
            <div
              className="f-generations"
              onMouseMove={() => setShow("Generations")}
              onMouseLeave={() => setShow("")}
            >
              <div className={`select ${Gen != 0 ? Gen : ""} Generations`}>
                <h4>{Gen != "Generations" ? `${Gen}° Gen` : "Generations"}</h4>
              </div>
              <ul
                name="options"
                id="options"
                className={`options ${show === "Generations" ? "show" : ""}`}
              >
                <li
                  value="1"
                  onClick={() => setGen("Generations")}
                  className=""
                >
                  Generations
                </li>
                <li value="1" onClick={() => setGen(1)} className="">
                  1° Gen
                </li>
                <li value="2" onClick={() => setGen(2)} className="">
                  2° Gen
                </li>
                <li value="3" onClick={() => setGen(3)} className="">
                  3° Gen
                </li>
                <li value="4" onClick={() => setGen(4)} className="">
                  4° Gen
                </li>
                <li value="5" onClick={() => setGen(5)} className="">
                  5° Gen
                </li>
                <li value="6" onClick={() => setGen(6)} className="">
                  6° Gen
                </li>
                <li value="7" onClick={() => setGen(7)} className="">
                  7° Gen
                </li>
                <li value="8" onClick={() => setGen(8)} className="">
                  8° Gen
                </li>
                <li value="9" onClick={() => setGen(9)} className="">
                  9° Gen
                </li>
              </ul>
            </div>
            <div
              className="f-Region"
              onMouseMove={() => setShow("Region")}
              onMouseLeave={() => setShow("")}
            >
              <div
                className={`select ${
                  Region != "Region" ? Region : "Region"
                } Region`}
              >
                <h4>{Region}</h4>
              </div>
              <ul
                name="options"
                id="options"
                className={`options ${show === "Region" ? "show" : ""}`}
              >
                <li value="Region" onClick={() => setRegion("Region")}>
                  Region
                </li>
                <li value="number" onClick={() => setRegion("by number")}>
                  By number
                </li>
                <li value="cresente" onClick={() => setRegion("Cresente")}>
                  cresente
                </li>
                <li value="decresente" onClick={() => setRegion("Degresente")}>
                  degresente
                </li>
                <li value="Alfabect" onClick={() => setRegion("Alfabetc")}>
                  Alfabetc
                </li>
              </ul>
            </div>
          </div>
        </div>
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
            {pokemons && pokemons.map((pokemon) => (
              <>
                <Card
                name={pokemon.name}
                img={pokemon.sprite.padrão}
                types={pokemon.types}
                num={pokemon.id}
              />
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
