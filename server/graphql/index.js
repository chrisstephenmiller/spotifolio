const { ApolloServer, gql } = require('apollo-server-express')
const { User } = require('../db/models')

const typeDefs = gql`
  type Query {
    getUser(id: Int!): User
    getUsers: [User]
    # getArtist(id: Int!): Artist
    # getArtists: [Artist]
  }

  type User {
    id: Int!
    email: String!
    name: String!
  }

  #   type Artist {
  #     id: Int!
  #     name: String!
  #     spotifyId: String!
  #     followers: Int!
  #     popularity: Int!
  #     genres: [String!]
  #     userId: Int!
  #     imageUrl: String!
  #   }
`

const resolvers = {
  Query: {
    getUser: (parent, { id }) => User.findByPk(id),
    getUsers: () => User.findAll()
    // getArtist: (parent, { id }) => Artist.
  }
}

const context = expressContext => {
  const { req, res } = expressContext
  console.log(req, res)
}

module.exports = new ApolloServer({ typeDefs, resolvers, context })
