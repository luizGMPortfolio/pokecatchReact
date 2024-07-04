import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { useDatabase } from "../../hooks/useDatabase";
import { useFetchPokemons } from "../../hooks/useFetchPokemons";

import Background from '../../components/Background/Background'

const How = () => {
  const { LoadDatabase, addItem } = useDatabase();
  const { FetchAllPokemons } = useFetchPokemons();

  
  return (
    <div>
      <Background  type={'How'}/>
      <Navbar />
    </div>
  );
};

export default How;
