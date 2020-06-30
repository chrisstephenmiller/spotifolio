const { profileMap } = require('../map')

module.exports = async (parent, args, req) => {
  const { body } = await req.spotify.getMe()
  return {
    id: req.user.id,
    ...profileMap(body)
  }
}
