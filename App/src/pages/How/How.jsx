import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { useDatabase } from "../../hooks/useDatabase";
import { useFetchPokemons } from "../../hooks/useFetchPokemons";

const How = () => {
  const { LoadDatabase, addItem } = useDatabase();
  const { FetchAllPokemons } = useFetchPokemons();
  useEffect(() => {
    console.log(FetchAllPokemons())
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default How;
