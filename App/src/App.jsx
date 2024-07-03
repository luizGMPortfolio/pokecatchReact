import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import How from "./pages/How/How";
import Pokedex from "./pages/Pokedex/Pokedex";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<How />} />
            <Route path="/Pokedex" element={<Pokedex />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
