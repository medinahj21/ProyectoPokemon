//const Joi = require('joi');

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

  





/* const postPokemonRq = Joi.object({
    name: Joi.string().min(2).max(15).required(),
    hp: Joi.number().min(1).max(100).required(),
    attack: Joi.number().min(1).max(100).required(),
    defense: Joi.number().min(1).max(100).required(),
    speed: Joi.number().min(1).max(100).required(),
    height: Joi.number().min(1).max(100).required(),
    weight: Joi.number().min(1).max(100).required(),
    abilities: Joi.string().pattern(/^[a-zA-Z,\s]*$/),
    image: Joi.alternatives().try(
        Joi.string().pattern(new RegExp("^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|bmp)$"))
    ).default("https://c.tenor.com/FbsWcdzdAhUAAAAC/pokemon-pokeball.gif"),
    poke_types: Joi.array().items(Joi.number()).required()
}); */

module.exports = postPokemonRq