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

//context
import { AuthProvider } from "./context/AuthContext";

function App() {

  const [user, setUser] = useState(undefined);
  const [rewards, setRewards] = useState(null);
  const [NovoDia, setNovoDia] = useState(null);

  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

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
              <Route path="/" exact element={user ? <How /> : <Navigate to='/login' />} />
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
