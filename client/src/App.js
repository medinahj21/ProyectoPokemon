import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route exact path= {'/'} component={LandingPage}/>
        <Route path= {'/home'} component={Home}/>
        <Route exact path= '/pokemonCreate' component={PokemonCreate} />
      {/* <Route exact path= '/pokemonDetail/:id' component={PokemonDetail} />* */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
