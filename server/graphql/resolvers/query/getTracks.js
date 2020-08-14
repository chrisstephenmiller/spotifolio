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

  return tracks.map(track => ({
    ...track,
    artists: trackArtists.splice(0, track.artists.length),
    album: {
      id: track.album.id,
      name: track.album.name,
      artists: track.album.artists
    },
    images: track.album.images
  }))
}
