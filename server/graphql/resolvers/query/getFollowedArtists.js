const { artistMap } = require('../map')

module.exports = async (parent, args, req) => {
  const { body } = await req.spotify.getFollowedArtists({ limit: 50 })
  console.log(body.artists.items.length)
  return body.artists.items.map(artistMap)
}
