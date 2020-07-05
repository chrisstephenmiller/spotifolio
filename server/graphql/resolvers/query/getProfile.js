module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()
  const { body } = await spotifyApi.getMe()
  return {
    id: req.user.id,
    name: body.display_name,
    email: body.email,
    username: body.id,
    followers: body.followers.total,
    imageUrl: body.images[0].url
  }
}
