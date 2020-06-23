const spotifyApi = require('../../../spotify')
const { profileMap } = require('../map')

module.exports = async (parent, args, { userId, accessToken }) => {
  const spotify = await spotifyApi(accessToken)
  const { body } = await spotify.getMe()
  return {
    id: userId,
    ...profileMap(body)
  }
}
