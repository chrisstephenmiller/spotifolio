const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    getProfile: Me
    getFollowedArtists: [Artist]
    getUser(id: Int!): User
    getUsers: [User]
    getArtist(spotifyId: String!): Artist
  }

  type Mutation {
    addHolding(spotifyId: String): Holding
  }

  type Holding {
    id: Int!
    spotifyId: String!
    artist: Artist
    bought: String!
  }

  type Me {
    id: String!
    name: String!
    email: String!
    followers: Int!
    imageUrl: String!
  }

  type User {
    id: Int!
    email: String!
    name: String!
  }

  type Artist {
    spotifyId: String!
    name: String!
    followers: Int!
    popularity: Int!
    genres: [String!]
    imageUrl: String!
  }
`
