const getArtists = require('./getArtists')
const getTracks = require('./getTracks')

const albumAssetIds = albums => {
  return [
    albums.flatMap(album => album.tracks.items.map(track => track.id)),
    albums.flatMap(album => album.artists.map(artist => artist.id))
  ]
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

  return albums.map(album => ({
    ...album,
    tracks: assets[0].splice(0, album.tracks.items.length),
    artists: assets[1].splice(0, album.artists.length)
  }))
}
