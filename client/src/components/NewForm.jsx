import React, { useState } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../redux/actions/actions.js"
import { validate, validateSelection, validateName, validateAbilities, validateNumbers, validateURL } from "./validators/validators.js"
import "./styles/PokeCreation.css";

function NewCreation(){
    const dispatch= useDispatch();
    const pokeTypes= useSelector(state=> state.types);
    const myPokemons= useSelector(state=> state.allPokemons)
    

    const [disabled, setDisabled]= useState(true)
    const [types, setTypes]= useState([]);
    const [input, setInput]= useState({
        name: "",
        abilities: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        poke_types: [],
        image: ""
        })

function handleSubmit(e){
  e.preventDefault();
  dispatch(createPokemon(input))
  alert("New Pokemon was created successfully")
setInput({
      name: "",
      abilities: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      poke_types: [],
      image: ""
      });
}

function handleChange(e){
    let errorObj= {};

    if(e.target.name=== "name"){
        if(validateName(e.target.value)){
            setInput({...input, name:e.target.value})
            delete errorObj.name
           } else {
               errorObj.name= "Invalid Name"
           }           

    }
    if(e.target.name=== "image"){
        if(validateURL(e.target.value)){
            setInput({...input, image:e.target.value})
            delete errorObj.image
           } else {
               errorObj.image= "Invalid image"
           }           

    }
    if(e.target.name=== "abilities"){
        if(validateAbilities(e.target.value)){
            setInput({...input, abilities:e.target.value})
            delete errorObj.abilities
           } else {
               errorObj.abilities= "Invalid Abilities"
           }  

    }
    let nums= ["hp", "attack", "defense", "speed", "height", "weight"]
    if(nums.indexOf(e.target.name) !== -1 ){
        if(validateNumbers(e.target.value)){
            setInput({...input, [e.target.name]:e.target.value})
            delete errorObj[e.target.name];
           } else {
               errorObj[e.target.name]= "Invalid input"
           }           

    }
    console.log(input)


}

function nameToId(arr){
    return(
        arr.map(names=> pokeTypes.find(t => t.name===names).id)
    )

}

function handleDeleteTypes(e){
    let aux= types;
    aux.splice(e.currentTarget.value, 1);
    console.log("Target....", e.currentTarget.value)
    console.log("AUXXXXX",aux)
    setTypes(aux)
    setInput({...input, poke_types:nameToId(aux)})  

    console.log(input, types)


}

function handleSelection(e){
    if (types.indexOf(e.target.value) === -1){
        let aux= [...types, e.target.value];
        setTypes(aux);        
        setInput({...input, poke_types: nameToId(aux)})
    }
    console.log(input)
    //validateSelection(types)
  } 

function handleDisabled(e){
    if (!input.name || !input.abilities || !input.hp ||
      !input.attack || !input.defense   || !input.speed ||
      !input.height || !input.weight    || input.poke_types.length===0){
        setDisabled(true)
      } else setDisabled(false)
    }




  return (
    <div>
      <div className="background-create">
      <h1>CREATE A POKEMON BY SETTING CUSTOM FEATURES</h1>
      <div className="main">
        <form onSubmit={(e)=> handleSubmit(e)} onChange= {()=> handleDisabled()}>
          <div className="left-data">
            <div>
              <label>Pokemon Name</label>
              <input
              className="input-create-field"
              type= "text"
              value={input.name}
              name="name"
              placeholder="Type pokemon's name here..."
              onChange={(e)=> handleChange(e)}
              />
              
            </div>
            <br />
            <div>
              <label>Pokemon Image</label>
              <input
                className="input-create-field"
                type= "url"
                value={input.image}
                name="image"
                placeholder="Type url image..."
                onChange={(e)=> handleChange(e)}
              />
              
            </div>
            <br />
            <div>
            <label>Abilities</label>
              <input
                className="input-create-field"
                type= "text"
                value={input.abilities}
                name="abilities"
                placeholder="Type the abilities your pokemon will have..."
                onChange={(e)=> handleChange(e)}
              />
              
            </div>
            <br />
            <div>
              <label>Select Types</label>
                <select
                  disabled= {input.poke_types.length > 2}
                  defaultValue= "title"
                  onChange={(e)=> handleSelection(e)}
                >
                  <option value="title" disabled name="types">
                    Select Types
                  </option>
                  {pokeTypes?.map(t=> {
                    return (
                      <option value={t.name} key={t.id}>
                        {t.name}
                      </option>
                    )
                  })}
                </select>
                {
                    types.length > 0 ?
                      <div>
                        <ul>
                          {types.map((t,index)=> {
                          return ( 
                          <li
                            key={index}
                            value={index} onClick= {(e)=> handleDeleteTypes(e)}
                          >{t} x </li>
                        )
                        })} 
                        </ul>
                      </div>
                    
                    : <p>Select from 1 to 2 types</p>
                }
             </div>
          </div>
          <br />
          <div className="right-data">
            <div>
              <label>HP</label>
              <input 
                className="input-create-field"
                type="number"
                placeholder="Value from 1 to 100"
                value={input.hp}
                name="hp"
                onChange={(e)=> handleChange(e)}
                />
                
            </div>
            <br />
            <div>
              <label>Attack</label>
              <input 
                className="input-create-field"
                type="number"
                placeholder="Value from 1 to 100"
                value={input.attack}
                name="attack"
                onChange={(e)=> handleChange(e)}
                />
                
            </div>
            <br />
            <div>
              <label>Defense</label>
              <input 
                className="input-create-field"
                type="number"
                placeholder="Value from 1 to 100"
                value={input.defense}
                name="defense"
                onChange={(e)=> handleChange(e)}
                />
                
            </div>
            <br />
            <div>
              <label>Speed</label>
              <input 
                className="input-create-field"
                type="number"
                placeholder="Value from 1 to 100"
                value={input.speed}
                name="speed"
                onChange={(e)=> handleChange(e)}
                />
        
            </div>
            <br />
            <div>
              <label>Height</label>
              <input 
                className="input-create-field"
                type="number"
                placeholder="Value from 1 to 100"
                value={input.height}
                name="height"
                onChange={(e)=> handleChange(e)}
                />
                
            </div>
            <br />
            <div>
              <label>Weight</label>
              <input 
                className="input-create-field"
                type="number"
                placeholder="Value from 1 to 100"
                value={input.weight}
                name="weight"
                onChange={(e)=> handleChange(e)}
                />
                
            </div>
            <br />
          </div>
          <div className="div-button-create">            
            <input
              className="button-create"
              disabled= {disabled}
              type="submit"
              value={"CREATE"}
                          />
           

          </div>
        </form>
      </div>
      <br />
      <div className="go-home-button">
        <Link className="Link" to="/home" >
          <button className="home-button">GO HOME</button>
        </Link>
      </div>
    </div>

  </div>
    )

}  


export default NewCreation;