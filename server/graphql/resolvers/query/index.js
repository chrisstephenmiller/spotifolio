const getProfile = require('./getProfile')
const getAssets = require('./getAssets')
const getArtists = require('./getArtists')
const getTracks = require('./getTracks')
const getAlbums = require('./getAlbums')
const getFollowedArtists = require('./getFollowedArtists')
const getPlaylist = require('./getPlaylist')
const getUserPlaylists = require('./getUserPlaylists')

module.exports = {
  getProfile,
  getAssets,
  getPlaylist,
  getUserPlaylists,
  getFollowedArtists,
  getArtists,
  getTracks,
  getAlbums
}
