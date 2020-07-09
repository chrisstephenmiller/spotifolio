const getTracks = require('./getTracks')

const remainingTracks = playlistTracks => {
  const { offset, items, total } = playlistTracks
  return offset + items.length < total
}

const playlistTracksMap = (playlist, tracks) => {
  const { name, id, description, images } = playlist
  return {
    spotifyId: id,
    name,
    description,
    images,
    tracks
  }
}

module.exports = async (parent, { playlistId }, req) => {
  const spotifyApi = await req.spotify(null)

  const limit = 100
  const playlist = await spotifyApi.getPlaylist(playlistId, { limit })
  const playlistTracks = playlist.body.tracks

  while (remainingTracks(playlistTracks)) {
    const offset = (playlistTracks.offset += limit)
    const { body } = await spotifyApi.getPlaylistTracks(playlistId, { offset })
    playlistTracks.items.push(...body.items)
  }

  const trackIds = playlistTracks.items.map(item => item.track.id)
  const tracks = await getTracks(parent, { trackIds }, req)

  return playlistTracksMap(playlist.body, tracks)
}
