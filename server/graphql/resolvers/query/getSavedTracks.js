const getTracks = require('./getTracks')

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const limit = 50
  const { body: savedTracks } = await spotifyApi.getMySavedTracks({ limit })

  while (savedTracks.offset + savedTracks.items.length < savedTracks.total) {
    const offset = (savedTracks.offset += limit)
    const { body } = await spotifyApi.getMySavedTracks({ limit, offset })
    savedTracks.items.push(...body.items)
  }

  const trackIds = savedTracks.items.map(savedTrack => savedTrack.track.id)
  return getTracks(parent, { trackIds }, req)
}
