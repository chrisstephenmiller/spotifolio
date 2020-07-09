const getArtists = require('./getArtists')

const idToSpotifyId = ({ name, id }) => ({ spotifyId: id, name })

const trackAlbumMap = album => {
  return {
    ...idToSpotifyId(album),
    artists: album.artists.map(idToSpotifyId)
  }
}

const trackArtistsMap = (track, trackArtists) => {
  const { name, id, popularity, album, artists } = track
  return {
    artists: trackArtists.splice(0, artists.length),
    album: trackAlbumMap(album),
    spotifyId: id,
    name,
    popularity
  }
}

module.exports = async (parent, { trackIds }, req) => {
  const spotifyApi = await req.spotify(null)

  const tracks = []
  while (trackIds.length) {
    const { body } = await spotifyApi.getTracks(trackIds.splice(0, 50))
    tracks.push(...body.tracks.filter(Boolean))
  }

  const artistIds = tracks.flatMap(track => track.artists.map(artist => artist.id))
  const trackArtists = await getArtists(parent, { artistIds }, req)

  return tracks.map(track => trackArtistsMap(track, trackArtists))
}
