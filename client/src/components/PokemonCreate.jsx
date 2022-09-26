import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import newPokemonSchema from "./../Schemas/newPokemon";
import ErrorComponent from "./ErrorComponent";
import Joi from "joi"
import { getTypes, createPokemon, getPokemons } from "../redux/actions/actions";

const PokemonCreate = () => {

    const [error, setError] = useState("");

    const [nombre, setNombre] = useState("");
    const [habilidades, setHabilidades] = useState("");
    const [img, setImg] = useState("");
    const [hp, setHP] = useState("");
    const [attack, setAttack] = useState("");
    const [defense, setDefense] = useState("");
    const [speed, setSpeed] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [pokeTypes, setPokeTypes] = useState([]);

    const updateStateFromForm = (key) => {
        return ( event ) => {
            switch (key) {
                case 'nombre':
                    setNombre(event.target.value);
                    break;
                case 'habilidades':
                    setHabilidades(event.target.value);
                    break;
                case 'img':
                    setImg(event.target.value);
                    break;
                case 'hp':
                    setHP(event.target.value);
                    break;
                case 'attack':
                    setAttack(event.target.value);
                    break;
                case 'defense':
                    setDefense(event.target.value);
                    break;
                case 'speed':
                    setSpeed(event.target.value);
                    break;
                case 'height':
                    setHeight(event.target.value);
                    break;
                case 'weight':
                    setWeight(event.target.value);
                    break;
                case 'pokeTypes':
                    setPokeTypes(event.target.value);
                    break;
            }
        }
    }
    const onSubmitEvent = (e) => {
        try {
            const data = {
                name: nombre,
                habilidades,
                image: img,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                poke_types: [parseInt(pokeTypes)],
            }
            Joi.assert(data, newPokemonSchema)
            console.log(data);
        } catch (error) {
            if(error.name ==='ValidationError'){
                setError(error.message);
            }
        }finally{
            e.preventDefault();
        }
    }

    return (
        <>
            <form onSubmit={ onSubmitEvent }>
                <input type="text" placeholder="nombre" value={nombre} onChange={updateStateFromForm("nombre")}/>
                <input type="text" placeholder="habilidades" value={habilidades} onChange={updateStateFromForm("habilidades")} />
                <input type="text" placeholder="img" value={img} onChange={updateStateFromForm("img")} />
                <input type="text" placeholder="HP" value={hp} onChange={updateStateFromForm("hp")} />
                <input type="text" placeholder="Attack" value={attack} onChange={updateStateFromForm("attack")} />
                <input type="text" placeholder="Defense" value={defense} onChange={updateStateFromForm("defense")} />
                <input type="text" placeholder="Speed" value={speed} onChange={updateStateFromForm("speed")} />
                <input type="text" placeholder="Height" value={height} onChange={updateStateFromForm("height")} />
                <input type="text" placeholder="Weight" value={weight} onChange={updateStateFromForm("weight")} />
                <input type="text" placeholder="Types" value={pokeTypes} onChange={updateStateFromForm("pokeTypes")} />
                <button type="submit">ENVIAR</button>
            </form>
            <ErrorComponent error={error}></ErrorComponent>
        </>
    )
}

export default PokemonCreate