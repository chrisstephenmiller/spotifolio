const { Holding } = require('../../../db/models')

module.exports = (parent, { holdingIds, spotifyIds }, { user }) => {
  const userId = user.id

  if (holdingIds === spotifyIds) return Holding.findAll({ where: { userId } })

  return [
    ...holdingIds.map(holdingId => Holding.findByPk(holdingId)),
    ...spotifyIds.map(spotifyId => Holding.findOne({ where: { userId, spotifyId } }))
  ]
}
