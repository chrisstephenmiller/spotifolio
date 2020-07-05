const getTracks = require('./getTracks')

module.exports = async (parent, { playlistId }, req) => {
  const spotifyUserApi = await req.spotify(null)

  const fields = 'name,id,description,tracks(items.track.id,total,offset)'
  const playlist = await spotifyUserApi.getPlaylist(playlistId, { fields })
  const playlistTracks = playlist.body.tracks

  while (remainingTracks(playlistTracks)) {
    playlistTracks.offset += 100
    const { body } = await spotifyUserApi.getPlaylistTracks(playlistId, {
      offset: playlistTracks.offset
    })
    playlistTracks.items.push(...body.items)
  }

  const trackIds = playlistTracks.items.map(item => item.track.id)
  const tracks = await getTracks(parent, { trackIds }, req)
  return {
    ...playlist.body,
    spotifyId: playlistId,
    tracks
  }
}

const remainingTracks = playlistTracks => {
  const { offset, items, total } = playlistTracks
  return offset + items.length < total
}
