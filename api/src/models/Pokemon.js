const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //ModeloPokemon:
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: { type: DataTypes.INTEGER, validate: {min: 1, max: 100} },
    attack: { type: DataTypes.INTEGER, validate: {min: 1, max: 100} },
    defense: { type: DataTypes.INTEGER, validate: {min: 1, max: 100} },
    speed: { type: DataTypes.INTEGER, validate: {min: 1, max: 100} },
    height: { type: DataTypes.INTEGER, validate: {min: 1, max: 100} },
    weight: { type: DataTypes.INTEGER, validate: {min: 1, max: 100} },
    abilities: { type: DataTypes.JSON },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://c.tenor.com/FbsWcdzdAhUAAAAC/pokemon-pokeball.gif",
      validate: {
        isUrl: true
      }
    }
  },
  { timestamps: false }
  );
};
