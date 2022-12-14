import React from "react";
import { Link } from "react-router-dom";
import "./styles/PokemonCard.css";

function PokemonCard({ id, name, types, image }){
    return (
      <div className="card-container">
        <div className="cards">
          <div className="card-image">
            <Link className="Link" to= {`/pokemonDetail/${id}`}>
              <img className= "pic" src={image} alt= "Img not found"/>
            </Link>
          </div>
          <div className="card-info">
            <h3>{name}</h3>
            <p>{types.map((t)=> ' '+ t + ' ')}</p>
          </div>
        </div>        
      </div>
    )
}

export default PokemonCard;