const { getArtists } = require('../query')

const { Holding } = require('../../../db/models')
const { holdingMap } = require('../map')

module.exports = async (parent, { spotifyIds }, { userId, accessToken }) => {
  const artists = await getArtists(null, { spotifyIds }, { accessToken })
  const holdings = await Holding.bulkCreate(
    artists.map(artist => ({
      userId,
      spotifyId: artist.spotifyId,
      info: artist
    }))
  )
  return holdings.map((holding, i) => ({
    ...holdingMap(holding),
    artist: artists[i]
  }))
}
