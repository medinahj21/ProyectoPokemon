import Joi from "joi"


const newPokemon = Joi.object({
    name: Joi.string().min(2).max(15).required().messages({
        'string.max': `maximo 15 char`,
        'string.min': `"minimo 2 parce`,
        'string.required': `pana llene eso bien`,
        'string.empty': `pana llene eso bien`
    }),
    hp: Joi.number().min(1).max(100).required(),
    attack: Joi.number().min(1).max(100).required(),
    defense: Joi.number().min(1).max(100).required(),
    speed: Joi.number().min(1).max(100).required(),
    height: Joi.number().min(1).max(100).required(),
    weight: Joi.number().min(1).max(100).required(),
    habilidades: Joi.string().pattern(/^[a-zA-Z,\s]*$/),
    image: Joi.alternatives().try(
        Joi.string().pattern(new RegExp("^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|bmp)$"))
    ).default("https://c.tenor.com/FbsWcdzdAhUAAAAC/pokemon-pokeball.gif"),
    poke_types: Joi.array().items(Joi.number()).required()
});

export default newPokemon