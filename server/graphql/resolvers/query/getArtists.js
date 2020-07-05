module.exports = async (parent, { artistIds }, req) => {
  const spotifyApi = await req.spotify(null)

  const artists = []
  while (artistIds.length) {
    const { body } = await spotifyApi.getArtists(artistIds.splice(0, 50))
    artists.push(...body.artists.filter(Boolean))
  }

  return artists.map(artist => {
    return {
      name: artist.name,
      spotifyId: artist.id,
      popularity: artist.popularity,
      genres: artist.genres,
      followers: artist.followers.total,
      images: artist.images
    }
  })
}
