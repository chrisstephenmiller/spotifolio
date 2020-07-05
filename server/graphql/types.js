const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    getProfile: Profile
    getFollowedArtists: [Artist]
    getPlaylist(playlistId: String!): Playlist
    getPlaylists: [Playlist]
    getAssets(spotifyIds: [String!]): [Asset]
    getArtists(artistIds: [String!]): [Artist!]
    getTracks(trackIds: [String!]): [Track!]
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
    artists: [Artist!]
    # album: Album!
  }

  type Playlist {
    name: String!
    spotifyId: String!
    description: String
    images: [Image]
    tracks: [Track]
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
