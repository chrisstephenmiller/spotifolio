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
    getAssets(artistIds: [String] = [], trackIds: [String] = [], albumIds: [String] = []): Assets
  }

  type Mutation {
    addHoldings(artistIds: [String] = [], trackIds: [String] = [], albumIds: [String] = []): [Holding]
  }

  enum AssetType {
    ARTIST
    TRACK
    ALBUM
  }

  type Holding {
    id: Int!
    userId: Int!
    spotifyId: String!
    type: [AssetType]!
    asset: Asset!
    bought: String!
    sold: String
  }

  union Asset = Artist | Track | Album

  type Assets {
    artists: [Artist]!
    tracks: [Track]!
    albums: [Album]!
  }

  type Artist {
    spotifyId: String!
    name: String!
    followers: Int!
    popularity: Int!
    genres: [String]!
    images: [Image]!
  }

  type Track {
    spotifyId: String!
    name: String!
    popularity: Int!
    artists: [Artist]!
    album: TrackAlbum!
  }

  type Album {
    name: String!
    artists: [Artist]
    spotifyId: String!
    popularity: Int!
    genres: [String]!
    images: [Image]!
    tracks: [Track]!
  }

  type TrackAlbum {
    name: String!
    spotifyId: String!
    artists: [TrackAlbumArtist]!
  }

  type TrackAlbumArtist {
    name: String!
    spotifyId: String!
  }

  type Playlist {
    name: String!
    spotifyId: String!
    description: String!
    images: [Image]!
    tracks: [Track]!
  }

  type UserPlaylist {
    name: String!
    spotifyId: String!
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
    images: [Image]!
  }
`
