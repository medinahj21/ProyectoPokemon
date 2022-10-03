import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../redux/actions/actions";
import pokeball from "./Images/pokemon-pokeball.gif";
import "./styles/Nav.css";

 function Nav(){
    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(getPokemons());
        dispatch(getTypes());
        return(()=>
        console.log("ME DESMONTO......."))
    }, [dispatch]
    )

    return(
        <div>
            <div className="img-container">
                <img className="img-ball" src= {pokeball} alt="img not found"/>
            </div>        
        </div>
    )
}

export default Nav;