const userPlaylistsMap = playlist => {
  const { name, id, description, images, tracks } = playlist
  return {
    spotifyId: id,
    total: tracks.total,
    public: playlist.public,
    name,
    description,
    images
  }
}

const remainingPlaylists = playlists => {
  const { offset, total } = playlists
  return offset + playlists.length < total
}

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const limit = 50
  const userPlaylists = await spotifyApi.getUserPlaylists({ limit })
  const playlists = userPlaylists.body.items

  while (remainingPlaylists(playlists)) {
    const offset = (playlists.offset += limit)
    const { body } = await spotifyApi.getUserPlaylists({ limit: 50, offset })
    playlists.items.push(...body.items)
  }

  return playlists.map(userPlaylistsMap)
}
