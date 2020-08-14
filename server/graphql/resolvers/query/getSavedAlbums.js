const getAlbums = require('./getAlbums')

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const limit = 50
  const { body: savedAlbums } = await spotifyApi.getMySavedAlbums({ limit })

  while (savedAlbums.offset + savedAlbums.items.length < savedAlbums.total) {
    const offset = (savedAlbums.offset += limit)
    const { body } = await spotifyApi.getMySavedAlbums({ limit, offset })
    savedAlbums.items.push(...body.items)
  }

  const albumIds = savedAlbums.items.map(savedAlbum => savedAlbum.album.id)
  return getAlbums(parent, { albumIds }, req)
}
