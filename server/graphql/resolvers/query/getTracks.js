const getArtists = require('./getArtists')

module.exports = async (parent, { trackIds }, req) => {
  const spotifyApi = await req.spotify(null)

  const tracks = []
  while (trackIds.length) {
    const { body } = await spotifyApi.getTracks(trackIds.splice(0, 50))
    tracks.push(...body.tracks.filter(Boolean))
  }

  const artistIds = tracks.flatMap(track => track.artists.map(artist => artist.id))
  const trackArtists = await getArtists(parent, { artistIds }, req)

  return tracks.map(track => {
    const artists = trackArtists.splice(0, track.artists.length)
    const { album } = track
    return {
      ...track,
      artists,
      album: {
        id: album.id,
        name: album.name,
        artists: album.artists
      },
      images: album.images,
      followers: artists.reduce((p, c) => ({ followers: p.followers + c.followers })).followers
    }
  })
}
