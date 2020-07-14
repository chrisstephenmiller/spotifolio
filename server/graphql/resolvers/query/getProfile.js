const profileMap = profile => {
  const { display_name, email, id, followers, images } = profile
  return {
    name: display_name,
    username: id,
    followers: followers.total,
    email,
    images
  }
}

module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()
  const { body } = await spotifyApi.getMe()
  console.log(body)
  return profileMap(body)
}