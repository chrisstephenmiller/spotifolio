const Sequelize = require('sequelize')
const db = require('../db')

const Holding = db.define('holding', {
  spotifyId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  info: {
    type: Sequelize.JSONB
  }
})

module.exports = Holding
