'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.ProductionHouse, {foreignKey: "ProductionHouseId"})
      Movie.belongsToMany(models.Cast, {
        through: models.MovieCast
      })
    }
  };
  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        tahunKabisat(input){
          if (input % 4 === 0) {
            throw new Error('Tahun terlarang')
          }
        }
      }
    },
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    ProductionHouseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ProductionHouses",
        key: 'id'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};