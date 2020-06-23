const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./types')
const resolvers = require('./resolvers')
const context = require('./context')

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context
})
