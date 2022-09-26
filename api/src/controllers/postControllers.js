const { Pokemon, Type }= require("../db.js");
const { completeInfo }= require("./getControllers");

//Esta función me sirve para verificar que el array de id's de "types" que quiero asociar a mi nuevo 
//Pokemon, contenga id's que existan en la tabla Type de mi BD.

/* const matchPokeTypesById= async (arrTypesId)=> {
  let allTypesDB= await Type.findAll(); 
  let controller= [];
  for (let i=0; i<arrTypesId.length; i++){
    let found= allTypesDB.find(e => e.id === arrTypesId[i]);
    if(!found) return `Type with id:${arrTypesId[i]} doesn't exist`;
    else controller.push(found)
  }
  return (controller.map(t => t.id))

} */


//============REQUEST AND RESPONSE HANDLERS===============================================

const asyncPostPokemon = async (req, res)=> {
  try {

  const pokemon ={
    name: req.body.name,
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.speed,
    height: req.body.height,
    weight: req.body.weight,
    abilities: req.body.abilities.split(",").map((ab)=> ab[0].toUpperCase() + ab.slice(1).toLowerCase()),
    image: req.body.image,
    poke_types: req.body.poke_types
  }
  const existingPokemons = await completeInfo();
  if(
    existingPokemons.find(({name})=>name.toLowerCase() === pokemon.name.toLowerCase())  
  ){
    return res.status(400).json({msg: "Nombre de Pokemon existente"})
  }

  // Primero se toman los Types y se insertan
  const existingTypes = await Type.findAll();

  const unexistingTypes = []; 
  pokemon.poke_types.forEach( (id) => { 
    if( !existingTypes.find(e => e.id === id) ) {
      unexistingTypes.push(id)
    };
  })

  if(unexistingTypes.length > 0){
    return res.status(400).json({msg: "Tipo de Pokemon no existe"});
  }
  
  // insert de Pokemon
  const newPokemon= await Pokemon.create(pokemon);
  newPokemon.addTypes(pokemon.poke_types);
  const createPokemon = await Pokemon.findByPk(newPokemon.id)
  return res.json(createPokemon)

  } catch (error) {
    console.log(error)
    console.log({error: error.message})

    return res.status(500).json({msg: "RIP"})
  }
}

module.exports= {
  asyncPostPokemon
}


/* {
  "id":"cr7",
  "name": "chorizord",
  "hp": 56,
  "attack": 67,
  "defense": 78,
  "speed": 45,
  "height": 2,
  "weight": 76,
  "abilities": "swallow, stamp",
  "poke_types": "fat, bug"
} */