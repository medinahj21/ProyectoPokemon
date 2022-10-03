import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, clearErrors } from "../redux/actions/actions";
import searchIcon from "./Images/searchIcon.png";
import "./styles/SearchBar.css";

function SearchBar({ setPageInput, setPage }){
  const dispatch= useDispatch();
  const [name, setName]= useState("");

  

  const handleNameInput= (e)=> {
    setName(e.target.value)
  }

  const handleClick= ()=> {
    dispatch(clearErrors());
    if (name !== ""){
      dispatch(getPokemonByName(name))
        setPageInput(1)
        setPage(1)
      
      setName("")
      
    }
  }

  const onKeyDown= (e)=> {
    if(e.keyCode === 13){
      dispatch(clearErrors());
      if(name !== ""){
        dispatch(getPokemonByName(name))
        
          setPageInput(1)
          setPage(1)
        
        setName("")
        
      }
    }
  }

  return (
    <div>
      <div className="searchBar">
        <input
          className="searchBar-input"
          required
          type="text"
          placeholder="Search..."
          value={name}
          onKeyDown= {(e)=> onKeyDown(e)}
          onChange= {(e)=> handleNameInput(e)}
        />
        <button 
          className="searchBar-button"
          type="submit"
          onClick={(e)=> handleClick(e)}
        >
          <img src={searchIcon} alt="img not found" className="search-icon"/>          
        </button>        
      </div>
    </div>
  )
}

export default SearchBar;