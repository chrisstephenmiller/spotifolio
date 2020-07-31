const { Holding } = require('../../../db/models')

const getAssets = require('./getAssets')

const getAssetQueryVariables = holdings => {
  const variables = { artistIds: [], trackIds: [], albumIds: [] }
  holdings.forEach(holding => {
    const { asset, spotifyId, value } = holding
    const assetType = asset.tracks ? 'album' : asset.genres ? 'artist' : 'track'
    if (!value) variables[assetType + 'Ids'].push(spotifyId)
  })
  return variables
}

const makeAssetsDict = assets => Object.fromEntries(assets.map(asset => [asset.spotifyId, asset]))

module.exports = async (parent, { holdingIds, spotifyIds }, req) => {
  const userId = req.user.id

  if (holdingIds === spotifyIds) {
    const holdings = await Holding.findAll({ where: { userId }, raw: true })
    const variables = getAssetQueryVariables(holdings)
    const assets = await getAssets(parent, variables, req)
    const assetDict = makeAssetsDict(assets)
    for (const holding of holdings) holding.value = holding.value || assetDict[holding.spotifyId]
    return holdings
  }

  return [
    ...holdingIds.map(holdingId => Holding.findByPk(holdingId)),
    ...spotifyIds.map(spotifyId => Holding.findOne({ where: { userId, spotifyId } }))
  ]
}
