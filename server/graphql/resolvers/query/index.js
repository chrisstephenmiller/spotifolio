const getProfile = require('./getProfile')
const getAssets = require('./getAssets')
const getArtists = require('./getArtists')
const getTracks = require('./getTracks')
const getAlbums = require('./getAlbums')
const getFollowedArtists = require('./getFollowedArtists')
const getPlaylist = require('./getPlaylist')
const getUserPlaylists = require('./getUserPlaylists')
const getSavedTracks = require('./getSavedTracks')
const getSavedAlbums = require('./getSavedAlbums')
const getHoldings = require('./getHoldings')

module.exports = {
  getProfile,
  getAssets,
  getPlaylist,
  getSavedTracks,
  getSavedAlbums,
  getUserPlaylists,
  getHoldings,
  getFollowedArtists,
  getArtists,
  getTracks,
  getAlbums
}
