'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieCast.belongsTo(models.Movie, {foreignKey: 'MovieId'})
      MovieCast.belongsTo(models.Cast, {foreignKey: 'CastId'})
    }
  };
  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Role tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'MovieCast',
  });
  return MovieCast;
};


/*
1. npx sequelize migrate:generate --name <isi namanya> // ini ntr dpt 1 file di migration
2. masuk ke filenya trus ubah jadi return queryInterface.addColumn('<nama tabel>s', '<nama column>', Sequelize.<tipe data>) // asyncnya juga di hapus
3. npx sequelize db:migrate
*/