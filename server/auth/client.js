const SpotifyWebApi = require('spotify-web-api-node')
const { Session } = require('../db/models')

module.exports = ({ session, headers }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })

  const refreshToken = async data => {
    spotifyWebApi.setRefreshToken(data.refreshToken)
    const { body } = await spotifyWebApi.refreshAccessToken()
    data.accessToken = body.access_token
    data.expiresAt = body.expires_in * 1000 + Date.now()
    return data
  }
  const validUser = userSession => userSession.accessToken

  const getUserToken = async userSession => {
    if (userSession.expiresAt < Date.now()) await refreshToken(userSession)
    return userSession.accessToken
  }

  const validLocalDev = localHeaders => {
    const { graphql, host } = localHeaders
    const localDev = host === 'localhost:' + process.env.PORT
    return localDev && graphql
  }

  const getGraphQLToken = async localHeaders => {
    const adminSession = await Session.findByPk(localHeaders.graphql)
    if (!adminSession) console.log('<<< OLD SESSION ID >>>')
    const data = JSON.parse(adminSession.data)

    if (data.expiresAt < Date.now()) {
      const newData = await refreshToken(data)
      adminSession.data = JSON.stringify(newData)
      adminSession.save()
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
      appAuth === null // null passed for scopeless api (rate limiting)
        ? await getAppToken() // scopeless, no auth needed
        : validUser(session) // auth needed, confirm valid user
          ? await getUserToken(session) // confirm userToken is current, refresh if necessary
          : validLocalDev(headers) // no valid user, confirm local dev
            ? await getGraphQLToken(headers) // confirm graphqlToken is current, refresh if necessary
            : await getAppToken() // otherwise, use app credentials as fallback

    spotifyWebApi.setAccessToken(accessToken)
    return spotifyWebApi
  }
}
