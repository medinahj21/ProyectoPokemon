export const validateURL = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|bmp)$/.test(url);
};

export const validateName = (name) => {

  return (/^[a-zA-Z]{1,15}$/.test(name));
};

export const validateNumbers = (value) => {
  return /^[1-9][0-9]?$|^100$/.test(value);
};

export const validateAbilities = (value) => {
  return /^[a-zA-Z,\s]*$/g.test(value);
};

export function validate(input, pokemons){
  let errors= {};

  if (!input.name || input.name.length <= 1){
    errors.name= "Name is not valid. Please type a valid name"
  } else if (!validateName(input.name)){
    errors.name= "Only alphabetic characters are allowed and mustn't be larger than 15 characters"
  } else if(
    pokemons.find(p=> p.name.toLowerCase() === input.name.toLowerCase())
  ){
    errors.name= "Pokemon name already exists. Try another one"
  } else if(!validateAbilities(input.abilities) ||
  input.abilities < 2){
    errors.abilities= "Invalid input. Only alphabetic characters, spaces and commas are allowed"
  } else if(input.image && !validateURL(input.image)){
    errors.image= "Please, insert a jpg, jpeg, png, webp, avif, gif, svg, bmp URL"
  } else if (!validateNumbers(input.hp)){
    errors.hp= "Invalid input. Enter a valid number from 1 to 100"
  } else if (!validateNumbers(input.attack)){
    errors.attack= "Invalid input. Enter a valid number from 1 to 100"
  } else if (!validateNumbers(input.defense)){
    errors.defense= "Invalid input. Enter a valid number from 1 to 100"
  } else if (!validateNumbers(input.speed)){
    errors.speed= "Invalid input. Enter a valid number from 1 to 100"
  } else if (!validateNumbers(input.height)){
    errors.height= "Invalid input. Enter a valid number from 1 to 100"
  } else if (!validateNumbers(input.weight)){
    errors.weight= "Invalid input. Enter a valid number from 1 to 100"
  }
  return errors;

}

export function validateSelection(input){
  let errorSelect= {};
  if (input.length === 0 || input.length >2){
    errorSelect.poke_types="Please, choose from 1 to 2 pokemon types";
  } 
  console.log(errorSelect.poke_types)
  return errorSelect;
}



