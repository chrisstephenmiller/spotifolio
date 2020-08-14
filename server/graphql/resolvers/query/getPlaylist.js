const getTracks = require('./getTracks')

module.exports = async (parent, { playlistId }, req) => {
  const spotifyApi = await req.spotify(null)

  const limit = 100
  const { body: playlist } = await spotifyApi.getPlaylist(playlistId, { limit })

  while (playlist.tracks.offset + playlist.tracks.items.length < playlist.tracks.total) {
    const offset = (playlist.tracks.offset += limit)
    const { body } = await spotifyApi.getPlaylistTracks(playlistId, { offset })
    playlist.tracks.items.push(...body.items)
  }

  const trackIds = playlist.tracks.items.map(playlistTrack => playlistTrack.track.id)

  return {
    ...playlist,
    tracks: getTracks(parent, { trackIds }, req)
  }
}
