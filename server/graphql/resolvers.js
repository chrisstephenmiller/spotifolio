const { User, Holding } = require('../db/models')
const spotifyApi = require('../spotify')

module.exports = {
  Query: {
    getProfile: async (parent, args, { accessToken }) => {
      const spotify = await spotifyApi(accessToken)
      const profile = await spotify.getMe()
      return {
        ...profile.body,
        name: profile.body.display_name,
        followers: profile.body.followers.total,
        imageUrl: profile.body.images[0].url
      }
    },
    getFollowedArtists: async (parent, args, { accessToken }) => {
      const spotify = await spotifyApi(accessToken)
      const artists = await spotify.getFollowedArtists()
      return artists.body.artists.items.map(artist => {
        return {
          ...artist,
          spotifyId: artist.id,
          followers: artist.followers.total,
          imageUrl: artist.images[0].url
        }
      })
    },
    getUser: async (parent, args, context) => {
      const user = await User.findByPk(args.id)
      return user
    },
    getArtist: async (parent, { spotifyId }, context) => {
      const spotify = await spotifyApi()
      const artist = await spotify.getArtist(spotifyId)
      return {
        ...artist.body,
        spotifyId: artist.body.id,
        followers: artist.body.followers.total,
        imageUrl: artist.body.images[0].url
      }
    }
  },
  Mutation: {
    addHolding: async (parent, { spotifyId }, { userId }) => {
      const spotify = await spotifyApi()
      const artist = await spotify.getArtist(spotifyId)
      try {
        const [holding] = await Holding.findOrCreate({
          where: { spotifyId, userId: 1 },
          defaults: {
            info: artist.body,
            userId: 1
          }
        })
        console.log(holding)
        const newHolding = {
          id: holding.id,
          bought: holding.createdAt,
          spotifyId: holding.spotifyId,
          artist: {
            ...artist.body,
            spotifyId: artist.body.id,
            followers: artist.body.followers.total,
            imageUrl: artist.body.images[0].url
          }
        }
        return newHolding
      } catch (err) {
        console.log('>>>>ERROR>>>>>')
        console.log(err)
      }
    }
  }
}
