const Sequelize = require('sequelize')
const db = require('../db')

const Holding = db.define('holding', {
  type: {
    type: Sequelize.ENUM(['artist', 'track', 'album']),
    allowNull: false
  },
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
