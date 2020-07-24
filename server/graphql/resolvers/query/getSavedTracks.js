const getTracks = require('./getTracks')

const remainingItems = items => {
  const { offset, total } = items
  return offset + items.length < total
}

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const limit = 50
  const userSavedTracks = await spotifyApi.getMySavedTracks({ limit })
  const savedTracks = userSavedTracks.body.items

  while (remainingItems(savedTracks)) {
    const offset = (savedTracks.offset += limit)
    const { body } = await spotifyApi.getMySavedTracks({ limit, offset })
    savedTracks.push(...body.items)
  }
  const trackIds = savedTracks.map(savedTrack => savedTrack.track.id)
  return getTracks(parent, { trackIds }, req)
}
