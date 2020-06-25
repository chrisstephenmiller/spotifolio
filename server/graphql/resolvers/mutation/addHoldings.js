const { Holding } = require('../../../db/models')
const { getAssets } = require('../query')
const { holdingMap } = require('../map')

module.exports = async (parent, { spotifyIds }, { userId, accessToken }) => {
  const assets = await getAssets(null, { spotifyIds }, { accessToken })
  const holdings = await userBroker(userId, assets)
  return holdings.map(([holding], i) => ({
    ...holdingMap(holding),
    asset: assets[i]
  }))
}

const userBroker = (userId, assets) =>
  Promise.all(
    assets.map(asset => {
      const { spotifyId } = asset
      return Holding.findOrCreate({
        where: { userId, spotifyId, destroyedAt: null },
        defaults: { userId, spotifyId, asset }
      })
    })
  )
