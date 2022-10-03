import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from './components/Home';
import PokeCreation from './components/PokeCreation';
import PokemonDetail from './components/PokemonDetail';
import Nav from './components/Nav';
import './App.css';
import NewCreation from "./components/NewForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">        
        <Nav/>
        <Route exact path= {'/'} component={LandingPage}/>
        <Route path= {'/home'} component={Home}/>
        <Route path= {'/pokemonCreateNew'} component={NewCreation} />
        <Route exact path= '/pokemonDetail/:id' component={PokemonDetail} />        
      </div>
    </BrowserRouter>
  );
}

export default App;
