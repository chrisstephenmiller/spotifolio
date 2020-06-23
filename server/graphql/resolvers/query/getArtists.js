const spotifyApi = require('../../../spotify')
const { artistMap } = require('../map')

module.exports = async (parent, { spotifyIds }, { accessToken }) => {
  const spotify = await spotifyApi(accessToken)
  const { body } = await spotify.getArtists(spotifyIds)
  return body.artists.map(artistMap)
}
