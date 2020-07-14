const { Holding } = require('../../../db/models')
const { getAssets } = require('../query')

const holdingMap = (holding, asset) => {
  const { id, userId, spotifyId, createdAt } = holding
  return {
    bought: createdAt,
    id,
    userId,
    spotifyId,
    asset
  }
}

const makeHolding = (userId, asset) => {
  const { spotifyId } = asset
  return Holding.findOrCreate({
    where: { userId, spotifyId, destroyedAt: null },
    defaults: { userId, spotifyId, asset }
  })
}

const userBroker = (userId, assets) => Promise.all(assets.map(asset => makeHolding(userId, asset)))

module.exports = async (parent, { artistIds, trackIds, albumIds }, req) => {
  const allAssets = await getAssets(null, { artistIds, trackIds, albumIds }, req)
  const assets = [...allAssets.artists, ...allAssets.tracks, ...allAssets.albums]
  const holdings = await userBroker(req.user.id, assets)
  return holdings.map(([holding], index) => holdingMap(holding, assets[index]))
}
