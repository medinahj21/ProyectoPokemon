const { Pokemon, Type }= require("../db.js");
const { completeInfo, pokemonInfoFromDB }= require("./getControllers");

//============REQUEST AND RESPONSE HANDLERS===============================================

const asyncDltPokemonsById= async (req, res)=> {
try {
  const id= Number(req.params.id);
  let pokeToDelete= await Pokemon.findByPk(id);
    
  if (pokeToDelete){
      Pokemon.destroy({
        where: {
          id: id
        }
      })
      let checkedDB= await Pokemon.findByPk(id);
      if (!checkedDB) res.status(201).send(`Pokemon with id ${id} deleted successfully`)}
      else {res.status(404).send(`Pokemon with id ${id} not found`) }
      } catch (error) {
  console.log(error)  
  }
}
    



module.exports= {
  asyncDltPokemonsById
}