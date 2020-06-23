const User = require('./user')
const Session = require('./session')
const Holding = require('./holding')

Holding.belongsTo(User)
User.hasMany(Holding)

module.exports = {
  User,
  Session,
  Holding
}
