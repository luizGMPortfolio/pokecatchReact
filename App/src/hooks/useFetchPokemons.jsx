/* eslint-disable no-unused-vars */
//hooks
import { useState, useEffect, useCallback } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase/config";
//imports
import axios from "axios";

export const useFetchPokemons = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [Filters, setFilters] = useState({});
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
          stage: GetEvolveStage(responseEvolves, responsePoke.data)
        });
        //GetSpecie
      }

      set(ref(database, "pokemons"), data);
      return { data };
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
      console.log(poke.name)
      return "Unic";
    }else{
      return 'initial';
    }

  };
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { FetchPokemon, FetchAllPokemons, insertFilters, loading, error };
};
