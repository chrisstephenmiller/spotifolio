const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./types')
const resolvers = require('./resolvers')
const { Session, User } = require('../db/models')

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authContext(req)
})

const authContext = async req => {
  const { graphql, host } = req.headers
  if (graphql && host === 'localhost:' + process.env.PORT) {
    const session = await Session.findByPk(graphql)
    const data = JSON.parse(session.data)
    return {
      userId: data.passport.userId,
      accessToken: data.accessToken
    }
  }
  return {
    userId: req.user.id,
    accessToken: req.session.accessToken
  }
}
