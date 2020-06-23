const SpotifyWebApi = require('spotify-web-api-node')

module.exports = async (userAccessToken = null) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })

  try {
    if (userAccessToken) {
      spotifyWebApi.setAccessToken(userAccessToken)
    } else {
      const auth = await spotifyWebApi.clientCredentialsGrant()
      spotifyWebApi.setAccessToken(auth.body.access_token)
    }
  } catch (err) {
    console.log(err)
  }

  return spotifyWebApi
}
