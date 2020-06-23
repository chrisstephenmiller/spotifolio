const artistMap = artist => ({
  name: artist.name,
  spotifyId: artist.id,
  popularity: artist.popularity,
  genres: artist.genres,
  followers: artist.followers.total,
  imageUrl: artist.images[0].url
})

const profileMap = profile => ({
  name: profile.display_name,
  email: profile.email,
  username: profile.id,
  followers: profile.followers.total,
  imageUrl: profile.images[0].url
})

const holdingMap = holding => ({
  id: holding.id,
  userId: holding.userId,
  spotifyId: holding.spotifyId,
  bought: holding.createdAt,
  sold: holding.destroyedAt
})

module.exports = { artistMap, profileMap, holdingMap }
