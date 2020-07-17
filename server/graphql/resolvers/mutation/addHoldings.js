const { Holding } = require('../../../db/models')
const { getAssets } = require('../query')

const makeHolding = (userId, asset) => {
  const { spotifyId } = asset
  return Holding.findOrCreate({
    where: { userId, spotifyId, destroyedAt: null },
    defaults: { userId, spotifyId, asset },
    raw: true
  })
}

const userBroker = (userId, assets) => Promise.all(assets.map(asset => makeHolding(userId, asset)))

module.exports = async (parent, { artistIds, trackIds, albumIds }, req) => {
  const assets = await getAssets(null, { artistIds, trackIds, albumIds }, req)
  const holdings = await userBroker(req.user.id, assets)
  return holdings.map((holding, index) => {
    return {
      ...(holding[1] ? holding[0].get() : holding[0]),
      asset: assets[index]
    }
  })
}
