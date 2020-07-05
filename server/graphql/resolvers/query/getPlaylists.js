const getPlaylist = require('./getPlaylist')

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()
  const { body } = await spotifyApi.getUserPlaylists()
  return Promise.all(
    body.items.map(playlist =>
      getPlaylist(parent, { playlistId: playlist.id }, req)
    )
  )
}
