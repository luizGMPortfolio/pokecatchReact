/* eslint-disable no-unused-vars */
//hooks
import { useState, useEffect, useCallback } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase/config";
import { useDatabase } from "./useDatabase";
//imports
import axios from "axios";

import pokebola from "../assets/pokebolas/padão.svg";
import greatBall from "../assets/pokebolas/greatBall.svg";
import ultraBall from "../assets/pokebolas/ultraBall.svg";
import masterBall from "../assets/pokebolas/masterBall.svg";

export const useFetchPokemons = () => {
  const { LoadDatabase } = useDatabase();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [Filters, setFilters] = useState({});

  const [damages, setDamages] = useState();
  const filters = {
    bug: [],
    electric: [],
    fire: [],
    water: [],
    grass: [],
    poison: [],
    flying: [],
    normal: [],
    ground: [],
    fairy: [],
    fighting: [],
    psychic: [],
    ghost: [],
    ice: [],
    rock: [],
    dragon: [],
    dark: [],
  };

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //set filtrers para o db
  const filtersTypes = async (type, id) => {};
  const insertFilters = async () => {
    if (Filters) {
      try {
        set(ref(database, "filters"), {
          bug: Filters.bug,
          electric: Filters.electric,
          fire: Filters.fire,
          water: Filters.water,
          grass: Filters.grass,
          poison: Filters.poison,
          flying: Filters.flying,
          normal: Filters.normal,
          ground: Filters.ground,
          fairy: Filters.fairy,
          fighting: Filters.fighting,
          psychic: Filters.psychic,
          ghost: Filters.ghost,
          ice: Filters.ice,
          rock: Filters.rock,
          dragon: Filters.dragon,
          dark: Filters.dark,
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
  };

  //set pokemons para o db
  const FetchAllPokemons = async () => {
    const data = [];
    try {
      for (let j = 1; j <= 1025; j++) {
        const responsePoke = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/" + j + "/"
        );
        const responseSpecies = await axios.get(
          "https://pokeapi.co/api/v2/pokemon-species/" + j + "/"
        );
        const responseEvolves = await FetchPokemon(
          null,
          null,
          responseSpecies.data.evolution_chain.url
        );

        var DataType = [];
        responsePoke.data.types.map(async (type) => {
          DataType.push(await FetchPokemon(null, null, type.type.url));
        });
        setDamages(DataType)


        //GetPokemon
        var dataType = [];
        responsePoke.data.types.map((type) => {
          dataType.push(type.type.name);
        });
        data.push({
          name: responsePoke.data.name,
          id: responsePoke.data.id,
          sprite: {
            padrão:
              responsePoke.data.sprites.other["official-artwork"].front_default,
            shiny:
              responsePoke.data.sprites.other["official-artwork"].front_shiny,
          },
          types: dataType,
          class: GetClass(responseSpecies.data),
          stage: GetEvolveStage(responseEvolves, responsePoke.data),
          evolves: await GetEvolvesChain(responseEvolves),
          varieties: await GetVarieties(responseSpecies.data),
          moves: GetMoves(responsePoke.data.moves),
          abilities: GetAbilities(responsePoke.data.abilities),
          stats: {
            hp: responsePoke.data.stats[0].base_stat,
            attack: responsePoke.data.stats[1].base_stat,
            defense: responsePoke.data.stats[2].base_stat,
            specialAttack: responsePoke.data.stats[3].base_stat,
            specialDefense: responsePoke.data.stats[4].base_stat,
            speed: responsePoke.data.stats[5].base_stat,
          },
          base_happiness: responseSpecies.data.base_happiness,
          capture_rate: responseSpecies.data.capture_rate,
          height: responsePoke.data.height,
          weight: responsePoke.data.weight,
          copies: 0
        });
        //GetSpecie
      }

      set(ref(database, "pokemons"), data);
    } catch (error) {
      console.log(error);
    }
  };
  const GetClass = (specie) => {
    if (specie.is_legendary) {
      return "Legendary";
    } else if (specie.is_mythical) {
      return "Mythical";
    } else if (specie.is_baby) {
      return "Baby";
    } else {
      return "Normal";
    }
  };
  const GetEvolveStage = (evolves, poke) => {
    if (evolves.chain.evolves_to.length === 0) {
      return "unic";
    } else if (evolves.chain.species.name === poke.name) {
      return "Initial";
    } else if (evolves.chain.evolves_to[0].species.name === poke.name) {
      return "medium";
    } else {
      return "final";
    }
  };
  const GetEvolvesChain = async (evolves) => {
    const ChainEvolves = [];

    ChainEvolves.push(evolves.chain.species.name);

    if (evolves.chain.evolves_to.length != 0) {
      ChainEvolves.push(evolves.chain.evolves_to[0].species.name);

      if (evolves.chain.evolves_to[0].evolves_to.length != 0) {
        ChainEvolves.push(
          evolves.chain.evolves_to[0].evolves_to[0].species.name
        );
      }
    }

    return ChainEvolves;
  };
  const GetVarieties = async (specie) => {
    var data = "No varieties";

    specie.varieties.map(async (varietie) => {
      if (varietie.is_default == false) {
        data = [];
        const pokemon = await FetchPokemon(null, null, varietie.pokemon.url);

        var dataType = [];
        pokemon.types.map((type) => {
          dataType.push(type.type.name);
        });

        data.push({
          name: pokemon.name,
          id: pokemon.id,
          sprite: {
            padrão: pokemon.sprites.other["official-artwork"].front_default,
            shiny: pokemon.sprites.other["official-artwork"].front_shiny,
          },
          types: dataType,
        });
      }
    });

    return data;
  };
  const GetMoves = (moves) => {
    const data = [];
    moves.map((item) => {
      data.push({
        name: item.move.name,
        learn_method: item.version_group_details[0].move_learn_method.name,
        level_learned_at: item.version_group_details[0].level_learned_at,
      });
    });
    return data;
  };
  const GetAbilities = (abilities) => {
    const data = [];

    abilities.map((item) => {
      data.push(item.ability.name);
    });

    return data;
  };

  function GetVeryEfective() {
    const types = [];
    damages.map((damage) => {
      damage.damage_relations.double_damage_to.map((type) => {
        types.push(type.name);
      });
    });
    const veryEfective = types.filter(
      (item, index) => types.indexOf(item) === index
    );

    return veryEfective
  }
  function GetResistence() {
    const types = [];
    damages.map((damage) => {
      damage.damage_relations.half_damage_from.map((type) => {
         types.push(type.name);
      });
    });
    const DoubleResistence = types.filter(
      (item, index) =>
        types.indexOf(item) !== types.lastIndexOf(item) &&
        types.indexOf(item) === index
    );
    const resistence = getUniqueItems(types);
    return {DoubleResistence, resistence}
  }
  function GetLowEffective() {
    const types = [];
    damages.map((damage) => {
      damage.damage_relations.half_damage_to.map((type) => {
        types.push(type.name);
      });
    });
    const VeryEfective = types.filter(
      (item, index) => types.indexOf(item) === index
    );
    return VeryEfective
  }
  function GetLowResistence() {
    const types = [];
    damages.map((damage) => {
      damage.damage_relations.double_damage_from.map((type) => {
        types.push(type.name);
      });
    });
    const DoubleResistence = types.filter(
      (item, index) =>
        types.indexOf(item) !== types.lastIndexOf(item) &&
        types.indexOf(item) === index
    );
    const resistence = getUniqueItems(types);

    return {DoubleResistence, resistence}
  }
  const getUniqueItems = (arr) => {
    const counts = arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    return arr.filter((item) => counts[item] === 1);
  };

  //Busca URL pokeApi
  const FetchPokemon = async (rote, num, Allrote = null) => {
    setLoading(true);

    try {
      if (Allrote) {
        const response = await axios.get(Allrote);
        return response.data;
      } else {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/" + rote + "/" + num + "/"
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false);
  };
  //Sorteia um numero aleatótio
  const RandonNumber = (number) => {
    return Math.floor(Math.random() * number);
  };
  //Busca um pokemon eleatório
  const RandonPokemon = async () => {
    if (cancelled) {
      return;
    }
    setLoading(true);
    try {
      const response = await LoadDatabase("pokemons");

      return response[RandonNumber(1025)];
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  const RandonHowPokemons = async () => {
    if (cancelled) {
      return;
    }
    setLoading(true);

    try {
      const response = [];
      const Data = await LoadDatabase("pokemons");

      for (let index = 0; index < 8; index++) {
        const num = RandonNumber(Data.length);

        Data.map((item) => {
          if (item.id === num) {
            response.push(item);
          }
        });
      }
      response.push(RandonNumber(8));

      return response;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  const RandonPokeball = async () => {
    try {
      const RandonNunber = Math.floor(Math.random() * 100);
      var data = {};
      if (RandonNunber === 0) {
        data = {
          imagem: masterBall,
          quantidade: 1,
          pokebolas: {
            pokebola: 0,
            great: 0,
            ultra: 0,
            master: 1,
          },
        };
      } else if (RandonNunber <= 15) {
        const RandonNunber = Math.floor(Math.random() * 2);
        data = {
          imagem: ultraBall,
          quantidade: RandonNunber + 1,
          pokebolas: {
            pokebola: 0,
            great: 0,
            ultra: RandonNunber + 1,
            master: 0,
          },
        };
      } else if (RandonNunber <= 25) {
        const RandonNunber = Math.floor(Math.random() * 3);
        data = {
          imagem: greatBall,
          quantidade: RandonNunber + 2,
          pokebolas: {
            pokebola: 0,
            great: RandonNunber + 2,
            ultra: 0,
            master: 0,
          },
        };
      } else if (RandonNunber <= 100) {
        const RandonNunber = Math.floor(Math.random() * 4);
        data = {
          imagem: pokebola,
          quantidade: RandonNunber + 4,
          pokebolas: {
            pokebola: RandonNunber + 4,
            great: 0,
            ultra: 0,
            master: 0,
          },
        };
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    FetchPokemon,
    RandonHowPokemons,
    RandonPokemon,
    RandonPokeball,
    FetchAllPokemons,
    loading,
    error,
  };
};
