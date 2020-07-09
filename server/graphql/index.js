const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./types')
const resolvers = require('./resolvers')

const { User, Session } = require('../db/models')
const spotifyApi = require('../auth/spotify_client')

const createGraphqlSession = async req => {
  const session = await Session.findByPk(req.headers.graphql)
  if (!session) console.log('<<< BAD SESSION >>>')
  const { passport } = JSON.parse(session.data)
  req.user = await User.findByPk(passport.user)
  req.graphql = session
}

const context = async ({ req }) => {
  const graphqlSession = req.headers.graphql && process.env.NODE_ENV === 'development'
  if (graphqlSession) await createGraphqlSession(req)

  req.spotify = spotifyApi(req)
  return req
}

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context
})
