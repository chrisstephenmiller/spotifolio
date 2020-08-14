module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const limit = 50
  const { body: playlists } = await spotifyApi.getUserPlaylists({ limit })

  while (playlists.offset + playlists.items.length < playlists.total) {
    const offset = (playlists.offset += limit)
    const { body } = await spotifyApi.getUserPlaylists({ limit, offset })
    playlists.items.push(...body.items)
  }

  return playlists.items.map(playlist => ({
    ...playlist,
    total: playlist.tracks.total,
    public: playlist.public
  }))
}
