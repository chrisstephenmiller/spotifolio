const getArtists = require('./getArtists')
const getTracks = require('./getTracks')

const albumAssetIds = albums => {
  return [
    albums.flatMap(album => album.tracks.items.map(item => item.id)),
    albums.flatMap(album => album.artists.map(artist => artist.id))
  ]
}

const albumAssetsMap = (album, assets) => {
  const { name, id, popularity, genres, images, tracks, artists } = album
  return {
    tracks: assets[0].splice(0, tracks.items.length),
    artists: assets[1].splice(0, artists.length),
    spotifyId: id,
    name,
    popularity,
    genres,
    images
  }
}

module.exports = async (parent, { albumIds }, req) => {
  const spotifyApi = await req.spotify(null)

  const albums = []
  while (albumIds.length) {
    const { body } = await spotifyApi.getAlbums(albumIds.splice(0, 50))
    albums.push(...body.albums.filter(Boolean))
  }

  const [trackIds, artistIds] = albumAssetIds(albums)

  const assets = await Promise.all([getTracks(parent, { trackIds }, req), getArtists(parent, { artistIds }, req)])

  return albums.map(album => albumAssetsMap(album, assets))
}
