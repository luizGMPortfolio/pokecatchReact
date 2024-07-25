import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";

import "./App.css";

import How from "./pages/How/How";
import Pokedex from "./pages/Pokedex/Pokedex";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Loading from './components/Loading//Loading';
import Rewards from './components/Rewards/Rewards';

//hooks
import { useCloud } from "./hooks/useCloud";
import { useFetchPokemons } from "./hooks/useFetchPokemons";
import { Time } from "./hooks/useTime";

//context
import { AuthProvider } from "./context/AuthContext";

function App() {

  const [user, setUser] = useState(undefined);
  const [rewards, setRewards] = useState(null);
  const [DiaAntigo, setDiaAntigo] = useState();
  const { DiaAtual } = Time();

  const { auth } = useAuthentication();
  const {documents, GetDocuments, UpdateDocuments} = useCloud();
  const {RandonPokemon, RandonHowPokemons} = useFetchPokemons()

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);


  useEffect(() => {
    async function LoadData() {
      await GetDocuments("Configs", user.uid);
    }
    if(user){
      LoadData();
    }

  }, [user]);

  useEffect(() => {
    if(documents){
      setDiaAntigo(documents.Date)
    }
  }, [documents]);

  useEffect(() => {

    const updateData =  async () => {
      const game1 = await RandonPokemon();
      const game2= await RandonHowPokemons();
      const game3 = await RandonHowPokemons();

      const DataItens = {
        Date: DiaAtual,
        Games: {
          game1,
          game2,
          game3
        }
      };
  
      UpdateDocuments("Configs", documents.id, DataItens);

    }
    if (user && DiaAntigo) {
      if(DiaAntigo != DiaAtual){
        updateData()
        localStorage.removeItem('Game1')
        localStorage.removeItem('Game2')
        localStorage.removeItem('Game3')
      }
      
    }
  }, [DiaAntigo, user]);




  if (loadingUser) {
    return <Loading />;
  }

  if (rewards) {
    return <Rewards rewards={rewards} setRewards={setRewards} user={user} />
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" exact element={user ? <How setRewards={setRewards}/> : <Navigate to='/login' />} />
              <Route path="/Pokedex" element={user ? <Pokedex /> : <Navigate to='/login' />} />
              <Route path="/Login" element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path="/Register" element={!user ? <Register setRewards={setRewards} /> : <Navigate to='/' />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
