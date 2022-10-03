const { Pokemon }= require("../db.js");
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

//================VALIDACIONES============================================================

const validateURL = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|bmp)$/.test(url);
};

const validateName = (name) => {
  return /^[a-zA-Z]{1,15}$/.test(name);
};

const validateNumbers = (value) => {
  return /^[1-9][0-9]?$|^100$/.test(value);
};

const validateAbilities = (value) => {
  return /^[a-zA-Z,\s]*$/g.test(value);
};


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
    return res.status(400).json({msg: "Pokemon name already exists"})
  } else if (!pokemon.name || pokemon.name <1){
    return res.status(400).json({error: "A pokemon name must be provided"})
  } else if (!validateName(pokemon.name)){
    return res.status(400).json({error: "Pokemon's name must include only alphabetic characters and has to be shorter than 15 characters"})
  } else if (pokemon.image && !validateURL(pokemon.image)){
    return res.status(400).json({error: "The url format must be jpg, jpeg, png, webp, avif, gif, svg or bmp"})
  } else if (!validateNumbers(pokemon.hp)){
    return res.status(400).json({error: "The hp field must be a number between 1 and 100"})
  } else if (!validateNumbers(pokemon.attack)){
    return res.status(400).json({error: "The attack field must be a number between 1 and 100"})
  } else if (!validateNumbers(pokemon.defense)){
    return res.status(400).json({error: "The defense field must be a number between 1 and 100"})
  } else if (!validateNumbers(pokemon.speed)){
    return res.status(400).json({error: "The speed field must be a number between 1 and 100"})
  } else if (!validateNumbers(pokemon.height)){
    return res.status(400).json({error: "The height field must be a number between 1 and 100"})
  } else if (!validateNumbers(pokemon.weight)){
    return res.status(400).json({error: "The  weight field must be a number between 1 and 100"})
  } else if (!validateAbilities(pokemon.abilities)){
    return res.status(400).json({error: "Please, type the abilities (only letters, spaces and commas allowed)"})
  } else if (pokemon.poke_types.length === 0 || pokemon.poke_types.length > 2) {
    return res.status(400).json({
      error: "The pokemon types must be from 1 to 2"
    })
  } else {
    // Primero se toman los Types y se insertan
  /* const existingTypes = await Type.findAll();

  const unexistingTypes = []; 
  pokemon.poke_types.forEach( (id) => { 
    if( !existingTypes.find(e => e.id === id) ) {
      unexistingTypes.push(id)
    };
  })

  if(unexistingTypes.length > 0){
    return res.status(400).json({msg: "Pokemon type doesn't exists"});
  } */
  
  // insert de Pokemon
  const newPokemon= await Pokemon.create(pokemon);
  newPokemon.addTypes(pokemon.poke_types);
  const createdPokemon = await Pokemon.findByPk(newPokemon.id)
  return res.json(createdPokemon)
  }
  } catch (error) {
    console.log(error)
    console.log({error: error.message})

    return res.status(500).json({msg: "Internal server error"})
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