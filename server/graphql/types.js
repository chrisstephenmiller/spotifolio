const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    getProfile: Profile
    getFollowedArtists: [Artist]
    getArtists(spotifyIds: [String!]): [Artist]
  }

  type Mutation {
    addHoldings(spotifyIds: [String!]): [Holding]
  }

  type Holding {
    id: Int!
    userId: Int!
    spotifyId: String!
    artist: Artist!
    bought: String!
    sold: String
  }

  type Profile {
    id: Int!
    name: String!
    username: String!
    email: String!
    followers: Int!
    imageUrl: String!
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
