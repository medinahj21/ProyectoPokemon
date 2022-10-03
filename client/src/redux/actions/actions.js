import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const ERROR_404 = "ERROR_404";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_POKEMONS = "CLEAN_POKEMONS";
export const CLEAR_ERRORS= "CLEAR_ERRORS";
export const FILTER_BY_ORIGIN= "FILTER_BY_ORIGIN";


export const getPokemons = () => {
    return async (dispatch) => {
      try{
        let allPokemons = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
          type: GET_POKEMONS,
          payload: allPokemons.data
        })   
      }catch(error){ 
        console.log(error)
      };         
      }
  }

export const getTypes= () => {
  return async (dispatch) => {
    try{
      const allTypes= await axios.get("http://localhost:3001/types")
      return dispatch({
        type: GET_TYPES,
        payload: allTypes.data
      })
    }catch(error){ console.log(error) }

  }
}

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      let pokemonByName= await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: pokemonByName.data
      })  
    } catch (error) {
      console.log(error)
      return dispatch({
        type: ERROR_404,
        payload: {error: error.message}
      })    
    }    
  }
}

export const clearErrors = ()=>{
  return (dispatch)=> {

    dispatch({
      type: CLEAR_ERRORS,
      payload: {}
    })
  }


}

export const createPokemon = (payload)=> {
  return async (dispatch) => {
    try {
      let response= await axios.post("http://localhost:3001/pokemons", payload)
      
      return response  
    } catch (error) {
      console.log(error)  
      console.log({error: error.message})    
    }    
  }
}

export const filterByType= (pokemonType) => {
  return {
    type: FILTER_BY_TYPE,
    payload: pokemonType
  }
}

export const filterByOrigin= (pokemonOrigin)=>{
  return {
    type: FILTER_BY_ORIGIN,
    payload: pokemonOrigin
  }}

export const getPokemonDetail= (id) => {
  return async (dispatch)=> {
    try {
      let pokemonById= await axios.get(`http://localhost:3001/pokemons/${id}`)
      return dispatch({
        type: GET_POKEMON_DETAIL,
        payload: pokemonById.data
      })  
    } catch (error) {
      console.log(error);
      return dispatch({
        type: ERROR_404,
        payload: {error: error.message}
      })      
    }    
  }
}


export const orderAlphabetical= (payload)=> {
  return {
    type: ALPHABETICAL_ORDER,
    payload
  }
}

export const orderByAttack= (payload)=> {
  return {
    type: ORDER_BY_ATTACK,
    payload
  }
}

export const deletePokemon= (id)=> {
  return async (dispatch)=> {
    try {
      let pokemonToDelete= await axios.delete(`http://localhost:3001/pokemons/${id}`)
      return dispatch({
        type: DELETE_POKEMON,
        payload: pokemonToDelete.data
    })
    } catch (error) {
      console.log(error)      
    }
    
  }
}


export const cleanDetail= ()=> {
  return {
    type: CLEAN_DETAIL,
    payload: null
  }
}

export const cleanPokemons= ()=> {
  return {
    type: CLEAN_POKEMONS,
    payload: []
  }
}



