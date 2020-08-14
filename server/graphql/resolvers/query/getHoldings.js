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

const calcChange = (a, v) => Math.ceil(10000 * ((v - a) / a)) / 100
const calcFollowers = asset =>
  !asset.artists
    ? asset.followers
    : asset.artists.reduce((p, c) => ({ followers: p.followers + c.followers })).followers

const holdingsWithAssetsAndValues = (holdings, assets) => {
  const assetDict = Object.fromEntries(assets.map(asset => [asset.id, asset]))
  for (const holding of holdings) {
    holding.value = holding.value || assetDict[holding.spotifyId]
    holding.popularity = calcChange(holding.asset.popularity, holding.value.popularity)
    holding.followers = calcChange(calcFollowers(holding.asset), calcFollowers(holding.value))
    holding.performance = (holding.popularity + holding.followers).toFixed(2)
  }
  return holdings
}

module.exports = async (parent, args, req) => {
  const userId = req.user.id
  const holdings = await Holding.findAll({ where: { userId }, raw: true })
  const variables = getAssetQueryVariables(holdings)
  const assets = await getAssets(parent, variables, req)
  return holdingsWithAssetsAndValues(holdings, assets)
}
