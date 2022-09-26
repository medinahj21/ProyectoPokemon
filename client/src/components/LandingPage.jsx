import React from "react";
import { Link } from "react-router-dom";
import pokemonStars from "../components/Images/pokemonStars.png";
import "./styles/LandingPage.css";

function LandingPage(){
    return (
     <div className="background">
        <div className="logo-container">
          <img className="logo-landing" src={pokemonStars} alt="Img not found" />
        </div>
      <div className="foot-container">
        <Link className="Link" to={"/home"}>
          <button className="button">WELCOME</button>
        </Link>
        <div>
          <h2 className="byHM">BY HECTOR MEDINA</h2>
        </div>
      </div>
    </div>

    )
}

export default LandingPage;