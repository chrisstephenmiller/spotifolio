const SpotifyWebApi = require('spotify-web-api-node')
const { Session } = require('../db/models')

module.exports = async ({ session, headers }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })

  const validUser = session => session.accessToken

  const getUserToken = async session => {
    if (session.expiresAt < Date.now()) await refreshToken(session)
    return session.accessToken
  }

  const validLocalDev = headers => {
    const { graphql, host } = headers
    const localDev = host === 'localhost:' + process.env.PORT
    return localDev && graphql
  }

  const getGraphQLToken = async headers => {
    const adminSession = await Session.findByPk(headers.graphql)
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
    const appToken = await spotifyWebApi.clientCredentialsGrant()
    return appToken.body.access_token
  }

  const refreshToken = async data => {
    spotifyWebApi.setRefreshToken(data.refreshToken)
    const { body } = await spotifyWebApi.refreshAccessToken()
    data.accessToken = body.access_token
    data.expiresAt = body.expires_in * 1000 + Date.now()
    return data
  }

  try {
    const accessToken = validUser(session)
      ? await getUserToken(session)
      : validLocalDev(headers)
        ? await getGraphQLToken(headers)
        : await getAppToken()

    spotifyWebApi.setAccessToken(accessToken)
    return spotifyWebApi
  } catch (err) {
    console.log(err)
  }
}
