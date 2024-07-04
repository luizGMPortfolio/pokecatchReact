/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import { database } from "../firebase/config";
import { ref, get, set, child } from "firebase/database";

export const useDatabase = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  function Ldatabase() {
    console.log("deu certo");
  }

  const LoadDatabase = async (path) => {
    if (cancelled) {
      return;
    }

    setLoading(true);

    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false);
  };
  const addItem = async (path) => {

    const itemsRef = ref(database, path);

    try {
      const usersRef = ref.child('pokemons');
      usersRef.update({
        'alanisawesome': {
          'nickname': 'Alan The Machine'
        },
        'gracehop': {
          'nickname': 'Amazing Grace'
        }
      });

    } catch (error) {
      console.log(error);
      setError(error.message);
    }


  };

  return { LoadDatabase, addItem, error, loading };
};
