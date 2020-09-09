const { Holding } = require('../../../db/models')

const getAssets = require('./getAssets')

const getAssetQueryVariables = holdings => {
  const variables = { artistIds: [], trackIds: [], albumIds: [] }
  holdings.forEach(holding => {
    const { asset, spotifyId, value } = holding
    holding.type = asset.tracks ? 'Album' : asset.genres ? 'Artist' : 'Track'
    if (!value) variables[holding.type.toLowerCase() + 'Ids'].push(spotifyId)
  })
  return variables
}

const calcChange = (a, v) => Math.ceil(10000 * ((v - a) / a)) / 100

const holdingsWithAssetsAndValues = (holdings, values) => {
  const valuesDict = Object.fromEntries(values.map(value => [value.id, value]))
  for (const holding of holdings) {
    const { asset, createdAt, destroyedAt } = holding
    const value = holding.value || valuesDict[holding.spotifyId]
    holding.name = asset.name
    holding.images = asset.images
    holding.popularity = calcChange(asset.popularity, value.popularity)
    holding.followers = calcChange(asset.followers, value.followers)
    holding.performance = +(holding.popularity * 0.5 + holding.followers * 0.5).toFixed(2)
    holding.held = createdAt
    holding.dropped = destroyedAt
  }
  return holdings
}

module.exports = async (parent, { holdingIds }, req) => {
  const userId = req.user.id
  const holdings = holdingIds
    ? await Promise.all(holdingIds.map(holdingId => Holding.findByPk(holdingId)))
    : await Holding.findAll({ where: { userId }, raw: true })
  const variables = getAssetQueryVariables(holdings)
  const assets = await getAssets(parent, variables, req)
  return holdingsWithAssetsAndValues(holdings, assets)
}
