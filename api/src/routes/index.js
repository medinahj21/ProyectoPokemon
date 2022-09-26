const { Router } = require('express');
const validator = require('express-joi-validation').createValidator({});
const { asyncGetPokemons, asyncGetPokemonsById, asyncGetTypes}= require ('../controllers/getControllers')
const postPokemonRq = require("./../validators/postPokemonRq")
const {asyncPostPokemon}= require("../controllers/postControllers");
const { asyncDltPokemonsById } = require('../controllers/deleteControllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get("/pokemons", asyncGetPokemons)

router.get("/pokemons/:id", asyncGetPokemonsById)

router.post("/pokemons", validator.body(postPokemonRq), asyncPostPokemon)

router.get("/types", asyncGetTypes)

router.delete("/pokemons/:id", asyncDltPokemonsById)






module.exports = router;
