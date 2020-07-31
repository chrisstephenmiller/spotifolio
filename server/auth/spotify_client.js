const SpotifyWebApi = require('spotify-web-api-node')

module.exports = ({ session, graphql, user }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })

  const refreshToken = async sessionData => {
    spotifyWebApi.setRefreshToken(sessionData.refreshToken)
    const { body } = await spotifyWebApi.refreshAccessToken()
    sessionData.accessToken = body.access_token
    sessionData.expiresAt = body.expires_in * 1000 + Date.now()
    return sessionData
  }

  const validateUserSession = userSession => userSession.accessToken

  const getUserToken = async userSession => {
    if (userSession.expiresAt < Date.now()) await refreshToken(userSession)
    return userSession.accessToken
  }

  const getGraphQLToken = async graphqlSession => {
    const data = JSON.parse(graphqlSession.data)

    if (data.expiresAt < Date.now()) {
      const newData = await refreshToken(data)
      graphqlSession.data = JSON.stringify(newData)
      graphqlSession.save()
      return newData.accessToken
    }

    return data.accessToken
  }

  const getAppToken = async () => {
    // TODO: access_token be peristed, used through expiration period
    const { body } = await spotifyWebApi.clientCredentialsGrant()
    return body.access_token
  }

  return async appAuth => {
    const accessToken =
      appAuth === null || !user // null passed for scopeless api (rate limiting)
        ? await getAppToken() // scopeless, no auth needed
        : validateUserSession(session) // auth needed, confirm user or graphql session
          ? await getUserToken(session) // confirm userToken is current, refresh if necessary
          : await getGraphQLToken(graphql) // confirm graphqlToken is current, refresh if necessary

    spotifyWebApi.setAccessToken(accessToken)
    return spotifyWebApi
  }
}
