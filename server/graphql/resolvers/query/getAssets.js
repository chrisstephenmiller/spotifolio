const { artistMap } = require('../map')
const { trackMap } = require('../map')

module.exports = async (parent, { spotifyIds }, req) => {
  const spotifyApi = await req.spotify(null)
  const assets = await Promise.all([
    spotifyApi.getArtists({ artistIds: spotifyIds }),
    spotifyApi.getTracks({ trackIds: spotifyIds })
  ])
  return [
    ...assets[0].body.artists.filter(Boolean).map(artistMap),
    ...assets[1].body.tracks.filter(Boolean).map(trackMap)
  ]
}
