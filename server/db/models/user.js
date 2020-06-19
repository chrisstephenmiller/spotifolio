const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true
  }
})

module.exports = User
