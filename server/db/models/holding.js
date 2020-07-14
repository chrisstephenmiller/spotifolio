const Sequelize = require('sequelize')
const db = require('../db')

const Holding = db.define('holding', {
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  asset: {
    type: Sequelize.JSONB,
    allowNull: false
  },
  destroyedAt: {
    type: Sequelize.DATE
  }
})

module.exports = Holding
