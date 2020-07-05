module.exports = async (parent, args, req) => {
  const { body } = await req.spotify.getFollowedArtists({ limit: 50 })
  return body.artists.items.map(artist => ({
    name: artist.name,
    spotifyId: artist.id,
    popularity: artist.popularity,
    genres: artist.genres,
    followers: artist.followers.total,
    images: artist.images
  }))
}
