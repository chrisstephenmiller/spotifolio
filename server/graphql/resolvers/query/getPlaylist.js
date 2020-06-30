const { trackMap } = require('../map')

module.exports = async (parent, args, req) => {
  const getUserPlaylists = await req.spotify.getUserPlaylists()
  const spotifolioId = parseSpotifolioId(getUserPlaylists)
  const spotifolioTracks = await req.spotify.getPlaylistTracks(spotifolioId)
  return spotifolioTracks.body.items.map(track => trackMap(track.track))
}

const parseSpotifolioId = ps =>
  ps.body.items.find(p => p.name.toLowerCase() === 'spotifolio').id
