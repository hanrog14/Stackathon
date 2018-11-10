const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('card', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  }, tags: {
      type: Sequelize.TEXT
  }
});