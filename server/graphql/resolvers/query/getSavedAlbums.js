const getAlbums = require('./getAlbums')

const remainingItems = items => {
  const { offset, total } = items
  return offset + items.length < total
}

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const limit = 50
  const userSavedAlbums = await spotifyApi.getMySavedAlbums({ limit })
  const savedAlbums = userSavedAlbums.body.items

  while (remainingItems(savedAlbums)) {
    const offset = (savedAlbums.offset += limit)
    const { body } = await spotifyApi.getMySavedAlbums({ limit, offset })
    savedAlbums.push(...body.items)
  }

  const albumIds = savedAlbums.map(savedAlbum => savedAlbum.album.id)
  return getAlbums(parent, { albumIds }, req)
}
