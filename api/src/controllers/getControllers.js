const axios = require("axios");
const { Pokemon, Type }= require("../db.js")

//Esta función me permite traerme la info de todos los pokemon desde la pokeapi
const pokemonInfoFromApi= async ()=> {

  try {
    //Aquí se guardará toda la información que deseo mostrar de los pokemon.
    let allInfo= [];
    
    //Acá obtengo el objeto "data" que contiene la propiedad "results" que es un arreglo de objetos,
    //donde cada objeto contiene el nombre del pokemon y la url con la información detallada de cada pokemon. 
    const gettingUrl= await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40");
    
    //En esta variable guardaré un arreglo de objetos "data" donde cada uno de esos objetos contiene la información
    // detallada de cada pokemon (Esto será un arreglo de promesas)
    let promisesUrls= gettingUrl.data.results?.map((pok)=> axios.get(pok.url));

    //A continuación manejo la respuesta de mi arreglo de promesas, haciendo un push a mi arreglo "allInfo" 
    //de cada una de las propiedades que quiero que se muestren (id, name, attack, defense, etc...) 
    await axios.all(promisesUrls).then((pokUrl)=> {
      pokUrl?.map((pokInfo)=> {
        allInfo.push({
          id: 'API_' + pokInfo.data.id,
          name: pokInfo.data.name[0].toUpperCase()+pokInfo.data.name.slice(1),
          hp: pokInfo.data.stats.find(d => d.stat.name==="hp").base_stat,
          attack: pokInfo.data.stats.find(d => d.stat.name==="attack").base_stat,
          defense: pokInfo.data.stats.find(d => d.stat.name==="defense").base_stat,
          speed: pokInfo.data.stats.find(d => d.stat.name==="speed").base_stat,
          height: pokInfo.data.height,
          weight: pokInfo.data.weight,
          abilities: pokInfo.data.abilities.map(ab => ab.ability.name),
          image: pokInfo.data.sprites.other.dream_world.front_default,
          types: pokInfo.data.types.map(t => t.type.name)
            }
          )
        }
      )
    }
  )
  return allInfo;
  } catch (error) {
    console.log({error: error.message})  
        
  }
}


//Esta función me permitirá traerme toda la info de los pokemon que tenga en mi Base de Datos
const pokemonInfoFromDB= async () => {
  try {
    const myPokemons= await Pokemon.findAll({
      include: [{
        model: Type,
        attributes: ["name"],
        through: {attributes: []}
      }]
  });
    if (myPokemons) return myPokemons;
    else return false;
    
  } catch (error) {
    console.log({error: error.message})
  } 
}

//Acá concateno toda la información de los pokemon, los de la API + los de la BD
const completeInfo= async ()=> {
  const apiPokemonInfo= await pokemonInfoFromApi();
  try {      
      const dbPokemonInfo= await pokemonInfoFromDB();
      if(dbPokemonInfo){
        const formatData= dbPokemonInfo.map(p=> {
          return {...p.dataValues, types: p.dataValues.types.map(e=> e.name)}
      })
      return [...apiPokemonInfo, ...formatData];
    } else {
        return apiPokemonInfo;      
      }          
  } catch (error) {
    console.log("COMPLETE INFO:", error)
    console.log({error: error.message})
  }
  
}

//===================REQUEST AND RESPONSE HANDLERS=============================================

//Manejador de ruta '/' bien sea que reciba un nombre de pokemon por query o no
const asyncGetPokemons=  async (req, res)=> {
  try {
    const { name }= req.query;
    const allpoks= await completeInfo();

    if (name){
      const poksByName= allpoks?.filter((pok)=> pok.name.toLowerCase() === name.toLowerCase());
      if (poksByName.length > 0) {
        res.status(200).json(poksByName)
      }  else {res.status(404).json({error: 'Pokemon not found'})}
    } 
    else {
      res.status(200).json(allpoks);
    }
    
  } catch (error) {
    res.status(400).json({error: error.message})
    console.log("GET TOTAL:",error)
    console.log({error: error.message})    
  }
}

const asyncGetPokemonsById= async (req, res, next)=> {
  try {
    const id = req.params.id;
    const myPok= await completeInfo();
    if (id && myPok) {
      const wantedPok= myPok.find(p => p.id.toString()===id); 
      wantedPok ? res.json(wantedPok) : res.status(404).json({
        error: "ID doesn't exist"
      })
    }          
  } catch (error) {
    console.log("BY ID:",error)
    console.log({error: error.message})    
  }
  next();
}

const asyncGetTypes= async (req, res)=> {
  try {
    let dBTypes= await Type.findAll();
    if (!dBTypes.length){
      let aux= await axios.get("https://pokeapi.co/api/v2/type")
      
      let allAPITypes= aux.data.results.map(t => t.name);
      res.status(200).json(allAPITypes)
    
      let id=1;
      dBTypes= allAPITypes.map(t => {
        Type.create({
          name: t,
          id: id++
        }
        )})
        
      } else {
        res.status(200).json(dBTypes);
      }
        
  } catch (error) {
    console.log(error)
    console.log({error: error.message})
  }
}

module.exports = {
  pokemonInfoFromDB,
  completeInfo,
  asyncGetPokemons,
  asyncGetPokemonsById,
  asyncGetTypes
}
