const spotifyApi = require('../../../spotify')

const getProfile = require('./getProfile')
const getArtists = require('./getArtists')
const getFollowedArtists = require('./getFollowedArtists')

module.exports = {
  getProfile,
  getArtists,
  getFollowedArtists
}
