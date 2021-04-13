'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fs = require('fs');

    let data = JSON.parse(fs.readFileSync('./data/productionHouses.json'))

    data.map(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('ProductionHouses', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductionHouses', null, {})
  }
};
