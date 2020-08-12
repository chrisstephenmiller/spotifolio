const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    getArtists(artistIds: [String]): [Artist]
    getTracks(trackIds: [String]): [Track]
    getAlbums(albumIds: [String]): [Album]
    getPlaylist(playlistId: String!): Playlist
    getProfile: Profile
    getFollowedArtists: [Artist]
    getUserPlaylists: [UserPlaylist]
    getSavedTracks: [Track]
    getSavedAlbums: [Album]
    getHoldings(holdingIds: [Int], spotifyIds: [String]): [Holding]
    getAssets(artistIds: [String] = [], trackIds: [String] = [], albumIds: [String] = []): [Asset]
  }

  type Mutation {
    addHoldings(artistIds: [String] = [], trackIds: [String] = [], albumIds: [String] = []): [Holding]
  }

  type Holding {
    id: Int!
    userId: Int!
    spotifyId: String!
    asset: Asset!
    createdAt: String!
    value: Asset
    destroyedAt: String
    popularity: Float!
    followers: Float!
    performance: Float!
  }

  interface Asset {
    id: String!
    name: String!
    popularity: Int!
    images: [Image]
  }

  type Artist implements Asset {
    id: String!
    name: String!
    followers: Int!
    popularity: Int!
    genres: [String]!
    images: [Image]!
  }

  type Track implements Asset {
    images: [Image]!
    id: String!
    name: String!
    popularity: Int!
    artists: [Artist]!
    album: TrackAlbum!
  }

  type Album implements Asset {
    name: String!
    artists: [Artist]
    id: String!
    popularity: Int!
    genres: [String]!
    images: [Image]!
    tracks: [Track]!
  }

  type TrackAlbum {
    name: String!
    id: String!
    artists: [TrackAlbumArtist]!
  }

  type TrackAlbumArtist {
    name: String!
    id: String!
  }

  type Playlist {
    name: String!
    id: String!
    description: String!
    images: [Image]!
    tracks: [Track]!
  }

  type UserPlaylist {
    name: String!
    id: String!
    description: String!
    images: [Image]
    total: Int!
    public: Boolean!
  }

  type Image {
    height: Int
    width: Int
    url: String!
  }

  type Profile {
    id: Int!
    name: String!
    username: String!
    email: String!
    followers: Int!
    imageUrl: String!
  }
`
