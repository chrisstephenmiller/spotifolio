const getArtists = require('./getArtists')
const getTracks = require('./getTracks')
const getAlbums = require('./getAlbums')

module.exports = async (parent, { artistIds, trackIds, albumIds }, req) => {
  const [artists, tracks, albums] = await Promise.all([
    getArtists(parent, { artistIds }, req),
    getTracks(parent, { trackIds }, req),
    getAlbums(parent, { albumIds }, req)
  ])
  return [...artists, ...tracks, ...albums]
}
