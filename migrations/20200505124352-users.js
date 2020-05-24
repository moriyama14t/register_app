'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn('users', 'question', {
        type: Sequelize.STRING,
      }))
  },


  down: (queryInterface, Sequelize) => {
  }
};
