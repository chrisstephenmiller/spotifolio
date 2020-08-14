module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const { body: profile } = await spotifyApi.getMe()

  return {
    name: profile.display_name,
    username: profile.id,
    followers: profile.followers.total,
    imageUrl: profile.images[0].url,
    email: profile.email
  }
}
