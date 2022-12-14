import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByType,
  filterByOrigin,
  getPokemons,
  orderAlphabetical,
  orderByAttack,
  clearErrors
} from "../redux/actions/actions"
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import pokemonStars from "./Images/pokemonStars.png";
import PikachuError from "./Images/PikachuError.gif";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import Paging from "./Paging";
import "./styles/Home.css";

function Home(){
  const dispatch= useDispatch();
  const allPokemons= useSelector(state => state.pokemons);
  const allTypes= useSelector(state => state.types);

  
  const [page, setPage]= useState(1);
  const eachPage= 12;

  
  const maxPages= Math.ceil(allPokemons.length / eachPage)
  const [pageInput, setPageInput]= useState(1);
  const [orderBy, setOrderBy]= useState("");

  

  const error= useSelector((state)=> state.error);

  
  const handleAllPokemons= (e)=> {
    e.preventDefault(e);
    dispatch(clearErrors());
    dispatch(getPokemons()); 
    setPageInput(1);
    setPage(1);
    
  }
  
  const handleTypeOptions= (e)=> {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    
    setPage(1);
    setPageInput(1);
  }

  const handleFilterByOrigin= (e)=> {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value))
    
  }

  const handleOrderAlphabet = (e)=> {
    e.preventDefault(e);
    dispatch(orderAlphabetical(e.target.value));
    setPage(1);
    setPageInput(1);
    setOrderBy(`Ordered ${e.target.value}`)
  }

  

  const handleOrderAttack = (e)=> {
    e.preventDefault(e);
    dispatch(orderByAttack(e.target.value));
    setPage(1);
    setPageInput(1);
    setOrderBy(`Ordered ${e.target.value}`)
  }

  return (
    <div className="background-home">
      <img className="logo" src={pokemonStars} alt="img not found"/>
      <div className="menu-container">
        <div id= "menu">
          <ul>
            <li>
              <button className="home-nav-buttons"
                onClick={(e)=> handleAllPokemons(e)}>
                  SHOW ALL POKEMONS
              </button>
            </li>
            <li>
              <Link className="Link" to={"/pokemonCreateNew"}>
                <button className="home-nav-buttons">CREATE POKEMON</button>
              </Link>
            </li>
            <li>
              <Link className="Link" to={"/"}>
                <button className="home-nav-buttons">LANDING PAGE</button>
              </Link>
            </li>
            <li>
              <SearchBar
              setPageInput= {setPageInput}
              setPage= {setPage}
              
              />
            </li>
          </ul>
        </div>
        <div id="Order-Filter">
          <ul>
            <li>
              <select
                defaultValue="title"
                onChange= {(e)=> handleOrderAlphabet(e)}
              >
                <option value= "title"  disabled={true}>
                Order by: Alphabet
                </option>
                <option value= "asc">A to Z</option>
                <option value= "desc">Z to A</option>
              </select>
            </li>
            <li>
              <select
                defaultValue="title"
                onChange={(e)=> handleOrderAttack(e)}
              >
                <option value= "title"  disabled={true}>
                Order by: Attack
                </option>
                <option value= "powerful">Powerful</option>
                <option value= "weak">Weak</option>
              </select>
            </li>
            <li>
              <select
                defaultValue= "title"
                onChange={(e)=> handleTypeOptions(e)}
              >
                <option value= "title" disabled={true}>
                Filter by: Type
                </option>
                <option value= "all">All</option>
                {
                  allTypes?.map((t) => {
                    return (
                      <option value= {t.name} key= {t.id}>{t.name}</option>
                    );
                  })}
              </select>
            </li>
            <li>
              <select
              defaultValue= "title"
              onChange= {(e)=> handleFilterByOrigin(e)}
              >
                <option value="title" disabled={true}>Filter by: Origin</option>
                <option value= "API">API</option>
                <option value= "CREATED">CREATED</option>
              </select>
            </li>            
          </ul>
        </div>
      </div>
      {error ? (
        <div className="error-container">
          <img src= {PikachuError} alt= "img not found"/>
          <h1>Pokemon not found, please enter another name or load all pokemons</h1>
        </div>
      ): allPokemons.length > 0 ? (
        <div className="grid-container">
          {
            allPokemons.slice((page - 1)*eachPage, (page - 1)*eachPage + eachPage)
            .map((p)=> {
              return (
                <Fragment key= {p.id}>
                  <PokemonCard
                    id= {p.id}
                    image= {p.image}
                    name= {p.name}
                    types= {p.types}
                  />
                </Fragment>
              )
            })
          }
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
      <div className="paging-container">
        <Paging
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          pageInput={pageInput}
          setPageInput={setPageInput}
        />
      </div>
    </div>
  )
}




export default Home;