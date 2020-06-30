const { artistMap } = require('../map')
const { trackMap } = require('../map')

module.exports = async (parent, { spotifyIds }, req) => {
  const assets = await Promise.all([
    req.spotify.getArtists(spotifyIds),
    req.spotify.getTracks(spotifyIds)
  ])
  return [
    ...assets[0].body.artists.filter(Boolean).map(artistMap),
    ...assets[1].body.tracks.filter(Boolean).map(trackMap)
  ]
}
