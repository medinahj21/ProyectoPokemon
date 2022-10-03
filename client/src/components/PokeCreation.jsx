import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../redux/actions/actions.js"
import { validate, validateSelection } from "./validators/validators.js"
import "./styles/PokeCreation.css";

function PokeCreation(){
  const dispatch= useDispatch();
  const history= useHistory();
  const pokeTypes= useSelector(state=> state.types);
  const pokemons= useSelector(state=> state.allPokemons);

  const [errors, setErrors]= useState({other:""});
  const [disabled, setDisabled]= useState(true);
  
  
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
    poke_typesName: [],
    image: ""
    })

  function validatePoke(){
    console.log("Dentro de ValidatePOke",errors)
    if (JSON.stringify(errors)==="{}"){
      console.log("INPUT", input)
    /*   const checkPoke;
    Object.keys(input) */
      if(input.name ==="")setDisabled(true)
      else setDisabled(false)
    }
    
    
  }

  let validateErrors;
  function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value})
    validateErrors= validate({...input, [e.target.name]: e.target.value}, pokemons)
     console.log("VALIDATERRORS...",validateErrors)
     if (validateErrors)setErrors(validateErrors)  
     console.log("ANTES DE VALIDATEPOKE",errors)
       
  }
  
  function handleSelection(e){
    if (input.poke_types.length < 3){
      setInput({
        ...input,
        poke_types: [...input.poke_types, pokeTypes.find(t=> t.name=== e.target.value).id],
        poke_typesName: [...input.poke_typesName, e.target.value]  }
        )
      }
       
    }


      //console.log("POKE_TYPES:",input.poke_types)

      //let validateTypesErrors= validateSelection(input)
      //console.log("Validacion-->", validateTypesErrors)

      

      /* if (JSON.stringify(validateTypesErrors)=== "{}"){
        setDisabled(false)
      } else {
        setDisabled(true)
      } */
      
      //setErrorSelection(validateTypesErrors)
    
  
    //JSON.stringify(errors !== "{}" ) ? setDisabled(false) : setDisabled(true) 
  

  function handleDeleteTypes(e){
    setInput({
      ...input,
      poke_typesName: input.poke_typesName.filter(t => t !== e.currentTarget.innerHTML.split(" ")[0])
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(createPokemon(input))
    alert("POKEMON CREATED SUCCESSFULLY")
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
      history.push("/home");
  }


  return (
    <div className="background-create">
      <h1>CREATE A POKEMON BY SETTING CUSTOM FEATURES</h1>
      <div className="main">
        <form onSubmit={(e)=> handleSubmit(e)}>
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
              {errors.name && <p className="errors">{errors.name}</p>}
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
              {errors.image && <p className="errors">{errors.image}</p>}
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
              {errors.abilities && <p className="errors">{errors.abilities}</p>}
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
                {input.poke_typesName.map((t, index)=> {
                    return (<div key={index}>
                      <span className="option" value="toDelete" onClick={(e)=> handleDeleteTypes(e)}>{t} DELETE</span>
                      
                    </div>
                )})}
                {!(validateSelection(input).poke_typesName) ? "" : (<p className="errors">Please, choose from 1 to 2 pokemon types</p>) }
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
                {errors.hp && <p className="errors">{errors.hp}</p>}
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
                {errors.attack && <p className="errors">{errors.attack}</p>}
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
                {errors.defense && <p className="errors">{errors.defense}</p>}
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
                {errors.speed && <p className="errors">{errors.speed}</p>}
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
                {errors.height && <p className="errors">{errors.height}</p>}
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
                {errors.weight && <p className="errors">{errors.weight}</p>}
            </div>
            <br />
          </div>
          <div className="div-button-create">
            {
              JSON.stringify(errors==="{}") && input.name && setDisabled(true)
            }
            <input
              className="button-create"
              type="submit"
              value={"BOTON"}
              disabled={disabled}
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
  )
}

export default PokeCreation;
