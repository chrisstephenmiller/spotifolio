const spotifyApi = require('../../../spotify')
const { artistMap } = require('../map')
const { trackMap } = require('../map')

module.exports = async (parent, { spotifyIds }, { accessToken }) => {
  const spotify = await spotifyApi(accessToken)
  const artists = (await spotify.getArtists(spotifyIds)).body.artists.filter(
    Boolean
  )
  const tracks = (await spotify.getTracks(spotifyIds)).body.tracks.filter(
    Boolean
  )
  return [...artists.map(artistMap), ...tracks.map(trackMap)]
}
