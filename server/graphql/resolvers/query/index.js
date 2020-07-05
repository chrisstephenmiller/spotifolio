const getProfile = require('./getProfile')
const getAssets = require('./getAssets')
const getArtists = require('./getArtists')
const getTracks = require('./getTracks')
const getFollowedArtists = require('./getFollowedArtists')
const getPlaylist = require('./getPlaylist')
const getPlaylists = require('./getPlaylists')

module.exports = {
  getProfile,
  getAssets,
  getPlaylist,
  getPlaylists,
  getFollowedArtists,
  getArtists,
  getTracks
}
