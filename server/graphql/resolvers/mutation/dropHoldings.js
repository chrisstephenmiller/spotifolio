const { Holding } = require('../../../db/models')
const { getAssets } = require('../query')

const getAssetIds = holdings => {
  const assetIds = { artistIds: [], trackIds: [], albumIds: [] }
  for (const holding of holdings) {
    const { asset, spotifyId, value } = holding
    const assetType = asset.tracks ? 'album' : asset.genres ? 'artist' : 'track'
    if (!value) assetIds[assetType + 'Ids'].push(spotifyId)
  }
  return assetIds
}

const dropHoldingsWithValues = (holdings, values) => {
  holdings.forEach((holding, index) => {
    holding.value = values[index]
    holding.destroyedAt = Date.now()
    holding.save()
  })
}

module.exports = async (parent, { holdingIds }, req) => {
  const holdingsToDrop = await Promise.all(holdingIds.map(holdingId => Holding.findByPk(holdingId)))
  const assetIds = getAssetIds(holdingsToDrop)
  const valuesForHoldings = await getAssets(parent, assetIds, req)
  dropHoldingsWithValues(holdingsToDrop, valuesForHoldings)
  return holdingsToDrop
}
