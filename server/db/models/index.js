const User = require('./user')
const Session = require('./session')
const Holding = require('./holding')

Holding.belongsTo(User, { foreignKey: { allowNull: false } })
User.hasMany(Holding, { foreignKey: { allowNull: false } })

module.exports = {
  User,
  Session,
  Holding
}
