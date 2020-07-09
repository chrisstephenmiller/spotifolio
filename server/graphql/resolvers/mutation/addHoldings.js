const { Holding } = require('../../../db/models')
const { getAssets } = require('../query')
const { holdingMap } = require('../map')

const userBroker = (userId, assets) =>
  Promise.all(
    assets.map(asset => {
      const { type, spotifyId } = asset
      return Holding.findOrCreate({
        where: { userId, type, spotifyId, destroyedAt: null },
        defaults: { userId, type, spotifyId, asset }
      })
    })
  )

module.exports = async (parent, { artistIds, trackIds, albumIds }, req) => {
  const assets = await getAssets(null, { artistIds, trackIds, albumIds }, req)
  const holdings = await userBroker(req.user.id, assets)
  return holdings.map(([holding], i) => ({
    ...holdingMap(holding),
    asset: assets[i]
  }))
}
