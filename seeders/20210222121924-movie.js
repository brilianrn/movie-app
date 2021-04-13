'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fs = require('fs')

    let data = JSON.parse(fs.readFileSync('./data/movies.json', {encoding: 'utf-8'}))

    data.map(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Movies', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {})
  }
};
