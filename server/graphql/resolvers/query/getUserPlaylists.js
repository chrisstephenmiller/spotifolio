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

const remainingItems = items => {
  const { offset, total } = items
  return offset + items.length < total
}

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const limit = 50
  const userPlaylists = await spotifyApi.getUserPlaylists({ limit })
  const playlists = userPlaylists.body.items

  while (remainingItems(playlists)) {
    const offset = (playlists.offset += limit)
    const { body } = await spotifyApi.getUserPlaylists({ limit, offset })
    playlists.push(...body.items)
  }

  return playlists.map(userPlaylistsMap)
}
