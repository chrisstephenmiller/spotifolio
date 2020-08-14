module.exports = async (parent, args, req) => {
  const spotifyApi = await req.spotify()

  const followedArtists = await spotifyApi.getFollowedArtists({ limit: 50 })
  const { cursors, items } = followedArtists.body.artists

  while (cursors.after) {
    const { body } = await spotifyApi.getFollowedArtists({ limit: 50, after: cursors.after })
    items.push(...body.artists.items)
    cursors.after = body.artists.cursors.after
  }

  return items.map(artist => ({ ...artist, followers: artist.followers.total }))
}
