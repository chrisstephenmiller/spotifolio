module.exports = async (parent, { artistIds }, req) => {
  const spotifyApi = await req.spotify(null)

  const artists = []
  while (artistIds.length) {
    const { body } = await spotifyApi.getArtists(artistIds.splice(0, 50))
    artists.push(...body.artists.filter(Boolean))
  }

  return artists.map(artist => ({ ...artist, followers: artist.followers.total }))
}
