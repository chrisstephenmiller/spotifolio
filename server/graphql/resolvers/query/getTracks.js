const getArtists = require('./getArtists')

module.exports = async (parent, { trackIds }, req) => {
  const spotifyApi = await req.spotify(null)

  const tracks = []
  while (trackIds.length) {
    const { body } = await spotifyApi.getTracks(trackIds.splice(0, 50))
    tracks.push(...body.tracks)
  }

  const artistIds = tracks.flatMap(track =>
    track.artists.map(artist => artist.id)
  )
  const artists = await getArtists(parent, { artistIds }, req)

  return tracks.map(track => ({
    name: track.name,
    spotifyId: track.id,
    artists: artists.slice(0, track.artists.length),
    popularity: track.popularity,
    album: track.album
  }))
}
