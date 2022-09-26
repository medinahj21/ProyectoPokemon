//importo mis acciones
import { GET_POKEMONS,
GET_POKEMON_BY_NAME,
GET_POKEMON_DETAIL,
ORDER_BY_ATTACK,
FILTER_BY_TYPE,
ERROR_404,
DELETE_POKEMON,
CREATE_POKEMON,
CLEAN_DETAIL,
CLEAN_POKEMONS,
ALPHABETICAL_ORDER,
GET_TYPES } from "../actions/actions";

//configuro mi estado inicial
const initialState= {
    allPokemons: [],
    types: [],
    pokemons: [],
    pokemonDetail: null,
    error: null,
    pokemonsByType: []
}

//exporto un reducer que tenga logica para las actions
export default function reducer(state= initialState, action) {

  switch (action.type){
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
        pokemonsByType: action.payload
      }

    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      }

    case GET_POKEMON_BY_NAME:
      if (!action.payload) return {
        ...state,
        pokemons: action.payload,
        error: "Pokemont doesn't exist"
      }; else {
        return {
          ...state,
          pokemons: action.payload
        }
      }

    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload
      }

    case FILTER_BY_TYPE:
      let fullPokemons= state.allPokemons;
      
      if (action.payload === "all") {
        return {
          ...state,
          pokemonsByType: fullPokemons
          }
      } else {
        let filteredByType= fullPokemons.filter((pok) => {
          return pok.types.includes(action.payload)
        })
        return {
          ...state,
          pokemonsByType: filteredByType
        }
      }

    case ORDER_BY_ATTACK:
      let myPokemons= state.pokemons;
      if (action.payload === "powerful"){
        let orderedByAttack= myPokemons.sort((a,b)=> b.attack - a.attack)
        return {
          ...state,
          pokemons: orderedByAttack
        }
      } else {
        let orderedByAttack= myPokemons.sort((a,b)=> a.attack - b.attack)
        return {
          ...state,
          pokemons: orderedByAttack
        }
      }

    case ALPHABETICAL_ORDER:
      let myPokes= state.pokemons;
      if (action.payload=== "ascending"){
        let orderedA= myPokes.sort((a,b)=> {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        })
        return {
          ...state,
          pokemons: orderedA
        }
      } else {
        let orderedD= myPokes.sort((a,b)=> {
          if (a.name > b.name)return -1;
          if (b.name > a.name)return 1;
          return 0;
        })
        return {
          ...state,
          pokemons: orderedD 
      }
    }
    
    case ERROR_404:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_POKEMON:
      return {
        ...state
      }

    case CREATE_POKEMON:
      return {
        ...state
      }

    case CLEAN_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload
      }

    case CLEAN_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      }

    default:
        return {...state}
}

}