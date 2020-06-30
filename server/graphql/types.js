const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    getProfile: Profile
    getFollowedArtists: [Artist]
    getPlaylist: [Track]
    getAssets(spotifyIds: [String!]): [Asset]
  }

  type Mutation {
    addHoldings(spotifyIds: [String!]): [Holding]
  }

  type Holding {
    id: Int!
    userId: Int!
    spotifyId: String!
    asset: Asset!
    bought: String!
    sold: String
  }

  union Asset = Artist | Track

  type Artist {
    spotifyId: String!
    name: String!
    followers: Int!
    popularity: Int!
    genres: [String!]
    images: [Image!]
  }

  type Track {
    spotifyId: String!
    name: String!
    popularity: Int!
    artists: [TrackArtist!]
    # album: Album!
  }

  type TrackArtist {
    spotifyId: String!
    name: String!
    imageUrl: String!
  }

  type Profile {
    id: Int!
    name: String!
    username: String!
    email: String!
    followers: Int!
    imageUrl: String!
  }

  type Image {
    height: Int!
    width: Int!
    url: String!
  }
`
