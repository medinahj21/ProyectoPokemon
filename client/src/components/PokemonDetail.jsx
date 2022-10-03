import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { cleanDetail, cleanPokemons, deletePokemon, getPokemonDetail, getPokemons } from "../redux/actions/actions";
import Loading from "./Loading";
import "./styles/PokemonDetail.css";


function PokemonDetail() {
  const dispatch= useDispatch();
  const { id }= useParams();
  const history= useHistory();
  const pokemon= useSelector(state => state.pokemonDetail);
  
  

  useEffect(()=> {
    dispatch(getPokemonDetail(id))
    //dispatch(cleanPokemons())
  }, [dispatch, id])

  function handleClick(){
    dispatch(cleanDetail())
  }

  function handleDelete(){
    if (typeof pokemon.id === "number"){
      dispatch(deletePokemon(id));
      dispatch(cleanDetail());
      dispatch(cleanPokemons());
      alert("Pokemon has been deleted successfully")
      history.push("/home");
    } else {
      alert("Delete an original pokemon is not allowed")
    }
    dispatch(getPokemons())
  }

  return (
  <div>
    { !pokemon ? (
      <Loading />
    ) : (
      <div className="background-detail">
        <div className="pokemon-card-container">
          <div className="pokemon-card">
            <div className="card-background">
            <img
              src={pokemon.image}
              alt="img not found"
              className="image"
            />
            </div>
          </div>
          <div className="card-content">
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <span className="pokemon-type">
              {pokemon.types?.map(t=> ` ${t} `)}
            </span>
            <div className="pokemon-info">
              <p>ID: {pokemon.id}</p>
              <p>Health Power: {pokemon.hp}</p>
              <p>Attack: {pokemon.attack}</p>
              <p>Defense: {pokemon.defense}</p>
              <p>Speed: {pokemon.speed}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>
                Abilities: {pokemon.abilities?.map((a) => `  ${a}  `)}
              </p>
            </div>
            <h4 className="pokemon-details">Pokemon Details</h4>
            <div className="delete-container">
              <button 
              className="deleteButton"
              onClick={()=> handleDelete()}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
        <div className="div-button-detail">
          <Link className="Link" to="/home">
            <button className="button-details" onClick={()=> handleClick()}>
              GO HOME
            </button>
          </Link>
        </div>
      </div>
    )}    
  </div> 
  )
}


export default PokemonDetail;