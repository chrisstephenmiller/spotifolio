const spotifyApi = require('../../../spotify')
const { artistMap } = require('../map')

module.exports = async (parent, args, { accessToken }) => {
  const spotify = await spotifyApi(accessToken)
  const { body } = await spotify.getFollowedArtists()
  return body.artists.items.map(artistMap)
}
